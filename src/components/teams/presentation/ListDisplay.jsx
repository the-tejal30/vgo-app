import React from "react";
import ANTDCard from "../../../shared/antd/ANTDCard";
import { Button } from "antd";

const ListDisplay = ({ loading, error, columns, data, dropdownValue, handleButtonClick, handleCandidates, setSelectedCandidateId}) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const getStatusButton = (status, candidateId) => {
    if (status === "Team" || status === "New" || status === "Active") {
      return (
        <Button
          className="blinking-btn"
          type="primary"
          onClick={() => {
            handleButtonClick();
            handleCandidates(candidateId);
            setSelectedCandidateId(candidateId)
          }}
        >
          {status}
        </Button>
      );
    }
    return null;
  };

  return (
    <div style={{ height: "300px", overflowY: "auto" }}>
      {data && data.length > 0 ? (
        <div>
          {data.map((item, index) => (
            <ANTDCard key={index} style={{ marginBottom: "16px" }}>
              <ul>
                {columns.map((column) => (
                  <li key={column.key}>
                    <strong>{column.title}:</strong>{" "}
                    {item[column.dataIndex] || "N/A"}
                  </li>
                ))}
              </ul>
              {getStatusButton(dropdownValue, item.id)}
            </ANTDCard>
          ))}
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default ListDisplay;
