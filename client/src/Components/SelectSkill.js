import React, {useEffect, useState} from 'react';
import {Select, MenuItem, FormControl, InputLabel, Input} from "@mui/material";

const SelectSkill = () => {
  // When we call the setData function, the data variable is set to a new value
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1);

  useEffect(() => {
    // Fetch JSON from the server
    const fetchData = async() => {
      try {
          // Create a promise for the completed response
          const response = await fetch("http://localhost:8080/skills");
          if (!response.ok) {
              throw new Error("Server response was not ok.");
          }
          const result = await response.json();
          setData(result);
      } catch (error) {
        console.log("Error fetching the data", error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="select-label">Select a Competency</InputLabel>
        <Select 
          labelId='select-label'
          value={selectedValue}
          onChange={handleChange}
        >
        {
          data.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.skill}
            </MenuItem>
          ))
        }
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectSkill;