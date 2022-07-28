import { TAX_TYPE } from "data/taxes";
import { IState } from "redux/reducers/createEstimateSlice/types";

export function getAmount(particular: any) {
  const { discount, discountType, rate, units } = particular;

  if (!rate) return 0;

  let result = units * rate;
  if (discount && discountType === "PERCENT") {
    result = result - (result * discount) / 100;
  }

  if (discount && discountType === "AMOUNT") {
    result = result - discount;
  }

  return result;
}

export function getTotalCharges(otherParticulars: any[]) {
  return otherParticulars.reduce(
    (acc, particular) => acc + +particular.amount,
    0
  );
}

export function getSubTotal(particulars: any[]) {
  return particulars.reduce(
    (acc, particular) => acc + getAmount(particular),
    0
  );
}

export function getGstAmount(particular: any, value: string) {
  const taxableAmount = getAmount(particular);

  if (!value) return 0;

  let gstPercent = 0;

  switch (value) {
    case TAX_TYPE.NON_GST_SUPPLY:
      gstPercent = 0;
      break;
    case TAX_TYPE.NON_TAXABLE:
      gstPercent = 0;
      break;
    case TAX_TYPE.OUT_OF_SCOPE:
      gstPercent = 0;
      break;
    case TAX_TYPE.GST0:
      gstPercent = 0;
      break;
    case TAX_TYPE.GST5:
      gstPercent = 5;
      break;
    case TAX_TYPE.GST12:
      gstPercent = 12;
      break;
    case TAX_TYPE.GST18:
      gstPercent = 18;
      break;
    case TAX_TYPE.GST28:
      gstPercent = 28;
      break;
    default:
      gstPercent = 0;
  }

  return (taxableAmount * gstPercent) / 100;
}

export function getTotalGst(particulars: any[]) {
  return particulars.reduce((acc, particular) => {
    return acc + getGstAmount(particular, particular.gst?.value);
  }, 0);
}

export function getRoundOff(state: IState) {
  let totalAmount = getSubTotal(state.particulars);
  let totalGst = getTotalGst(state.particulars);
  let totalOtherParticularCharges = getTotalCharges(state.otherParticulars);
  let adjustment = +state.adjustment;
  let result =
    totalAmount + totalGst + totalOtherParticularCharges + adjustment;

  let roundOff = Math.round(result) - result;

  return roundOff.toFixed(1);
}

export function getGrandTotal(state: IState) {
  let totalAmount = getSubTotal(state.particulars);
  let totalGst = getTotalGst(state.particulars);
  let totalOtherParticularCharges = getTotalCharges(state.otherParticulars);
  let adjustment = +state.adjustment;
  let result =
    totalAmount + totalGst + totalOtherParticularCharges + adjustment;
  return Math.round(+result);
}
