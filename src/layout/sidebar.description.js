import pathName, { DASHBOARD, SERVICES, PAYMENT, SUBSCRIPTION, INVESTMENT, TEAM } from "../routing/pathName.constant";
import {
    HomeIcon,
    ServicesIcon,
    PaymentsIcon,
    SubscriptionIcon,
    InvestmentIcon,
    TeamsIcon,
} from "../utils/icons";


const serviceChildList = [
    {
        key: pathName.NEW_ORDER,
        label: 'New Order'
    },
    {
        key: pathName.MY_ORDER,
        label: 'My Order'
    },
    {
        key: pathName.MY_PRODUCTS,
        label: 'My Products'
    },
    {
        key: pathName.MY_STORES,
        label: 'My Stores'
    }
]

const paymentChildList = [
    {
        key: pathName.PAYMENT_VGOTOANY,
        label: 'VGO to ANY'
    },
    {
        key: pathName.PAYMENT_ANYTOVGO,
        label: 'ANY to VGO'
    },
    {
        key: pathName.MY_TRANSACTIONS,
        label: 'My Transactions'
    },
    {
        key: pathName.MY_CASHPOINTS,
        label: 'My Cashpoints'
    }
]

const subscriptionChildList = [
    {
        key: pathName.ADDNEW_SUBSCRIPTION,
        label: 'New Subscription'
    },
    {
        key: pathName.MY_SUBSCRIPTION,
        label: 'My Subscriptions'
    }
]

const investmentChildList = [
    {
        key: pathName.ADDNEW_INVESTMENT,
        label: 'New Investment'
    },
    {
        key: pathName.MY_INVESTMENTS,
        label: 'My Investment'
    }
]

const teamChildList = [
    {
        key: pathName.JOIN_TEAM,
        label: 'Join Team'
    },
    {
        key: pathName.MY_TEAM,
        label: 'My Team'
    },
    {
        key: pathName.MY_PROFIT,
        label: 'My Profits'
    }
]

const sidebarMenus = [
    {
        key: DASHBOARD,
        label: 'Dashboard',
        icon: HomeIcon,
    },
    {
        key: TEAM,
        label: 'Teams',
        icon: TeamsIcon,
        children: teamChildList.map(prop => ({
            ...prop,
            key: `${prop.key}`,
        })),
    },
    {
        key: SERVICES,
        label: 'Services',
        icon: ServicesIcon,
        children: serviceChildList.map(prop => ({
            ...prop,
            key: `${prop.key}`,
        })),
    },
    {
        key: PAYMENT,
        label: 'Payments',
        icon: PaymentsIcon,
        children: paymentChildList.map(prop => ({
            ...prop,
            key: `${prop.key}`,
        })),
    },
    {
        key: SUBSCRIPTION,
        label: 'Subscription',
        icon: SubscriptionIcon,
        children: subscriptionChildList.map(prop => ({
            ...prop,
            key: `${prop.key}`,
        })),
    }, {
        key: INVESTMENT,
        label: 'Investment',
        icon: InvestmentIcon,
        children: investmentChildList.map(prop => ({
            ...prop,
            key: `${prop.key}`,
        })),
    },
]

export { sidebarMenus }