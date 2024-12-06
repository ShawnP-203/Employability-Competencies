import Reach, {useEffect, useState} from "react";
import {Select, Menu, FormControl, InputLabel} from "@mui/material";

const SelectSkill = () => {
    const [data, setData] = useState([]);

    //Fetch JSON from the server
    const fetchData = async() => {
        try {
            //Create a promise for the completed response
            const response = await fetch("http://localhost:8080/skills");
            if(!response.ok)
                throw new Error("Server response failed.");

            const result = await response.json();
            setData(result);
        } catch(err) {console.error(err);}
    };
};