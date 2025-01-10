import React from "react";
import ANTDInput from "../../../shared/antd/ANTDInput";
import CommonForm from "../../common/component/Form";
import "../service.scss";

const AddNewStore = ({
  form,
  addStore,
  handleCreateStore,
  handleInputChange,
  isEditMode,
}) => {
  const addNewStoreColumn = () => [
    {
      title: "Store Name",
      key: "store_name",
      dataIndex: "store_name",
      render: () => (
        <ANTDInput
          value={addStore?.store_name}
          onChange={(e) => handleInputChange("store_name", e.target.value)}
        />
      ),
    },
    {
      title: "Store Type",
      key: "store_type",
      dataIndex: "store_type",
      render: () => (
        <ANTDInput
          value={addStore?.store_type}
          onChange={(e) => handleInputChange("store_type", e.target.value)}
        />
      ),
    },
    {
      title: "Industry",
      key: "industry",
      dataIndex: "industry",
      render: () => (
        <ANTDInput
          value={addStore?.industry}
          onChange={(e) => handleInputChange("industry", e.target.value)}
        />
      ),
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      render: () => (
        <ANTDInput
          value={addStore?.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
        />
      ),
    },
    {
      title: "Supply Items",
      key: "supply_items",
      dataIndex: "supply_items",
      render: () => (
        <ANTDInput
          value={addStore?.supply_items}
          onChange={(e) => handleInputChange("supply_items", e.target.value)}
        />
      ),
    },
    {
      title: "Location",
      key: "location",
      dataIndex: "location",
      render: () => (
        <ANTDInput
          value={addStore?.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      ),
    },
    {
      title: "About",
      key: "about",
      dataIndex: "about",
      render: () => (
        <ANTDInput
          value={addStore?.about}
          onChange={(e) => handleInputChange("about", e.target.value)}
        />
      ),
    },
  ];

  return (
    <div className="create-update-store-form">
      <CommonForm
        form={form}
        formData={addStore}
        column={addNewStoreColumn}
        title={isEditMode ? "Update Store" : "Create Store"}
        buttonTxt={isEditMode ? "Update Store" : "Create Store"}
        handleSubmit={handleCreateStore}
      />
    </div>
  );
};

export default AddNewStore;
