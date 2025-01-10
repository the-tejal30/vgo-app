import React from "react";
import CommonTable from "../../common/component/Table";
import investmentContainer from "../container/investment.container";

const MyInvestment = () => {
  const { investment, loading, error, investmentColumn } =
    investmentContainer();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CommonTable
      columns={investmentColumn()}
      dataSource={investment}
      title="My Investments"
    />
  );
};

export default MyInvestment;
