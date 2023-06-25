// import { TextField } from "@mui/material";
// import useQueryParams from "hooks/useQueryParams";
// import { useRef } from "react";

// const SortBy = ({ setPeriod }) => {
//     const { queryParams, setQueryParams } = useQueryParams();
//     const fieldRef = useRef<HTMLInputElement | null>(null);

//     return (
//         <TextField
//             sx={{ minWidth: 100 }}
//             value={queryParams.sortBy || ""}
//             InputLabelProps={{ shrink: true }}
//             onChange={(e) => {
//                 setQueryParams({
//                     ...queryParams,
//                     sortBy: e.target.value,
//                 });
//                 setPeriod(e.target.value)
//             }}
//             SelectProps={{
//                 native: true,
//                 autoWidth: true,
//                 onClose: () => {
//                     if (fieldRef.current) {
//                         fieldRef.current.blur();
//                     }
//                 },
//             }}
//             size="small"
//             select
//             label=""
//             placeholder="Select Date"
//         >
//             {/* <option value="">Select</option> */}
//             <option value="04 2023">May 2023</option>
//             <option value="03 2023">April 2023</option>
//             <option value="02 2023">Mar 2023</option>
//             <option value="01 2023">February 2023</option>
//             <option value="00 2023">January 2023</option>
//             <option value="11 2022">December 2022</option>
//             <option value="10 2022">November 2022</option>
//             <option value="09 2022">October 2022</option>
//             <option value="08 2022">September 2022</option>
//             <option value="07 2022">August 2022</option>
//             <option value="06 2022">July 2022</option>
//             <option value="05 2022">June 2022</option>
//         </TextField>
//     );
// };

// export default SortBy;


import { TextField } from "@mui/material";
import useQueryParams from "hooks/useQueryParams";
import { useRef, useState } from "react";
import React from "react";

const SortBy = ({ setPeriod }: { setPeriod: (value: string) => void },) => {
    const [filters, setFilters] = useState({


        sortBy: "",

    });
    const fieldRef = useRef<HTMLInputElement | null>(null);

    const generateOptions = (): React.ReactNode[] => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const options: React.ReactNode[] = [];

        for (let year = 2017; year <= currentYear; year++) {
            const startMonth = year === 2017 ? 1 : 0;

            for (let month = startMonth; month <= (year === currentYear ? currentMonth : 11); month++) {
                const monthString = month.toString().padStart(2, "0");
                const yearString = year.toString();
                const optionValue = `${monthString} ${yearString}`;
                const optionLabel = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date(year, month - 1, 1));

                options.unshift(
                    <option key={optionValue} value={optionValue}>
                        {optionLabel}
                    </option>
                );
            }
        }

        options.unshift(
            <option value="" disabled hidden>
                Select
            </option>
        )


        return options
    };




    return (
        <TextField
            sx={{ minWidth: 100 }}
            value={filters.sortBy || ""}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
                // setQueryParams({
                setFilters({
                    sortBy: e.target.value,
                })
                //     
                // });
                setPeriod(e.target.value);
            }}
            SelectProps={{
                native: true,
                autoWidth: true,
                onClose: () => {
                    if (fieldRef.current) {
                        fieldRef.current.blur();
                    }
                },
            }}
            size="small"
            select
            label=""
            placeholder="Select Date"
        >
            {generateOptions()}
        </TextField>
    );
};

export default SortBy;



