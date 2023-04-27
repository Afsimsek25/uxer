import React, { useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import "antd/dist/reset.css";
import "./DataTable.css";

const baseURL = "https://gateway-test.u-xer.com/api/";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState([]);

  const createFiltersFromColumns = (columns) => {
    return columns.map((column) => ({
      key: column.key,
      title: column.title,
      filterFunction: (value, data) =>
        data.filter((item) =>
          item[column.key]
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        ),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestBody = {
          searchText: "",
          companyName: "",
          description: "",
          website: "",
          address: ""
          
        };
    
        const response = await axios.post(`${baseURL}Account/search`, requestBody, {
          headers: {
            accept: "*/*",
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiYWZzaW1zZWsiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZnNpbXNlazI1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlNhIiwiVXhlclRva2VuVHlwZSI6IlVzZXIiLCJVeGVyQWNjb3VudElkIjoiIiwiVXhlclVzZXJJZCI6IjQxMjAyY2VmLTVkZmMtNDQ2NC05ZWQwLTFlZWUzODMyMmUwYyIsIm5iZiI6MTY4MjUxOTU0OCwiZXhwIjoxNjg4NTE5NDg4LCJpc3MiOiJ1LXhlci5jb20iLCJhdWQiOiJ1LXhlci5jb20ifQ.uGqNkyHy6SrIQgjSlkpUVB7SlF-y-RwMB4kUgPEeVpH7sHDyeM8wSSU27l7PLO0Fu6o5UXcHy0MS_9IKdGBpWA",
          },
        });
    
        const responseData = response.data;

        console.log(response.data)
    
        const fetchedColumns = Object.keys(responseData[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
        }));
    
        const fetchedData = responseData.map((item, index) => ({
          key: index,
          ...item,
        }));
    
        setColumns(fetchedColumns);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (columns.length > 0) {
      const newFilters = createFiltersFromColumns(columns);
      setFilters(newFilters);
    }
  }, [columns]);

  const onFilterChange = (value, filter) => {
    const newFilteredData = filter.filterFunction(value, data);
    setFilteredData(newFilteredData);
  };

  const onFilterButtonClick = () => {
    let currentFilteredData = [...data];

    filters?.forEach((filter) => {
      const filterInput = document.getElementById(filter.key);
      if (filterInput && filterInput.value) {
        currentFilteredData = filter.filterFunction(
          filterInput.value,
          currentFilteredData
        );
      }
    });

    setFilteredData(currentFilteredData);
  };

  const onClearButtonClick = () => {
    filters?.forEach((filter) => {
      const filterInput = document.getElementById(filter.key);
      if (filterInput) {
        filterInput.value = "";
      }
    });

    setFilteredData(data);
  };

  return (
    <div className="DataTable-container">
      <div className="DataTable-filters">
        {filters &&
          filters.map((filter) => (
            <div key={filter.key} className="DataTable-filter">
              <label htmlFor={filter.key}>{filter.title}:</label>
              <Input id={filter.key} />
            </div>
          ))}
        <div className="DataTable-buttons">
          <button onClick={onFilterButtonClick}>Filtrele</button>
          <button onClick={onClearButtonClick}>Temizle</button>
        </div>
      </div>
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default DataTable;
