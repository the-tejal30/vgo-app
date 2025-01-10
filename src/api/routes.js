import OTP from "antd/es/input/OTP";

const API_ROUTES = {
    // Login
    LOGIN: '/profile/public/api/users/user-login',
    SINGUP: '/profile/public/api/users/register',
    ALL_USERS: '/profile/public/api/users',
    OTP_VALIDATION: '/profile/public/api/users/otp-validation',

    // Team
    JOIN_TEAM: '/profile/public/api/startup-team/create-startup-team',
    MY_TEAMS: ({ team_id }) => `/profile/public/api/startup-team/teams/${team_id}/get-startup-teams`,
    MY_PROFITS: ({ team_id }) => `/profile/public/api/startup-team/team-profit-share/team/${team_id}/get-team-profits`,
    UPDATE_CANDIDATES_TO_HRREF: (id) => `/profile/public/api/startup-team/${id}/update-startup-team`,
    UPDATE_HRREF_TO_OPR: (id) => `/profile/public/api/startup-team/${id}/update-startup-opr-team`,

    // My Profits
    TEAM_MEMBER_PROFITS: ({ team_id }) => `/profile/public/api/startup-team/team-profit-share/team/${team_id}/get-team-profits`,
    INVESTOR_PROFITS: ({ company_code }) => `/profile/public/api/startup-team/team-profit-share/company/${company_code}/get-team-profits`,

    // Services
    GET_SEARCH_HISTORY: ({ username }) => `/profile/public/api/usersearch/${username}/get-user-search-history`,
    CREATE_SEARCH_HISTORY: '/profile/public/api/usersearch/create-search-history',
    GET_RECENT_ORDERS: '/profile/public/api/profiles/get-settings-file',
    EDIT_ORDER: ({ id }) => `/profile/public/api/stores/products/orders/${id}/update-order`,
    NEW_ORDER: '/profile/public/api/stores/products/orders/create-order',
    USER_ORDERS: ({ username, category, subCategory }) =>
        `/profile/public/api/stores/products/orders/${username}/${category}/${subCategory}/get-user-orders`,
    ALL_PRODUCTS: '/profile/public/api/stores/products/get-all-products',
    GET_STORE: ({ username }) => `/profile/public/api/stores/${username}/get-user-stores`,
    ADD_STORE: '/profile/public/api/stores/create-store',
    UPDATE_STORE: (id) => `/profile/public/api/stores/${id}/update-store`,
    GET_STORE_PRODUCTS: ({ store_id }) => `/profile/public/api/stores/products/${store_id}/get-products`,
    CREATE_PRODUCT: '/profile/public/api/stores/products/create-product',
    UPDATE_PRODUCT: (id) => `/profile/public/api/stores/products/${id}/update-product`,

    // Payments
    VGO_TO_ANY: ({id, file, status}) => `/wallet/public/api/transfers/vgowallet/update-transfer/${id}/${file}/${status}`,
    ANY_TO_VGO: '/wallet/public/api/transfers/vgowallet/create-transfer',
    MY_TRANSACTIONS: '/profile/public/api/payments/my-transactions',
    TRANSACTIONS_MODE_ACCOUNT_DETAILS: ({ currency }) => `/wallet/public/api/banks/sources/currency/${currency}/get-bank-sources`,
    BANK_LIST: ({ username }) => `/wallet/public/api/bankers/bank/${username}/get-user-banks`,

    // Subscription
    NEW_SUBSCRIPTION: '/profile/public/api/subscriptions/create-subscription',
    USER_SUBSCRIPTIONS: ({ username }) => `/profile/public/api/subscriptions/${username}/get-user-subscriptions`,

    // My Investments
    NEW_INVESTMENT: '/profile/public/api/investments/create-investment',
    USER_INVESTMENTS: ({ username }) => `/profile/public/api/investments/${username}/get-investments`,

    //Cashpoints
    GET_CASHPOINTS: ({ country }) => `/wallet/public/api/transfers/cash-points/${country}/get-cash-points`,
    CREATE_CASHPOINTS: '/wallet/public/api/transfers/cash-points/create-cash-point',
    UPDATE_CASHPOINTS: (id) => `/wallet/public/api/transfers/cash-points/${id}/update-cash-point`
};

export default API_ROUTES;
