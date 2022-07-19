import {
  handleChange,
  ICreateInvoice,
} from "redux/reducers/createInvoiceSlice";
import store from "redux/store";

export class InvoiceCalculations {
  state: ICreateInvoice;
  constructor(state: ICreateInvoice) {
    this.state = state;
  }

  getTaxableAmount(particular) {
    let result = particular.units * particular.rate;
    if (particular.discountType === "PERCENT") {
      result = result - (result * particular.discount) / 100;
    }

    if (particular.discountType === "AMOUNT") {
      result = result - particular.discount;
    }

    return result;
  }

  getIgstAmount(particular) {
    const taxableAmount = this.getTaxableAmount(particular);
    return (taxableAmount * particular.igstPercent) / 100;
  }

  getAmount(particular) {
    const taxableAmount = this.getTaxableAmount(particular);
    const igstAmount = this.getIgstAmount(particular);
    return taxableAmount + igstAmount;
  }

  totalTaxableAmount() {
    return this.state.particulars.reduce(
      (acc, particular) => acc + this.getTaxableAmount(particular),
      0
    );
  }
  totalIgstAmount() {
    return this.state.particulars.reduce(
      (acc, particular) => acc + this.getIgstAmount(particular),
      0
    );
  }
  totalAmount() {
    let result = this.totalTaxableAmount() + this.totalIgstAmount();
    return +result.toFixed(2);
  }

  additionalCharges() {
    return this.state.otherParticulars.reduce(
      (acc, particular) => acc + particular.amount,
      0
    );
  }

  tdsAmount() {
    let result = this.totalTaxableAmount() + this.additionalCharges();
    return (result * this.state.tdsPercent) / 100;
  }

  grandTotal() {
    let result =
      this.totalAmount() +
      this.additionalCharges() +
      this.tdsAmount() +
      this.state.otherCharges;
    let roundOff = Math.round(+result.toFixed(2)) - +result.toFixed(2);
    store.dispatch(
      handleChange({
        key: "roundOff",
        value: roundOff.toFixed(2),
      })
    );
    return Math.round(+result.toFixed(2));
  }
}
