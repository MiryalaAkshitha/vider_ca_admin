import { useForm } from "react-hook-form";
import DecisionBox from "./formBuilderFields/FormBuilderDecisionBox";
import FormBuilderCheckbox from "./formBuilderFields/FormBuilderCheckbox";
import FormBuilderDate from "./formBuilderFields/FormBuilderDate";
import FormbuilderTextField from "./formBuilderFields/FormBuilderTextField";
import { FormBuilderFieldTypes } from "./renderFieldsComponent";
import FormBuilderPhone from "./formBuilderFields/FormBuilderPhone";
import FormBuilderRadio from "./formBuilderFields/FormBuilderRadio";
import FormBuilderSelect from "./formBuilderFields/FormBuilderSelect";
import FormBuilderMultiselect from "./formBuilderFields/FormBuilderMultiselect";
import FormBuilderUpload from "./formBuilderFields/FormBuilderUpload";
import FormBuilderCurrency from "./formBuilderFields/FormBuilderCurrency";

function RenderField({ item, control }: any) {
  switch (item.fieldType) {
    case FormBuilderFieldTypes.EMAIL:
      return (
        <FormbuilderTextField
          control={control}
          name={item?._id}
          label={item?.label}
          placeholder={item?.placeholder}
          required={item?.required}
        />
      );
    case FormBuilderFieldTypes.SINGLE_LINE:
      return (
        <FormbuilderTextField
          control={control}
          name={item?._id}
          label={item?.label}
          placeholder={item?.placeholder}
          required={item?.required}
        />
      );
    case FormBuilderFieldTypes.MULTI_LINE:
      return (
        <FormbuilderTextField
          control={control}
          name={item?._id}
          label={item?.label}
          multiline
          placeholder={item?.placeholder}
          required={item?.required}
          showCharacterCount={item?.showCharacterCount}
          countType={item?.range?.type}
        />
      );
    case FormBuilderFieldTypes.DECISION_BOX:
      return (
        <DecisionBox control={control} name={item?._id} label={item?.label} />
      );
    case FormBuilderFieldTypes.RADIO:
      return (
        <FormBuilderRadio
          control={control}
          name={item?._id}
          label={item?.label}
          required={item?.required}
          options={item?.options?.map((item: any) => ({
            label: item?.label,
            value: item?.value,
          }))}
        />
      );
    case FormBuilderFieldTypes.DROPDOWN:
      return (
        <FormBuilderSelect
          control={control}
          name={item?._id}
          label={item?.label}
          required={item?.required}
          options={item?.options?.map((item: any) => ({
            label: item?.label,
            value: item?.value,
          }))}
        />
      );
    case FormBuilderFieldTypes.DROPDOWN_MULTIPLE:
      return (
        <FormBuilderMultiselect
          control={control}
          name={item?._id}
          label={item?.label}
          required={item?.required}
          options={item?.options?.map((item: any) => ({
            label: item?.label,
            value: item?.value,
          }))}
        />
      );
    case FormBuilderFieldTypes.DATE:
      return (
        <FormBuilderDate
          control={control}
          name={item?._id}
          label={item?.label}
          required={item?.required}
        />
      );
    case FormBuilderFieldTypes.CHECKBOX:
      return (
        <FormBuilderCheckbox
          control={control}
          name={item?._id}
          label={item?.label}
          required={item?.required}
          options={item?.options?.map((item: any) => ({
            label: item?.label,
            value: item?.value,
          }))}
        />
      );
    case FormBuilderFieldTypes.PHONE:
      return (
        <FormBuilderPhone
          control={control}
          name={item?._id}
          label={item?.label}
          required={item?.required}
          includeCountryCode={item?.includeCountryCode}
          allowedCountries={item?.allowedCountries}
        />
      );
    case FormBuilderFieldTypes.FILE_UPLOAD:
      return (
        <FormBuilderUpload
          accepted={item?.uploadFileTypes}
          name={item?._id}
          id={item?.label + "_" + item?._id}
          label={item?.label}
          control={control}
          maxFileSize={item?.fileMaxSize}
          max={item?.range?.max}
        />
      );
    case FormBuilderFieldTypes.CURRENCY:
      return (
        <FormBuilderCurrency
          name={item?._id}
          label={item?.label}
          control={control}
          required={item?.required}
          code={item?.currencyType}
        />
      );
    default:
      return <h1>Not matched</h1>;
  }
}

export default RenderField;
