import React, { useEffect } from "react";
import ANTDForm from "../../../shared/antd/ANTDForm";
import ANTDButton from "../../../shared/antd/ANTDButton";
import { ANTDFormItem } from "../../../shared/antd/ANTDForm";
import ANTDModal from "../../../shared/antd/ANTDModal";

const CommonForm = ({form, column, title, buttonTxt, handleSubmit, formData, isModalVisible, modalMessage, closeModal, modalTitle }) => {

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [form]);

  return (
    <div className="w-100 d-flex flex-column align-center gap-10">
      <>
      <h2>{title}</h2>
      <ANTDForm
        form={form}
        layout="vertical"
        style={{ width: "75%", maxWidth: "none" }}
        onFinish={handleSubmit}
        // initialValues={formData}
        initialValues={{
          remember: true,
          }}
      >
        {column().map((column) => (
          <ANTDFormItem
            key={column.key}
            label={column.title}
            name={column.dataIndex}
            // rules={[
            //   { required: true, message: `Please input ${column.title}!` },
            // ]}
          >
            {column.render()}
          </ANTDFormItem>
        ))}
        <ANTDFormItem className="d-flex align-center justify-center">
          <ANTDButton type="primary" htmlType="submit" className="form-btn">
            {buttonTxt}
          </ANTDButton>
        </ANTDFormItem>
      </ANTDForm>
      </>
      <ANTDModal
        title={modalTitle}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        centered
      >
        <p>{modalMessage}</p>
      </ANTDModal>
    </div>
  );
};

export default CommonForm;
