import React from "react";
import ANTDInput from "../../../shared/antd/ANTDInput.jsx";
import ANTDDropdown from "../../../shared/antd/ANTDDropdown.jsx";
import ANTDSpace from "../../../shared/antd/ANTDSpace.jsx";
import { DownOutlined } from "@ant-design/icons";
import ANTDButton from "../../../shared/antd/ANTDButton.jsx";
import Dropdown from "../../common/container/dropdown.container.js";
import PaymentContainer from "../container/payments.container.js";
import CommonForm from "../../common/component/Form.jsx";
import "../../Services/service.scss";
import '../payments.scss'

function ANYToVGO() {
  const { form, dropdownItems, bankDropdownItems, currencyDropdownItems, anyToVgo, handleAnyToVgoInputChange, createAnyToVgoTransaction } = PaymentContainer();

  const { selectedAction: selectedCurrency, menuProps: currencyMenuProps } =
    Dropdown({ items: currencyDropdownItems, handleInputChange: handleAnyToVgoInputChange, dropDownLabel: 'transfer_currency' });

  const { selectedAction: selectedBank, menuProps: bankMenuProps } =
    Dropdown({ items: bankDropdownItems, handleInputChange: handleAnyToVgoInputChange, dropDownLabel: 'bank_name' });

  const { selectedAction, menuProps } = Dropdown({ items: dropdownItems, handleInputChange: handleAnyToVgoInputChange, dropDownLabel: 'transfer_account_type' });

  const paymentColumn = () => [
    {
      title: "Transfer Mode",
      key: "transfer_account_type",
      dataIndex: "transfer_account_type",
      render: () => (
        <ANTDDropdown menu={menuProps} trigger={['click']}
          onSelect={( value ) => handleAnyToVgoInputChange("transfer_account_type", value)}
          value={anyToVgo?.transfer_account_type}
        >
          <ANTDButton className="dropdown-button">
            <ANTDSpace
              className="w-100 d-flex space-between"
              style={{ color: "gray" }}
            >
              {selectedAction || "Select Mode"}
              <DownOutlined />
            </ANTDSpace>
          </ANTDButton>
        </ANTDDropdown>
      ),
    },
    {
      title: "Select Currency",
      key: "transfer_currency",
      dataIndex: "currency",
      render: () => (
        <ANTDDropdown
          menu={currencyMenuProps}
          trigger={["click"]}
          onSelect={(value) =>
            handleAnyToVgoInputChange("transfer_currency", value)
          }
          value={anyToVgo?.transfer_currency}
        >
          <ANTDButton className="dropdown-button">
            <ANTDSpace
              className="w-100 d-flex space-between"
              style={{ color: "gray" }}
            >
              {selectedCurrency || "Select Currency"}
              <DownOutlined />
            </ANTDSpace>
          </ANTDButton>
        </ANTDDropdown>
      ),
    },
    {
      title: "Select Bank",
      key: "bank_name",
      dataIndex: "bank_name",
      render: () => (
        <ANTDDropdown
          menu={bankMenuProps}
          trigger={["click"]}
          onSelect={(value) =>
            handleAnyToVgoInputChange("bank_name", value)
          }
          value={anyToVgo?.bank_name}
        >
          <ANTDButton className="dropdown-button">
            <ANTDSpace
              className="w-100 d-flex space-between"
              style={{ color: "gray" }}
            >
              {selectedBank || "Select Bank"}
              <DownOutlined />
            </ANTDSpace>
          </ANTDButton>
        </ANTDDropdown>
      ),
    },
    {
      title: "UPI ID",
      key: "account_number",
      dataIndex: "account_number",
      render: () => <ANTDInput placeholder="Enter UPI ID"
        value={anyToVgo.account_number}
        onChange={(e) => handleAnyToVgoInputChange("account_number", e.target.value)}
      />,
    },
    {
      title: "Amount",
      key: "transfer_amount",
      dataIndex: "transfer_amount",
      render: () => <ANTDInput type="number" placeholder="Enter Amount"
        value={anyToVgo.transfer_amount}
        onChange={(e) => handleAnyToVgoInputChange("transfer_amount", e.target.value)}
      />,
    },
  ];

  return (

    <div className="upi-to-vgo-form">
      <CommonForm
        form={form}
        column={paymentColumn}
        title="ANY to VGO New Transaction"
        buttonTxt="Pay Now"
        formData={anyToVgo}
        handleSubmit={createAnyToVgoTransaction}
      />
    </div>
  );
}

export default ANYToVGO;

