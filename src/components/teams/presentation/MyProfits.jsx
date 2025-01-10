import React from "react";
import CommonTable from "../../common/component/Table";
import Team from "../container/teams.container";
const MyProfits = () => {
  const { profits, loading, error, profitsColumn } = Team();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CommonTable
      columns={profitsColumn()}
      dataSource={profits}
      title="My Profits"
    />
  );
};

export default MyProfits;
