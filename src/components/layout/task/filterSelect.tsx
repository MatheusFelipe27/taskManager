import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";

interface TableFilterSelectProps {
  initialState: string;
  onChange: (value: string) => void;
  options: string[];
}


const FilterSelectField = styled(TextField)(({  }) => ({
  minWidth: '15%',
  backgroundColor: '#0B1125',
  '& .MuiInputBase-root': {
    color: '#F6F8FC',
    fontSize: '12px',
  },
  '& .MuiSelect-icon': {
    color: '#F6F8FC'
  },
}));

const FilterSelect = ({ initialState, onChange, options }: TableFilterSelectProps) => {
    const [value, setValue] = useState<string>(initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(e.target.value);
    }

  return (
    <FilterSelectField
      select
      value={value}
      onChange={handleChange}
      variant="outlined"
      size="small"
    >
      {options.map((opt, idx) => (
        <MenuItem key={idx} value={opt} sx={{fontSize:'12px'}}>
          {opt}
        </MenuItem>
      ))}
    </FilterSelectField>
  );
};

export default FilterSelect;
