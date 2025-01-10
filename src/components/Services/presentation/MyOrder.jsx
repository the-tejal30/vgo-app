import React from "react";
import CommonTable from "../../common/component/Table";
import newOrder from "../container.js/newOrder.container";

const MyOrder = () => {
  const { orderList, loading, error, orderColumn } = newOrder();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CommonTable
      columns={orderColumn()}
      dataSource={orderList}
      title="My Orders"
    />
  );
};

export default MyOrder;
