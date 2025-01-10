import { useState, useEffect, useCallback } from "react";
import { createCashPointsAPI, getCashPointsAPI, updateCashPointsAPI } from "../payments.api";
import { message } from "antd";
import { useFormFn } from "../../../shared/antd/ANTDForm";

const cashpoints = () => {
    const form = useFormFn()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cashPointsData, setCashPointsData] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [cashPointDetails, setCashPointsDetails] = useState({
        username: "18435f35b62b30ef6fe7a55e81052358",
        location_name: "",
        location_address: "",
        country: "INDIA",
        lat_location: "23.8887778",
        lng_location: "-12.876578",
        mobile_number: ""
    })
    const [cashPointID, setCashPointID] = useState(null)

    const handleInputChange = (field, value) => {
        setCashPointsDetails((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSelectCashPoint = (id) => {
        setCashPointID(id);
        setCashPointsDetails((prev) => ({
            ...prev,
            id: id,
        }));
        fetchStoreCashpoints();
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setIsEditMode(false);
    };
    useEffect(() => {
        fetchStoreCashpoints();
    }, []);

    const fetchStoreCashpoints = async () => {
        try {
            setLoading(true);
            const response = await getCashPointsAPI({ country: "INDIA" });
            setCashPointsData(response?.data);
        } catch (err) {
            setError(err.message || "Failed to fetch cashpoints.");
        } finally {
            setLoading(false);
        }
    };

    const addUpdateCashPoints = useCallback(async (e, isUpdate = false) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        try {
            let response;
            if (isUpdate) {
                response = await updateCashPointsAPI(cashPointDetails?.id, cashPointDetails);
            } else {
                response = await createCashPointsAPI(cashPointDetails);
            }

            if (response && response.success) {
                setCashPointsDetails(cashPointDetails);
                fetchStoreCashpoints();
                message.success(response.message);
                setIsModalVisible(false)
                form.resetFields()
            } else {
                throw new Error(response?.message || "API Error: No success response");
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }, [cashPointDetails]);

    return { form, loading, error, cashPointsData, isEditMode, isModalVisible, cashPointDetails, setIsEditMode, handleInputChange, handleCloseModal, handleOpenModal, addUpdateCashPoints, handleSelectCashPoint }

}

export default cashpoints