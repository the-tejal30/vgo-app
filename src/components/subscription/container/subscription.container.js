import { useState, useEffect, useCallback } from "react";
import { getSubscriptionsApi, createNewSubscriptionApi } from "../subscription.api";
import { message } from "antd";
import { useFormFn } from "../../../shared/antd/ANTDForm";
import { useNavigate } from "react-router-dom";
import pathName from "../../../routing/pathName.constant";
import { UseContext } from "../../../context/context";

const subscription = () => {
    const user = UseContext()
    const navigate = useNavigate()
    const form = useFormFn()
    const [allSubscription, setAllSubscription] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const formInitialValues = {
        username: user?.username,
        subscription_type: "",
        subscription_amount: null
    }
    const [formData, setFormData] = useState(formInitialValues);

    const fetchSubscriptions = async () => {
        try {
            setLoading(true);
            const response = await getSubscriptionsApi({
                username: user?.username
            });
            setAllSubscription(response?.data || []);
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = useCallback(async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        try {
            const response = await createNewSubscriptionApi(formData);
            if (response.success) {
                setFormData(formInitialValues);
                message.success("Subscribed Succefully!");
                form.resetFields()
                setTimeout(() => {
                    navigate(pathName.MY_SUBSCRIPTION);
                }, 1500);
            }
        } catch (error) {
            alert("Error while subscribing!");
        }
    }, [formData]);

    useEffect(() => {
        fetchSubscriptions();
    }, []);


    const items = [
        {
            label: "Stock",
            key: "stock",
        },
        {
            label: "Team",
            key: "team",
        },
    ];

    const subscriptionColumn = () => [
        {
            title: "Subscription ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Subscription Type",
            key: "subscription_type",
            dataIndex: "subscription_type",
        },
        {
            title: "Amount",
            key: "subscription_amount",
            dataIndex: "subscription_amount",
        },
    ];

    return { form, items, loading, error, allSubscription, formData, subscriptionColumn, handleInputChange, handleSubmit };
};

export default subscription;
