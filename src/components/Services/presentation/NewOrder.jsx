import React, { useEffect } from "react";
import ANTDInput from "../../../shared/antd/ANTDInput";
import ANTDDropdown from "../../../shared/antd/ANTDDropdown";
import ANTDSpace from "../../../shared/antd/ANTDSpace";
import { DownOutlined } from "@ant-design/icons";
import ANTDButton from "../../../shared/antd/ANTDButton";
import Dropdown from "../../common/container/dropdown.container";
import CommonForm from "../../common/component/Form";
import "../service.scss";

function NewOrder({ selectedItem, form, items, formData, handleInputChange, handleSubmit }) {
  const { selectedAction, menuProps } = Dropdown({
    items,
    handleInputChange,
    dropDownLabel: "order_priority",
  });

  useEffect(() => {
    if (selectedItem) {
      handleInputChange("item_name", selectedItem?.item);
    }
  }, [selectedItem, handleInputChange]);


  const serviceColumn = () => [
    {
      title: "Order Name",
      key: "item_name",
      dataIndex: "item_name",
      render: () => (
        <ANTDInput
          value={formData?.item_name}
          onChange={(e) => handleInputChange("item_name", e.target.value)}
        />
      ),
    },
    {
      title: "Order Description",
      key: "order_items",
      dataIndex: "order_items",
      render: () => (
        <ANTDInput
          value={formData?.order_items}
          onChange={(e) => handleInputChange("order_items", e.target.value)}
        />
      ),
    },
    {
      title: "Select Action",
      key: "order_priority",
      dataIndex: "order_priority",
      render: () => (
        <ANTDDropdown
          menu={menuProps}
          onSelect={(value) =>
            handleInputChange("order_priority", value || "New")
          }
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
  ];

  return (
    <CommonForm
      form={form}
      formData={formData}
      column={serviceColumn}
      title="Place New Order"
      buttonTxt="Place Order"
      handleSubmit={handleSubmit}
    />
  );
}

export default NewOrder;
