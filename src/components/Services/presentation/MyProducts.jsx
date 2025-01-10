import React from "react";
import CommonTable from "../../common/component/Table";
import newOrder from "../container.js/newOrder.container";

const MyProducts = () => {
  const { productList, loading, error, productsColumn } = newOrder();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CommonTable
      columns={productsColumn()}
      dataSource={productList}
      title="My Products"
    />
  );
};

export default MyProducts;
