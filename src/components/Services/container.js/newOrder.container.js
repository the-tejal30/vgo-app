import { useState, useEffect, useCallback } from "react";
import {
  getProductsApi,
  getOrdersApi,
  postNewOrder,
  getSearchHistory,
  createSearchHistory,
  getRecentOrders,
} from "../services.api";
import { message } from "antd";
import { useFormFn } from "../../../shared/antd/ANTDForm";
import { useNavigate } from "react-router-dom";
import pathName from "../../../routing/pathName.constant";
import { UseContext } from "../../../context/context";

const newOrder = () => {
  const user = UseContext();
  const navigate = useNavigate();
  const form = useFormFn();
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const formInitialValues = {
    username: user?.username,
    order_type: "D",
    category: "Order",
    sub_category: "Grocery",
    item_name: "",
    order_items: "",
    order_priority: "",
  };
  const [formData, setFormData] = useState(formInitialValues);
  const [allItems, setAllItems] = useState([]);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null)

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setProductList(response?.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrdersApi({
        username: user?.username,
        category: "Order",
        subCategory: "Grocery",
      });
      const orders = response?.data?.flatMap((group) => group.orders) || [];
      setOrderList(orders);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchHistory = async () => {
    try {
      const response = await getSearchHistory({ username: user?.username });
      setSearchHistory(response?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      setLoading(true);
      const response = await getRecentOrders();
      const items = response?.search_items || [];
      const allItems = items.flatMap((category) =>
        category.sub_categories.flatMap((subCategory) =>
          subCategory.items.map((item) => ({
            category: subCategory?.name,
            item,
          }))
        )
      );
      setAllItems(allItems);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) return;

    const newSearchItem = {
      username: user?.username,
      search_item: searchTerm,
      item_category: "Grocery",
      item_sub_category: "Grocery",
      item_icon_path: "grocery.png",
    };

    try {
      await createSearchHistory(newSearchItem);
      setSearchTerm("");
      fetchSearchHistory();
      setPopoverVisible(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  
  useEffect(() => {
    if (selectedItem) {
      form.setFieldsValue({
        item_name: selectedItem?.item,
      });
    }
  }, [selectedItem, handleInputChange]);

  const handleSubmit = useCallback(
    async (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      try {
        const response = await postNewOrder(formData);
        if (response.success) {
          setFormData(formInitialValues);
          message.success("Order created successfully!");
          setModalVisible(false);
          form.resetFields();
          setTimeout(() => {
            navigate(pathName.MY_ORDER);
          }, 1500);
        }
      } catch (error) {
        alert("Error creating order!");
      }
    },
    [formData]
  );

  const handleSearchWithPopover = () => {
    handleSearch();
    setPopoverVisible(false);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchSearchHistory();
    fetchRecentOrders();
  }, []);

  const filteredItems = allItems.filter(
    (item) =>
      item?.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productsColumn = () => [
    {
      title: "Product Name",
      key: "product_name",
      dataIndex: "product_name",
    },
    {
      title: "Product Description",
      key: "product_desc",
      dataIndex: "product_desc",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
  ];

  const orderColumn = () => [
    {
      title: "Order ID",
      key: "order_no",
      dataIndex: "order_no",
    },
    {
      title: "Order Name",
      key: "item_name",
      dataIndex: "item_name",
    },
    {
      title: "Order Description",
      key: "order_items",
      dataIndex: "order_items",
    },
    // {
    //   title: "Order Type",
    //   key: "order_type",
    //   dataIndex: "order_type",
    // },
    // {
    //   title: "Order Amount",
    //   key: "order_amount",
    //   dataIndex: "order_amount",
    // },
    {
      title: "Order Date",
      key: "order_date",
      dataIndex: "order_date",
    },
  ];

  const items = [
    {
      label: "Now",
      key: "now",
    },
    {
      label: "Later",
      key: "later",
    },
  ];
  return {
    form,
    items,
    productList,
    loading,
    error,
    orderList,
    formData,
    searchHistory,
    modalVisible,
    searchTerm,
    allItems,
    filteredItems,
    popoverVisible,
    selectedItem,
    setSelectedItem,
    setPopoverVisible,
    handleSearchWithPopover,
    setSearchTerm,
    setModalVisible,
    handleSearch,
    productsColumn,
    orderColumn,
    handleInputChange,
    handleSubmit,
  };
};

export default newOrder;
