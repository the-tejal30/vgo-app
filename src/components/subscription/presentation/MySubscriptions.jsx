import React from "react";
import CommonTable from "../../common/component/Table";
import subscription from "../container/subscription.container";

const MySubscription = () => {
  const { loading, error, allSubscription, subscriptionColumn } =
    subscription();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CommonTable
      columns={subscriptionColumn()}
      dataSource={allSubscription}
      title="My Subscriptions"
    />
  );
};

export default MySubscription;
