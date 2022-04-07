import { yupResolver } from "@hookform/resolvers/yup";
import DrawerWrapper from "components/DrawerWrapper";
import { useForm } from "react-hook-form";
import renderFieldsComponent from "./renderFieldsComponent";

const CreateFormDrawer = (props) => {
  const { open, setOpen, item } = props;
  const { watch, control, handleSubmit } = useForm({
    defaultValues: item.defaultValues,
    mode: "onChange",
    resolver: yupResolver(item.schema),
  });
  return (
    <DrawerWrapper open={open} setOpen={setOpen} title={item.title}>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        {renderFieldsComponent(item, control, handleSubmit)}
      </form>
    </DrawerWrapper>
  );
};

export default CreateFormDrawer;
