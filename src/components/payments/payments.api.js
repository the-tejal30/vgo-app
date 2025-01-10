import { postMethod } from "../../api/methods";
import API_ROUTES from "../../api/routes";

const {
    GET_CASHPOINTS,
    CREATE_CASHPOINTS,
    UPDATE_CASHPOINTS,
    TRANSACTIONS_MODE_ACCOUNT_DETAILS,
    BANK_LIST,
    VGO_TO_ANY,
    ANY_TO_VGO
} = API_ROUTES

const getCashPointsAPI = async (params) => {
    const response = await postMethod(GET_CASHPOINTS(params))
    return response?.data;
}

const createCashPointsAPI = async (payload) => {
    const response = await postMethod(CREATE_CASHPOINTS, payload);
    return response?.data;
}

const updateCashPointsAPI = async (params, payload) => {
    const response = await postMethod(UPDATE_CASHPOINTS(params), payload);
    return response?.data;
}

const getTransactionModes = async (params) => {
    const response = await postMethod(TRANSACTIONS_MODE_ACCOUNT_DETAILS(params))
    return response?.data;
}

const getBankList = async (params) => {
    const response = await postMethod(BANK_LIST(params));
    return response?.data;
}

const sendVgoToAny = async (params) => {
    const response = await postMethod(VGO_TO_ANY(params));
    return response?.data;
}

const sendAnyToVgo = async (payload) => {
    const response = await postMethod(ANY_TO_VGO, payload);
    return response?.data;
}

export { getCashPointsAPI, createCashPointsAPI, updateCashPointsAPI, getBankList, getTransactionModes, sendAnyToVgo, sendVgoToAny }