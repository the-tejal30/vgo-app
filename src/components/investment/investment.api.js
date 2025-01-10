import { postMethod } from "../../api/methods";
import API_ROUTES from "../../api/routes";

const { USER_INVESTMENTS, NEW_INVESTMENT } = API_ROUTES;

const getInvestmentApi = async (params) => {
    const response = await postMethod(USER_INVESTMENTS(params));
    return response?.data;
};

const createNewInvestmentApi = async (payload) => {
    const response = await postMethod(NEW_INVESTMENT, payload)
    return response?.data;
};

export { getInvestmentApi, createNewInvestmentApi }