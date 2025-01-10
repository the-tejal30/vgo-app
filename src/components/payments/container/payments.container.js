import { useState, useEffect } from "react";
import { useFormFn } from "../../../shared/antd/ANTDForm";
import {
  getTransactionModes,
  getBankList,
  sendAnyToVgo,
  sendVgoToAny,
} from "../payments.api";
import { message } from "antd";
import { UseContext } from "../../../context/context";

const PaymentContainer = () => {
  const form = useFormFn();
  const user = UseContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactionModes, setTransactionModes] = useState([]);
  const [bankCurrency, setBankCurrency] = useState([]);
  const [selectedAccountDetails, setSelectedAccountDetails] = useState(null);
  const walletInitialValues = {
    username: user?.username,
    transfer_account_type: "",
    bank_name: "",
    account_number: "",
    transfer_currency: "",
    transfer_amount: "",
    banker_username: user?.username,
  };
  const [vgoToAny, setVgoToAny] = useState(walletInitialValues);
  const [anyToVgo, setAnyToVgo] = useState(walletInitialValues);
  const [isLocked, setIsLocked] = useState(false);
  const [filteredBankCurrency, setFilteredBankCurrency] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState("");

  useEffect(() => {
    fetchTransactionModes();
    fetchBanksAndCurrency();
  }, []);

  useEffect(() => {
    if (isLocked) {
      form.setFieldsValue({
        account_number: vgoToAny?.account_number,
        account_holder_name: vgoToAny?.account_holder_name,
      });
    }
  }, [vgoToAny, isLocked]);
  

  const handleUploadChange = (info) => {
    setUploadedFileName(info.file.name);
    message.success(`${info.file.name} file uploaded successfully`);
  };

  const fetchTransactionModes = async () => {
    try {
      setLoading(true);
      const response = await getTransactionModes({ currency: user?.currency });
      setTransactionModes(response?.data || []);
    } catch (err) {
      setError(err.message || "Something Went Wrong.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBanksAndCurrency = async () => {
    try {
      setLoading(true);
      const username = user?.username;
      const response = await getBankList({ username });
      const uniqueBanks = filterUniqueBanks(response?.data || []);
      setBankCurrency(response?.data || []);
      setFilteredBankCurrency(uniqueBanks);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const filterUniqueBanks = (bankCurrency) => {
    const uniqueBankMap = new Map();
    bankCurrency.forEach((item) => {
      if (!uniqueBankMap.has(item.bank_name)) {
        uniqueBankMap.set(item.bank_name, item);
      }
    });
    return Array.from(uniqueBankMap.values());
  };

  const handleLock = () => {
    const { transfer_account_type, bank_name, currency } = vgoToAny;

    const matchingAccount = filteredBankCurrency.find(
      (account) =>
        account?.account_type === transfer_account_type &&
        account?.bank_name === bank_name &&
        account?.currency === currency
    );

    if (matchingAccount) {
      setVgoToAny((prev) => ({
        ...prev,
        account_number: matchingAccount?.account_number,
        account_holder_name: matchingAccount?.account_holder_name,
      }));
      setIsLocked(true);
    } else {
      message.error("No matching account found.");
    }
  };

  const createAnyToVgoTransaction = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      setLoading(true);
      const response = await sendAnyToVgo(anyToVgo);
      if (response && response.success) {
        message.success(response.message);
        setAnyToVgo(walletInitialValues)
        form.resetFields();
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const createVgoToAnyTransaction = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const randomId = Math.floor(Math.random() * (89 - 82 + 1)) + 82;
      const status = "done";
      const response = await sendVgoToAny({
        id: randomId,
        file: uploadedFileName,
        status: status,
      });

      if (response && response?.success) {
        message.success(response?.message);
        setVgoToAny(walletInitialValues); 
        setUploadedFileName(""); 
        form.resetFields();
        setIsLocked(false)
      } else {
        message.error("Transaction creation failed.");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleAnyToVgoInputChange = (field, value) => {
    setAnyToVgo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVgoToAnyInputChange = (field, value) => {
    setVgoToAny((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (
      field === "bank_name" ||
      field === "currency" ||
      field === "transfer_account_type"
    ) {
      setIsLocked(false);
      setSelectedAccountDetails(null);
    }
  };

  const dropdownItems = transactionModes.map((mode) => ({
    label: mode.account_type,
    key: mode.account_type,
  }));

  const uniqueCurrencies = [
    ...new Set(filteredBankCurrency.map((item) => item.currency)),
  ];
  const uniqueBanks = filteredBankCurrency.map((item) => item.bank_name);

  const bankDropdownItems = uniqueBanks.map((bankName, index) => ({
    label: bankName,
    key: index.toString(),
  }));

  const currencyDropdownItems = uniqueCurrencies.map((currency, index) => ({
    label: currency,
    key: index.toString(),
  }));

  return {
    walletInitialValues,
    form,
    transactionModes,
    loading,
    error,
    bankCurrency,
    dropdownItems,
    bankDropdownItems,
    currencyDropdownItems,
    createAnyToVgoTransaction,
    handleAnyToVgoInputChange,
    anyToVgo,
    vgoToAny,
    handleVgoToAnyInputChange,
    createVgoToAnyTransaction,
    isLocked,
    setIsLocked,
    handleLock,
    selectedAccountDetails,
    handleUploadChange,
  };
};

export default PaymentContainer;
