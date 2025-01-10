import { postMethod } from "../../api/methods";
import API_ROUTES from "../../api/routes";

const { USER_SUBSCRIPTIONS, NEW_SUBSCRIPTION } = API_ROUTES

const createNewSubscriptionApi = async (payload) => {
    const response = await postMethod(NEW_SUBSCRIPTION, payload)
    return response?.data;
};

const getSubscriptionsApi = async (params) => {
    const response = await postMethod(USER_SUBSCRIPTIONS(params));
    return response?.data;
};

export { getSubscriptionsApi, createNewSubscriptionApi }