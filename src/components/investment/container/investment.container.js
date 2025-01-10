import { useState, useEffect, useCallback } from "react";
import { getInvestmentApi, createNewInvestmentApi } from "../investment.api";
import { useFormFn } from "../../../shared/antd/ANTDForm";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import pathName from '../../../routing/pathName.constant'
import { UseContext } from "../../../context/context";

const investmentContainer = () => {
    const user = UseContext()
    const navigate = useNavigate()
    const form = useFormFn()
    const [investment, setInvestment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const formInitialValues = {
        username: user?.username,
        investment_type: "",
        company_code: 10000,
        team_id: "VGOIND001",
        dept: "HRM",
        investment_amount: null,
        stock_units: 10000
    }
    const [formData, setFormData] = useState(formInitialValues);

    const fetchInvestMents = async () => {
        try {
            setLoading(true);
            const response = await getInvestmentApi({
                username: user?.username
            });
            setInvestment(response?.data || []);
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestMents();
    }, []);

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
            const response = await createNewInvestmentApi(formData);
            if (response.success) {
                setFormData(formInitialValues);
                message.success("Invested Successfully!")
                form.resetFields()
                setTimeout(() => {
                    navigate(pathName.MY_INVESTMENTS);
                }, 1500);
            }
        } catch (error) {
            alert("Error while investing!");
        }
    }, [formData]);

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

    const investmentColumn = () => [
        {
            title: "Investment ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Investment Type",
            key: "investment_type",
            dataIndex: "investment_type",
        },
        {
            title: "Amount",
            key: "investment_amount",
            dataIndex: "investment_amount",
        },
    ];


    return { form, items, investment, loading, error, formData, handleInputChange, handleSubmit, investmentColumn };
};

export default investmentContainer;
