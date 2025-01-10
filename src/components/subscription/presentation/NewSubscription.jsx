import React from "react";
import ANTDInput from "../../../shared/antd/ANTDInput";
import ANTDDropdown from "../../../shared/antd/ANTDDropdown";
import ANTDSpace from "../../../shared/antd/ANTDSpace";
import { DownOutlined } from "@ant-design/icons";
import ANTDButton from "../../../shared/antd/ANTDButton";
import subscription from "../container/subscription.container";
import Dropdown from "../../common/container/dropdown.container";
import CommonForm from "../../common/component/Form";
import "../../Services/service.scss";

function NewSubscription() {
  const { form, items, formData, handleInputChange, handleSubmit } = subscription();
  const { selectedAction, menuProps } = Dropdown({
    items,
    handleInputChange,
    dropDownLabel: "subscription_type",
  });

  const subscriptionColumn = () => [
    {
      title: "Subscription Type",
      key: "subscription_type",
      dataIndex: "subscription_type",
      render: () => (
        <ANTDDropdown
          menu={menuProps}
          value={formData.subscription_type}
          onSelect={(value) => handleInputChange("subscription_type", value)}
        >
          <ANTDButton className="dropdown-button">
            <ANTDSpace
              className="w-100 d-flex space-between"
              style={{ color: "gray" }}
            >
              {selectedAction} <DownOutlined />
            </ANTDSpace>
          </ANTDButton>
        </ANTDDropdown>
      ),
    },
    {
      title: "Subscription Amount",
      key: "subscription_amount",
      dataIndex: "subscription_amount",
      render: () => (
        <ANTDInput
          type="number"
          value={formData.subscription_amount}
          onChange={(e) =>
            handleInputChange("subscription_amount", e.target.value)
          }
        />
      ),
    },
  ];

  return (
    <CommonForm
      form={form}
      column={subscriptionColumn}
      title="New Subscription"
      buttonTxt="Subscribe"
      formData={formData}
      handleSubmit={handleSubmit}
    />
  );
}

export default NewSubscription;
