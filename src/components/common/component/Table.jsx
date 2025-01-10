import React from "react";
import ANTDTable from "../../../shared/antd/ANTDTable";

const CommonTable = ({ columns, dataSource, title }) => {
  return (
    <div className="w-100 d-flex flex-column align-center gap-10">
      <h2>{title}</h2>
      <ANTDTable
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        pagination={{
          pageSize: 7,
          responsive: true,
          hideOnSinglePage: true,
        }}
        scroll={{
          x: "100%",
        }}
        style={{ width: "75%", maxWidth: "none" }}
      />
    </div>
  );
};

export default CommonTable;
