import React, {useEffect, useState} from 'react';

// This component has a parameter (id) which must be included as an attribute when the component is used
const SkillDescription = ({id}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // We are fetching data using a POST request this time
        const fetchData = async() => {
            try {
                // We can't just specify the path for the data since this is a POST request
                // We specify the method and headers for the request to indicate it is a POST request that will be sending JSON data
                const response = await fetch(
                    "http://localhost:8080/skills", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        // This stores the JSON data in the body of the request
                        body: JSON.stringify({id: id}),
                    });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); // We can't have an empty array this time since useEffect required the id parameter

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // We don't need the index number for this mapping so we just make the item itself and get the skill and description
    return (
        <div>
            <h2>{data.map(item => item.skill)}</h2>
            <p>{data.map(item => item.description)}</p>
        </div>
    );
}


export default SkillDescription;