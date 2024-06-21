import React, { useEffect, useState } from 'react';

// const data = [
//   { id: 1, mall: "V R mall", address: "Surat", rating: "A" },
//   { id: 2, mall: "Rahul Raj Mall", address: "dallas", rating: "B" },
//   { id: 3, mall: "Raj Imperial", address: "san francisco", category: "one", rating: "B" },
//   { id: 4, mall: "jane", address: "denver", category: "two", rating: "C" }
// ];

const data = [
    { id: 1, name: "foo", city: "dallas", category: "one", type: "A", active: "FALSE" },
    { id: 2, name: "bar", city: "dallas", category: "one", type: "B", active: "FALSE" },
    { id: 3, name: "jim", city: "san francisco", category: "one", type: "B", active: "TRUE" },
    { id: 4, name: "jane", city: "denver", category: "two", type: "C", active: "FALSE" }
]

const TableData = () => {
    const [filters, setFilters] = useState({});
    const [filteredData, setFilteredData] = useState(data);
    const [filterOptions, setFilterOptions] = useState({});
    const [allKeys, setAllKeys] = useState([]);

    const createFilters = () => {
        const initialFilters = {};
        const options = {};
        const keysSet = new Set();

        data.forEach(item => {
            Object.keys(item).forEach(key => {
                keysSet.add(key);
                if (key !== 'id') {
                    if (!initialFilters[key]) {
                        initialFilters[key] = {};
                        options[key] = new Set();
                    }
                    initialFilters[key][item[key]] = false;
                    options[key].add(item[key]);
                }
            });
        });

        setFilters(initialFilters);
        setFilterOptions(options);
        setAllKeys(Array.from(keysSet));
    };

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters, [name]: { ...prevFilters[name], [value]: checked } };
            applyFilters(newFilters);
            return newFilters;
        });
    };

    const applyFilters = (newFilters = filters) => {
        let filtered = data;

        Object.keys(newFilters).forEach(key => {
            if (Object.values(newFilters[key]).some(v => v)) {
                filtered = filtered.filter(item => newFilters[key][item[key]]);
            }
        });
        setFilteredData(filtered);
    };

    useEffect(() => {
        createFilters();
    }, []);
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "50px" }}>
                <div style={{ display: "flex", gap: "30px" }}>
                    {Object.keys(filterOptions).map(option => (
                        <div key={option}>
                            <strong>{option}:</strong>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                {[...filterOptions[option]].map(value => (
                                    <label key={value} style={{ display: "flex", alignItems: "center" }}>
                                        {value}
                                        <input
                                            type="checkbox"
                                            name={option}
                                            value={value}
                                            checked={filters[option][value]}
                                            onChange={handleFilterChange}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "100px" }}>
                <table border="1" width={"700px"}>
                    <thead>
                        <tr>
                            {allKeys.map(key => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => (
                            <tr key={item.id}>
                                {allKeys.map(key => (
                                    <td key={key}>{item[key] || "-"}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableData;