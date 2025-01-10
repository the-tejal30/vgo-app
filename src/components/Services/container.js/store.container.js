import { useState, useEffect, useCallback } from "react";
import {
  getStore,
  addStore as createStore,
  updateStore,
  getStoreProducts,
  addStoreProducts,
  updateStoreProducts,
} from "../services.api";
import { message } from "antd";
import { useFormFn } from "../../../shared/antd/ANTDForm";
import { UseContext } from "../../../context/context";

const store = () => {
  const user = UseContext();
  const form = useFormFn();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stores, setStores] = useState([]);
  const storeInitialValues = {
    username: user?.username,
    store_name: "",
    store_type: "",
    industry: "",
    category: "",
    supply_items: "",
    location: "",
    about: "",
  };
  const [storeDetails, setStoreDetails] = useState(storeInitialValues);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStoreProducts, setSelectedStoreProducts] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [productDetails, setProductDetails] = useState({
    store_id: selectedStoreId,
    product_name: "",
    product_desc: "",
    category: "",
    product_price: "",
  });

  useEffect(() => {
    setProductDetails((prev) => ({
      ...prev,
      store_id: String(selectedStoreId || ""),
    }));
  }, [selectedStoreId]);

  const handleProductInputChange = useCallback((field, value) => {
    setProductDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  useEffect(() => {
    if (isModalVisible && isEditMode) {
      form.setFieldsValue(storeDetails);
    }
  }, [isModalVisible, storeDetails, isEditMode]);

  useEffect(() => {
    if (isProductModalVisible) {
      form.setFieldsValue(productDetails);
    }
  }, [isProductModalVisible, productDetails, form]);

  const handleOpenProductModal = (productId) => {
    setSelectedProductId(productId);
    setIsProductModalVisible(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalVisible(false);
  };

  const fetchStoreProducts = async (storeId) => {
    try {
      setLoading(true);
      const response = await getStoreProducts({ store_id: storeId });

      const products = Array.isArray(response?.data)
        ? response.data
        : response?.data
        ? [response.data]
        : [];

      setSelectedStoreProducts(products);
    } catch (err) {
      setError(err.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStore = (storeId) => {
    setSelectedStoreId(storeId);
    setProductDetails((prev) => ({
      ...prev,
      store_id: String(storeId),
    }));
    fetchStoreProducts(storeId);
    setStoreDetails(storeInitialValues);
  };

  const handleOpenModal = () => {
    if (isEditMode) {
      form.setFieldsValue(storeDetails);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    form.resetFields();
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await getStore({ username: user?.username });
      setStores(response || []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStore = useCallback(
    async (e, isUpdate = false) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      try {
        let response;
        if (isUpdate) {
          const updatedStoreDetails = {
            ...storeDetails,
            status: "Active",
          };
          response = await updateStore(
            storeDetails?.store_id,
            updatedStoreDetails
          );
        } else {
          response = await createStore(storeDetails);
        }

        if (response && response.success) {
          setStoreDetails(storeInitialValues);
          fetchStores();
          message.success(response.message);
          setIsModalVisible(false);
          form.resetFields();
        } else {
          throw new Error(
            response?.message || "API Error: No success response"
          );
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    },
    [storeDetails]
  );

  const handleInputChange = (field, value) => {
    setStoreDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
    form.setFieldsValue({ [field]: value });
  };

  const handleEditStore = (storeId) => {
    const storeToEdit = stores.data
      .flatMap((industry) => industry.stores)
      .find((store) => store.store_id === storeId);
    setStoreDetails(storeToEdit || storeInitialValues);
  };

  const handleBackToStores = () => {
    setSelectedStoreId(null);
  };

  const handleAddProduct = useCallback(
    async (e, isUpdate = false) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      try {
        let response;
        if (isUpdate) {
          const updatedProductDetails = {
            ...productDetails,
            price: productDetails.product_price,
            status: "Active",
          };
          response = await updateStoreProducts(
            selectedProductId,
            updatedProductDetails
          );
        } else {
          response = await addStoreProducts(productDetails);
        }

        if (response && response.success) {
          message.success(response.message);
          setIsProductModalVisible(false);
          fetchStoreProducts();
          form.resetFields();
        } else {
          throw new Error(
            response?.message || "API Error: No success response"
          );
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    },
    [productDetails]
  );

  return {
    form,
    loading,
    error,
    stores,
    storeDetails,
    isModalVisible,
    isEditMode,
    selectedStoreProducts,
    selectedStoreId,
    isProductModalVisible,
    productDetails,
    handleProductInputChange,
    handleCloseProductModal,
    handleOpenProductModal,
    handleSelectStore,
    setIsEditMode,
    setIsModalVisible,
    handleOpenModal,
    handleCloseModal,
    handleCreateStore,
    handleInputChange,
    handleEditStore,
    handleBackToStores,
    handleAddProduct,
  };
};

export default store;
