import React from "react";
import CommonTable from "../../common/component/Table";
import transactionList from "../payment.description";

const MyTransactions = () => {
  const transactionColumns = () => [
    {
      title: "Transaction Number",
      key: "transactionNumber",
      dataIndex: "transactionNumber",
    },
    {
      title: "Transaction Type",
      key: "transactionType",
      dataIndex: "transactionType",
    },
    {
      title: "Payment Mode",
      key: "paymentMode",
      dataIndex: "paymentMode",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Remarks",
      key: "remarks",
      dataIndex: "remarks",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
  ];

  return (
    <CommonTable
      columns={transactionColumns()}
      dataSource={transactionList}
      title="My Transactions"
    />
  );
};

export default MyTransactions;
