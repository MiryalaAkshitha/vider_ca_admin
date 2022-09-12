import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { handleApply, handleFilters, handleSelected } from "redux/reducers/taskboardSlice";
import { getTasksByCategory } from "api/services/organization";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { ResType } from "types";

function ServiceCategory({ dates }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading }: ResType = useQuery(
    ["task-by-category", { ...dates }],
    getTasksByCategory
  );

  const handleClick = (v: any) => {
    dispatch(handleSelected("category"));
    dispatch(
      handleFilters({
        checked: true,
        value: { label: v?.name, value: v?.id },
      })
    );
    dispatch(handleApply());
    navigate("/task-board");
  };

  if (isLoading) return <Loader />;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={
          data?.data?.map((item: any) => ({
            name: item.name,
            Recurring: item.recurring,
            "Non-Recurring": item.non_recurring,
            id: item?.id,
          })) || []
        }
        style={{ padding: 0, fontSize: "12px" }}
      >
        <Bar
          style={{ cursor: "pointer" }}
          dataKey="Recurring"
          barSize={6}
          radius={[4, 4, 0, 0]}
          fill="#0D47A1"
          onClick={(v) => handleClick(v)}
        ></Bar>
        <Bar
          style={{ cursor: "pointer" }}
          dataKey="Non-Recurring"
          barSize={6}
          radius={[4, 4, 0, 0]}
          fill="#64B5F6"
          onClick={(v) => handleClick(v)}
        ></Bar>
        <XAxis type="category" dataKey="name" />
        <YAxis type="number" domain={[0, "dataMax + 25"]} />
        <Tooltip
          labelStyle={{ color: "#000", fontWeight: "bold", fontSize: 15 }}
          cursor={{ fill: "transparent" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ServiceCategory;
