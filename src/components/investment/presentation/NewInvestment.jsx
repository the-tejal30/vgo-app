import React from "react";
import ANTDInput from "../../../shared/antd/ANTDInput";
import ANTDDropdown from "../../../shared/antd/ANTDDropdown";
import ANTDSpace from "../../../shared/antd/ANTDSpace";
import { DownOutlined } from "@ant-design/icons";
import ANTDButton from "../../../shared/antd/ANTDButton";
import investment from "../container/investment.container";
import Dropdown from "../../common/container/dropdown.container";
import CommonForm from "../../common/component/Form";
import "../../Services/service.scss";

function NewInvestment() {
  const { form, items, formData, handleInputChange, handleSubmit } = investment();
  const { selectedAction, menuProps } = Dropdown({
    items,
    handleInputChange,
    dropDownLabel: "investment_type",
  });

  const investmentColumn = () => [
    {
      title: "Investment Type",
      key: "investment_type",
      dataIndex: "investment_type",
      render: () => (
        <ANTDDropdown
          menu={menuProps}
          value={formData.investment_type}
          onSelect={(value) => handleInputChange("investment_type", value)}
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
      title: "Investment Amount",
      key: "investment_amount",
      dataIndex: "investment_amount",
      render: () => (
        <ANTDInput
          type="number"
          value={formData.investment_amount}
          onChange={(e) =>
            handleInputChange("investment_amount", e.target.value)
          }
        />
      ),
    },
  ];

  return (
    <CommonForm
      form={form}
      column={investmentColumn}
      title="New Investment"
      buttonTxt="Invest Now"
      formData={formData}
      handleSubmit={handleSubmit}
    />
  );
}

export default NewInvestment;
