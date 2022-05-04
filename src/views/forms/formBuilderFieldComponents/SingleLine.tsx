import { Box } from "@mui/material";
import { getFormValidations } from "api/services/forms";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormInput from "components/FormFields/FormInput";
import FormLimitRange from "components/FormFields/FormLimitRange";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setValidations } from "redux/reducers/formsSlice";
import { ResType } from "types";

interface Props {
  item: any;
  control: any;
}

const SingleLine = (props: Props) => {
  const { control } = props;
  const dispatch = useDispatch();

  const { data }: ResType = useQuery("form-validations", getFormValidations, {
    onSuccess: (res: any) => {
      dispatch(setValidations(res?.data));
    },
  });

  return (
    <>
      <Box mt={2}>
        <FormInput name="label" label="Field Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormInput
          name="instructions"
          label="Field Instructions"
          multiline
          control={control}
        />
      </Box>
      <Box mt={2}>
        <FormInput
          name="placeHolder"
          label="PlaceHolder Text"
          control={control}
        />
      </Box>
      <Box mt={2}>
        <FormRadio
          row
          control={control}
          name="fieldSize"
          label="Field Size"
          options={[
            { label: "Small", value: "SMALL" },
            { label: "Medium", value: "MEDIUM" },
            { label: "Large", value: "LARGE" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="validation"
          label="Validation Type"
          options={
            data?.data?.map((item: any) => ({
              label: item.name,
              value: item?._id,
            })) || []
          }
        />
      </Box>
      <Box mt={2}>
        <FormLimitRange
          name="range"
          control={control}
          label="Character Limit"
        />
      </Box>
      <Box mt={2}>
        <FormCheckbox control={control} name="required" label="Mandatory" />
      </Box>
    </>
  );
};

export default SingleLine;
