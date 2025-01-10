import {getMethod, postMethod } from "../../api/methods";
import API_ROUTES from "../../api/routes";

const {
    NEW_ORDER,
    ALL_PRODUCTS,
    USER_ORDERS,
    GET_SEARCH_HISTORY,
    CREATE_SEARCH_HISTORY,
    GET_RECENT_ORDERS,
    GET_STORE,
    ADD_STORE,
    UPDATE_STORE,
    GET_STORE_PRODUCTS,
    CREATE_PRODUCT,
    UPDATE_PRODUCT
} = API_ROUTES

const postNewOrder = async (payload) => {
    const response = await postMethod(NEW_ORDER, payload)
    return response?.data
}

const getProductsApi = async () => {
    const response = await postMethod(ALL_PRODUCTS)
    return response?.data
}

const getOrdersApi = async (params) => {
    const response = await postMethod(USER_ORDERS(params));
    return response?.data;
};

const getSearchHistory = async (params) => {
    const response = await postMethod(GET_SEARCH_HISTORY(params));
    return response?.data;
}

const createSearchHistory = async (payload) => {
    const response = await postMethod(CREATE_SEARCH_HISTORY, payload);
    return response?.data;
}

const getRecentOrders = async () => {
    const response = await getMethod(GET_RECENT_ORDERS);
    return response?.data;
}

const getStore = async (params) => {
    const response = await postMethod(GET_STORE(params))
    return response?.data;
}

const addStore = async (payload) => {
    const response = await postMethod(ADD_STORE, payload);
    return response?.data;
}

const updateStore = async (params, payload) => {
    const response = await postMethod(UPDATE_STORE(params), payload);
    return response?.data;
}

const getStoreProducts = async (params) => {
    const response = await postMethod(GET_STORE_PRODUCTS(params))
    return response?.data;
}

const addStoreProducts = async (payload) => {
    const response = await postMethod(CREATE_PRODUCT, payload);
    return response?.data;
}

const updateStoreProducts = async (params, payload) => {
    const response = await postMethod(UPDATE_PRODUCT(params), payload);
    return response?.data;
}
export { getProductsApi, getOrdersApi, postNewOrder, getSearchHistory, createSearchHistory, getRecentOrders, getStore, addStore, updateStore, getStoreProducts, addStoreProducts, updateStoreProducts };
