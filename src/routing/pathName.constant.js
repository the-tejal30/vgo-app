const HOME = "home";
const DASHBOARD = "dashboard"
const LOGIN = 'login';
const SIGNUP = 'signup';
const PROFILE = 'profile';
const SERVICES = "services";
const NEW_ORDER = "new-order";
const MY_ORDER = 'my-order';
const MY_PRODUCTS = 'my-products';
const MY_STORES = "my-stores";
const PAYMENT = "payment";
const PAYMENT_VGOTOANY = "vgo-to-any";
const PAYMENT_ANYTOVGO = "any-to-vgo";
const MY_TRANSACTIONS = "my-transactions";
const MY_CASHPOINTS = 'my-cashpoints';
const SUBSCRIPTION = "subscription";
const ADDNEW_SUBSCRIPTION = "add-new";
const MY_SUBSCRIPTION = "my-subscription";
const INVESTMENT = "investment";
const ADDNEW_INVESTMENT = "add-new";
const MY_INVESTMENTS = "my-investment";
const TEAM = "team";
const JOIN_TEAM = "join-team";
const MY_TEAM = "my-team";
const MY_PROFIT = "my-profit";

const pathName = {
    ROOT: "/",
    HOME: `/${HOME}`,
    PROFILE: `/${HOME}/${PROFILE}`,
    DASHBOARD: `/${HOME}/${DASHBOARD}`,
    NEW_ORDER: `/${HOME}/${SERVICES}/${NEW_ORDER}`,
    MY_ORDER: `/${HOME}/${SERVICES}/${MY_ORDER}`,
    MY_PRODUCTS: `/${HOME}/${SERVICES}/${MY_PRODUCTS}`,
    MY_STORES: `/${HOME}/${SERVICES}/${MY_STORES}`,
    PAYMENT_VGOTOANY: `/${HOME}/${PAYMENT}/${PAYMENT_VGOTOANY}`,
    PAYMENT_ANYTOVGO: `/${HOME}/${PAYMENT}/${PAYMENT_ANYTOVGO}`,
    MY_TRANSACTIONS: `/${HOME}/${MY_TRANSACTIONS}`,
    MY_CASHPOINTS: `/${HOME}/${MY_CASHPOINTS}`,
    ADDNEW_SUBSCRIPTION: `/${HOME}/${SUBSCRIPTION}/${ADDNEW_SUBSCRIPTION}`,
    MY_SUBSCRIPTION: `/${HOME}/${SUBSCRIPTION}/${MY_SUBSCRIPTION}`,
    ADDNEW_INVESTMENT: `/${HOME}/${INVESTMENT}/${ADDNEW_INVESTMENT}`,
    MY_INVESTMENTS: `/${HOME}/${INVESTMENT}/${MY_INVESTMENTS}`,
    JOIN_TEAM: `/${HOME}/${TEAM}/${JOIN_TEAM}`,
    MY_TEAM: `/${HOME}/${TEAM}/${MY_TEAM}`,
    MY_PROFIT: `/${HOME}/${TEAM}/${MY_PROFIT}`,
    LOGIN: `/${LOGIN}`,
    SIGNUP: `/${SIGNUP}`
};

export default pathName;

export { HOME, DASHBOARD, PROFILE, SERVICES, NEW_ORDER, MY_ORDER, MY_PRODUCTS, MY_STORES, PAYMENT, PAYMENT_ANYTOVGO, PAYMENT_VGOTOANY, MY_TRANSACTIONS, SUBSCRIPTION, ADDNEW_SUBSCRIPTION, MY_SUBSCRIPTION, INVESTMENT, ADDNEW_INVESTMENT, MY_INVESTMENTS, TEAM, JOIN_TEAM, MY_TEAM, MY_PROFIT, LOGIN, SIGNUP };
