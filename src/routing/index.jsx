import React from "react";
import { lazy, memo } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import pathName from "./pathName.constant";
import PageNotFound from "../components/PageNotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import Auth from "../components/login/presentation/Auth";

const AppLayout = lazy(() => import("../layout/presentation/AppLayout"));
const Profile = lazy(()=> import("../components/profile/Profile"))
const Dashboard = lazy(() => import("../components/dashboard"));
const DirectOrder = lazy(() =>
  import("../components/Services/presentation/RecentOrders")
);
const MyOrder = lazy(() =>
  import("../components/Services/presentation/MyOrder")
);
const MyProducts = lazy(() =>
  import("../components/Services/presentation/MyProducts")
);
const MyStores = lazy(()=> 
  import("../components/Services/presentation/MyStores"));
const VGOToANY = lazy(() =>
  import("../components/payments/presentation/VGOToAny")
);
const ANYToVGO = lazy(() =>
  import("../components/payments/presentation/ANYToVGO")
);
const MyTransactions = lazy(() =>
  import("../components/payments/presentation/MyTransactions")
);
const CashPoints = lazy(() => import('../components/payments/presentation/CashPoints'))
const NewSubscription = lazy(() =>
  import("../components/subscription/presentation/NewSubscription")
);
const MySubscriptions = lazy(() =>
  import("../components/subscription/presentation/MySubscriptions")
);
const NewInvestment = lazy(() =>
  import("../components/investment/presentation/NewInvestment")
);
const MyInvestment = lazy(() =>
  import("../components/investment/presentation/MyInvestment")
);
const JoinTeam = lazy(() =>
  import("../components/teams/presentation/JoinTeam")
);
const MyTeam = lazy(() => import("../components/teams/presentation/MyTeam"));
const MyProfits = lazy(() =>
  import("../components/teams/presentation/MyProfits")
);

const Routing = () => {
  const routes = useRoutes([
    {
      path: pathName.ROOT,
      element: <Auth />,
    },
    {
      path: pathName.SIGNUP,
      element: <Auth />,
    },
    {
      path: pathName.HOME,
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to={pathName.DASHBOARD} replace={true} />,
        },
        {
          path: pathName.PROFILE,
          element: <Profile />,
        },
        {
          path: pathName.DASHBOARD,
          element: <Dashboard />,
        },
        {
          path: pathName.NEW_ORDER,
          // element: <NewOrder />,
          element: <DirectOrder />
        },
        {
          path: pathName.MY_ORDER,
          element: <MyOrder />,
        },
        {
          path: pathName.MY_PRODUCTS,
          element: <MyProducts />,
        },
        {
          path: pathName.MY_STORES,
          element: <MyStores />,
        },
        {
          path: pathName.PAYMENT_VGOTOANY,
          element: <VGOToANY />,
        },
        {
          path: pathName.PAYMENT_ANYTOVGO,
          element: <ANYToVGO />,
        },
        {
          path: pathName.MY_TRANSACTIONS,
          element: <MyTransactions />,
        },
        {
          path: pathName.MY_CASHPOINTS,
          element: <CashPoints />,
        },
        {
          path: pathName.ADDNEW_SUBSCRIPTION,
          element: <NewSubscription />,
        },
        {
          path: pathName.MY_SUBSCRIPTION,
          element: <MySubscriptions />,
        },
        {
          path: pathName.ADDNEW_INVESTMENT,
          element: <NewInvestment />,
        },
        {
          path: pathName.MY_INVESTMENTS,
          element: <MyInvestment />,
        },
        {
          path: pathName.JOIN_TEAM,
          element: <JoinTeam />,
        },
        {
          path: pathName.MY_TEAM,
          element: <MyTeam />,
        },
        {
          path: pathName.MY_PROFIT,
          element: <MyProfits />,
        },
        { path: "*", element: <PageNotFound /> },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return routes;
};

export default memo(Routing);
