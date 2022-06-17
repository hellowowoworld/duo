import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const getStyles = (name, personName, theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const BasicSelect = ({ items, selectId, id, label, value, setValue }) => {
  // const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ m: 1, minWidth: 450 }}>
      <FormControl fullWidth>
        <InputLabel id={selectId} sx={{ zIndex: -1 }}>
          {label}
        </InputLabel>
        <Select
          labelId={selectId}
          id={id}
          value={value}
          label={label}
          onChange={handleChange}
          required
        >
          {items.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
