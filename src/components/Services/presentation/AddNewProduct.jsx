import React from "react";
import ANTDInput from "../../../shared/antd/ANTDInput";
import CommonForm from "../../common/component/Form";

const AddNewProduct = ({ form, addProduct, handleAddProduct, handleInputChange, isEditMode }) => {

    const addNewProductColumn = () => [
        {
            title: "Product Name",
            key: "product_name",
            dataIndex: "product_name",
            render: () => (
                <ANTDInput
                    value={addProduct?.product_name}
                    onChange={(e) => handleInputChange("product_name", e.target.value)}
                />
            ),
        },
        {
            title: "Product Description",
            key: "product_desc",
            dataIndex: "product_desc",
            render: () => (
                <ANTDInput
                    value={addProduct?.store_type}
                    onChange={(e) => handleInputChange("product_desc", e.target.value)}
                />
            ),
        },
        {
            title: "Product Category",
            key: "category",
            dataIndex: "category",
            render: () => (
                <ANTDInput
                    value={addProduct?.industry}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                />
            ),
        },
        {
            title: "Product Price",
            key: "product_price",
            dataIndex: "product_price",
            render: () => (
                <ANTDInput
                    value={addProduct?.category}
                    onChange={(e) => handleInputChange("product_price", e.target.value)}
                />
            ),
        }
    ];

    return (
        <CommonForm
            form={form}
            formData={addProduct}
            column={addNewProductColumn}
            title={isEditMode ? "Update Product" : "Create Product"}
            buttonTxt={isEditMode ? "Update Product" : "Create Product"}
            handleSubmit={handleAddProduct}
        />
    );
}

export default AddNewProduct;
