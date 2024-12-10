import React, {useEffect, useState} from 'react';
import {Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import SkillDescription from './SkillDescription';

const SelectSkill = () => {
  // When we call the setData and setSelectedValue functions, the data/selectedValue variables are set to a new value
  // These variables can be used within our React component and will be instantly updated when we call these functions
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1);

  useEffect(() => {
    // Fetch the competency data from the server
    const fetchData = async() => {
      try {
          // Create a promise for the completed response and don't move on in the code until a response is received
          const response = await fetch("http://localhost:8080/skills");
          if (!response.ok) {
              throw new Error("Server response was not ok.");
          }
          // By using await here, setData is not called until we have converted the response to valid JSON
          const result = await response.json();
          setData(result);
      } catch (error) {
        console.log("Error fetching the data", error);
      }
    }

    fetchData();
  }, []); // You have to have an array at the end of a useEffect function or it won't run when the component first mounts

  // This function runs when our Select component is changed
  // This is set in the onChange attribute of the Select component
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  }

  // You can see where selectedValue is used in the Select component below
  // The default value was set to 1 at the beginning of useEffect so we start with the skill with id 1, 
  // which is Teamwork & Conflict Resolution
  // When selectedValue is changed, it is updated here as well as the SkillDescription component below the FormControl
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
          // The map function works like an enhanced for loop
          // It goes through each object in the data variable
          // The item is the object itself while the index is its index number
          // You can use item. to get individual values out of the object such as the id and skill name
          data.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.skill}
            </MenuItem>
          ))
        }
        </Select>
      </FormControl>
      <SkillDescription id={selectedValue}/>
    </div>
  );
};

// You have to export the component at the bottom of the file to make it accessible to other components
export default SelectSkill;