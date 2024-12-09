import Reach, {useEffect, useState} from "react";
import {Select, MenuItem, FormControl, InputLabel} from "@mui/material";

const SelectSkill = () => {
    //When we call the setData function, the data variable is set to 
    const [data, setData] = useState([]);
    const [selectedValue, setSelectedValue] = useState(1);

    useEffect(() => {
        //Fetch JSON from the server
        const fetchData = async() => {
            try {
                //Create a promise for the completed response
                const response = await fetch("http://localhost:8080/skills");
                if(!response.ok)
                    throw new Error("Server response failed.");

                const result = await response.json();
                setData(result);
            } catch(err) {console.log("Error: " + err);}
        };
        fetchData();
    }, []);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (<>
        <FormControl fullWidth>
            <InputLabel id="select-label">Select a Competency</InputLabel>
            <Select labelId="select-label" value={selectedValue} onChange={handleChange}>
                {
                    data.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                            {item.skill}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    </>);
};

export default SelectSkill;
