import React from "react";
import ANTDInput from "../../../shared/antd/ANTDInput.jsx";
import ANTDDropdown from "../../../shared/antd/ANTDDropdown.jsx";
import ANTDSpace from "../../../shared/antd/ANTDSpace.jsx";
import { DownOutlined } from "@ant-design/icons";
import ANTDButton from "../../../shared/antd/ANTDButton.jsx";
import ANTDRow from "../../../shared/antd/ANTDRow.jsx";
import ANTDColumn from "../../../shared/antd/ANTDColumn.jsx";
import Dropdown from "../../common/container/dropdown.container.js";
import PaymentContainer from "../container/payments.container.js";
import CommonForm from "../../common/component/Form.jsx";
import ANTDUpload from "../../../shared/antd/ANTDUpload.jsx";
import { PlusOutlined } from "@ant-design/icons";
import "../../Services/service.scss";
import "../payments.scss";
import { ANTDFormItem } from "../../../shared/antd/ANTDForm.jsx";

function VGOToANY() {
  const {
    form,
    dropdownItems,
    bankDropdownItems,
    currencyDropdownItems,
    vgoToAny,
    handleVgoToAnyInputChange,
    createVgoToAnyTransaction,
    isLocked,
    handleLock,
    handleUploadChange,
  } = PaymentContainer();

  const { selectedAction: selectedCurrency, menuProps: currencyMenuProps } =
    Dropdown({
      items: currencyDropdownItems,
      handleInputChange: handleVgoToAnyInputChange,
      dropDownLabel: "currency",
    });

  const { selectedAction: selectedBank, menuProps: bankMenuProps } = Dropdown({
    items: bankDropdownItems,
    handleInputChange: handleVgoToAnyInputChange,
    dropDownLabel: "bank_name",
  });

  const { selectedAction, menuProps } = Dropdown({
    items: dropdownItems,
    handleInputChange: handleVgoToAnyInputChange,
    dropDownLabel: "transfer_account_type",
  });

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const paymentColumn = () => [
    {
      title: "Transfer Mode",
      key: "transfer_account_type",
      dataIndex: "transfer_account_type",
      render: () => (
        <ANTDDropdown
          menu={menuProps}
          trigger={["click"]}
          value={vgoToAny?.transfer_account_type}
          onSelect={(value) =>
            handleVgoToAnyInputChange("transfer_account_type", value)
          }
          disabled={isLocked}
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
      key: "currency",
      dataIndex: "currency",
      render: () => (
        <ANTDDropdown
          menu={currencyMenuProps}
          trigger={["click"]}
          onChange={(value) => handleVgoToAnyInputChange("currency", value)}
          value={vgoToAny?.currency}
          disabled={isLocked}
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
          onSelect={(value) => handleVgoToAnyInputChange("bank_name", value)}
          value={vgoToAny?.bank_name}
          disabled={isLocked}
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
      title: "Amount",
      key: "Amount",
      dataIndex: "Amount",
      render: () => (
        <ANTDRow gutter={[16, 16]} className="d-flex space-between">
          <ANTDColumn xs={24} md={18}>
            <ANTDInput
              placeholder="Enter Amount"
              type="number"
              value={vgoToAny?.transfer_amount}
              onChange={(e) =>
                handleVgoToAnyInputChange("transfer_amount", e.target.value)
              }
              disabled={isLocked}
            />
          </ANTDColumn>
          <ANTDColumn>
            <ANTDButton type="primary" onClick={handleLock} disabled={isLocked}>
              Lock
            </ANTDButton>
          </ANTDColumn>
        </ANTDRow>
      ),
    },
    {
      title: "Bank Account Number",
      key: "account_number",
      dataIndex: "account_number",
      render: () => (
        <ANTDInput
          placeholder="Bank Account Number"
          value={vgoToAny?.account_number}
          onChange={(e) =>
            handleVgoToAnyInputChange("account_number", e.target.value)
          }
          readOnly
          style={{
            backgroundColor: '#f5f5f5',
            borderColor: '#d9d9d9',
            cursor: 'not-allowed',
          }}
      
        />
      ),
    },
    {
      title: "Account Holder Name",
      key: "account_holder_name",
      dataIndex: "account_holder_name",
      render: () => (
        <ANTDInput
          placeholder="Name"
          value={vgoToAny?.account_holder_name}
          onChange={(e) =>
            handleVgoToAnyInputChange("account_holder_name", e.target.value)
          }
          readOnly
          style={{
            backgroundColor: '#f5f5f5',
            borderColor: '#d9d9d9',
            cursor: 'not-allowed',
          }}
      
        />
      ),
    },
    {
      title: "Upload Receipt",
      key: "receipt_upload",
      dataIndex: "receipt_upload",
      render: () => (
        <ANTDFormItem valuePropName="fileList" getValueFromEvent={normFile}>
          <ANTDUpload
            listType="picture-card"
            showUploadList={{ showPreviewIcon: true }}
            beforeUpload={() => false}
            onPreview={async (file) => {
              let src = file.url;
              if (!src) {
                src = await new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file.originFileObj);
                  reader.onload = () => resolve(reader.result);
                });
              }
              const imgWindow = window.open(src);
              imgWindow.document.write(
                `<img src="${src}" style="width:100%;"/>`
              );
            }}
            onChange={handleUploadChange}
          >
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </ANTDUpload>
        </ANTDFormItem>
      ),
    },
  ];

  return (
    <div className="upi-to-vgo-form">
      <CommonForm
        form={form}
        formData={vgoToAny}
        handleSubmit={createVgoToAnyTransaction}
        column={paymentColumn}
        title="VGO TO ANY New Transaction"
        buttonTxt="Pay Now"
      />
    </div>
  );
}

export default VGOToANY;
