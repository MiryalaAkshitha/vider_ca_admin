import { getTasksByClientCategory } from "api/services/organization";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { handleApply, handleFilters, handleSelected, resetFilters } from "redux/reducers/taskboardSlice";
import { ResType } from "types";
import { getTitle } from "utils";

function ClientCategory({ dates }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { queryParams } = useQueryParams();
  const dashboardType = queryParams.type || "user";

  const { data, isLoading }: ResType = useQuery(
    ["task-by-client-category", { ...dates, dashboardType }],
    getTasksByClientCategory
  );

  const handleClick = (v: any) => {
    dispatch(resetFilters());
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

  const result =
    data?.data?.map((item: any) => ({
      name: getTitle(item.name),
      Recurring: item.recurring,
      "Non-Recurring": item.non_recurring,
      id: item?.id,
    })) || [];

  const yaxisMax = Math.max(...result.map((item: any) => +item.Recurring + +item["Non-Recurring"]));

  if (isLoading) return <Loader />;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={result} style={{ padding: 0, fontSize: "12px" }}>
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
        <YAxis type="number" domain={[0, yaxisMax + 10]} />
        <Tooltip
          labelStyle={{ color: "#000", fontWeight: "bold", fontSize: 15 }}
          cursor={{ fill: "transparent" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ClientCategory;
