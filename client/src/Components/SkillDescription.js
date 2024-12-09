import React, {useEffect, useState} from "react";

const SkillDescription = ({id}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try
            {
                const response = await fetch("http://localhost:8080/skills", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({id: id}),
                });
            } catch(err)
            {
                console.log(err);
            }
        };
    });
};

export default SkillDescription;