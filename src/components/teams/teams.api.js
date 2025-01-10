import { postMethod } from "../../api/methods";
import API_ROUTES from "../../api/routes";

const {
    MY_TEAMS,
    MY_PROFITS,
    JOIN_TEAM,
    UPDATE_CANDIDATES_TO_HRREF,
    UPDATE_HRREF_TO_OPR
} = API_ROUTES

const joinTeamApi = async (payload) => {
    const response = await postMethod(JOIN_TEAM, payload);
    return response?.data;
};

const getTeamsApi = async (params) => {
    const response = await postMethod(MY_TEAMS(params));
    return response?.data;
};

const getProftisApi = async (params) => {
    const response = await postMethod(MY_PROFITS(params));
    return response?.data;
};

const updateCandidateToHRRef = async (params, payload) => {
    const response = await postMethod(UPDATE_CANDIDATES_TO_HRREF(params), payload);
    return response?.data;
};

const updateHRRefToOpr = async (params, payload) => {
    const response = await postMethod(UPDATE_HRREF_TO_OPR(params), payload);
    return response?.data;
};

export { getTeamsApi, getProftisApi, joinTeamApi, updateCandidateToHRRef, updateHRRefToOpr }