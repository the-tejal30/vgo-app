import { useState, useEffect, useCallback } from "react";
import { getTeamsApi, getProftisApi, joinTeamApi, updateCandidateToHRRef, updateHRRefToOpr } from "../teams.api";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import pathName from "../../../routing/pathName.constant";
import { useFormFn } from "../../../shared/antd/ANTDForm";
import { UseContext } from "../../../context/context";

const Team = () => {
    // Form handling
    const form = useFormFn();
    const navigate = useNavigate();
    const user = UseContext();
    const gapId = user?.gap_id
    // State Variables
    const [dropdownValue, setDropdownValue] = useState('New');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [profits, setProfits] = useState([]);
    const [teams, setTeams] = useState({ candidates: [], hrref: [] });
    const [filteredData, setFilteredData] = useState([]);
    const [filteredHRRefData, setFilteredHRRefData] = useState([]);
    const [myTeamTabItems, setMyTeamTabItems] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState('');
    const [formData, setFormData] = useState({ gap_id: gapId, hrm_team_id: "", location: "" });
    const [candidatesFormVal, setCandidatesFormVal] = useState({ operations_team_id: '', team_id: '', desig: '', dept: '' });
    const [HRRefFormValues, setHRRefFormValues] = useState({ operations_team_id: '', team_id: '', desig: '', dept: '', entrep_team_id: '', company_code: '' })
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);

    // Effect to fetch teams and profits data
    useEffect(() => {
        fetchProfits();
        fetchTeams();
    }, []);

    // Effect to filter candidates based on dropdown selection
    useEffect(() => {
        if (dropdownValue === 'New') {
            setFilteredData(teams?.candidates.filter(item => item.status === 'New'));
        } else if (dropdownValue === 'Team') {
            setFilteredData(teams?.candidates.filter(item => item.status === 'Team'));
        }
    }, [dropdownValue, teams?.candidates]);

    // Effect to filter HRRef data based on dropdown selection
    useEffect(() => {
        if (dropdownValue === 'New') {
            setFilteredHRRefData(teams?.hrref.filter(item => item.status === 'New'));
        } else if (dropdownValue === 'Active') {
            setFilteredHRRefData(teams?.hrref.filter(item => item.status === 'Active'));
        }
    }, [dropdownValue, teams?.hrref]);

    // Fetch Teams API
    const fetchTeams = async () => {
        try {
            setLoading(true);
            const team_id = "VGOIND002";
            const response = await getTeamsApi({ team_id });
            const teamsData = response?.data.reduce((acc, team) => {
                const key = team.name.toLowerCase().split(' ').join('_');
                acc[key] = team.list;
                return acc;
            }, {});
            setTeams(teamsData);

            const tabItems = response?.data.map((team) => ({
                label: team.name,
                key: team.name.toLowerCase().split(' ').join('_'),
            }));
            setMyTeamTabItems(tabItems);
            setActiveTabKey(tabItems[0]?.key || "candidates");
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch Profits API
    const fetchProfits = async () => {
        try {
            setLoading(true);
            const team_id = "VGOIND001";
            const response = await getProftisApi({ team_id });
            setProfits(response?.data || []);
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    // Event Handlers
    const handleDropdownChange = (value) => {
        setDropdownValue(value);
    };

    const handleButtonClick = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const onTabChange = (key) => {
        setActiveTabKey(key);
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCandidatesFormInputChange = (field, value) => {
        setCandidatesFormVal((prev) => ({ ...prev, [field]: value }));
    };

    const handleHRRefFormInputChange = (field, value) => {
        setHRRefFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleUpdateCandidatetoHRRef = useCallback(async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        try {
            const response = await updateCandidateToHRRef(selectedCandidateId, candidatesFormVal);
            if (response.success) {
                setCandidatesFormVal({ operations_team_id: '', team_id: '', desig: '', dept: '' });
                message.success("Candidates Successfully updated to Team!");
                setIsModalVisible(false);
                form.resetFields();
            }
        } catch (error) {
            alert("Error in Updating Student to Team!");
        }
    }, [candidatesFormVal]);

    const handleCandidates = (candidatesID) => {
        const candidateToUpdate = teams?.candidates.find(candidate => candidate?.id === candidatesID);
        if (candidateToUpdate) {
            setCandidatesFormVal({
                operations_team_id: candidateToUpdate?.operations_team_id,
                team_id: candidateToUpdate?.team_id,
                desig: candidateToUpdate?.desig,
                dept: candidateToUpdate?.dept,
            });
        }
    };

    const handleHRRef = (HRRefId) => {
        const HRRefToUpdate = teams?.hrref.find(hrref => hrref?.id === HRRefId);
        if (HRRefToUpdate) {
            setHRRefFormValues({
                operations_team_id: HRRefToUpdate?.operations_team_id,
                team_id: HRRefToUpdate?.team_id,
                desig: HRRefToUpdate?.desig,
                dept: HRRefToUpdate?.dept,
                entrep_team_id: HRRefToUpdate?.entrep_team_id,
                company_code: HRRefToUpdate?.company_code,
            });
        }
    };

    const handleUpdateHRReftoOpr = useCallback(async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        try {
            const response = await updateHRRefToOpr(selectedCandidateId, HRRefFormValues);
            if (response.success) {
                setHRRefFormValues({ operations_team_id: '', team_id: '', desig: '', dept: '', entrep_team_id: '', company_code: '' });
                message.success("Candidate Successfully updated to HRRef!");
                setIsModalVisible(false);
                form.resetFields();
            }
        } catch (error) {
            alert("Error in Updating Candidate to HRRef!");
        }
    }, [HRRefFormValues])

    const handleSubmit = useCallback(async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        try {
            const response = await joinTeamApi(formData);
            if (response.success) {
                setFormData({ gap_id: gapId, hrm_team_id: "", location: "" });
                message.success("Added in Team Successfully!");
                form.resetFields();
                setTimeout(() => {
                    navigate(pathName.MY_TEAM);
                }, 1500);
            } else {
                message.error(response?.message);
                setFormData({ gap_id: gapId, hrm_team_id: "", location: "" });
                form.resetFields();
            }
            closeModal();
        } catch (error) {
            alert(error?.message);
        }
    }, [formData]);

    // Column Configurations
    const profitsColumn = () => [
        {
            title: "Team ID",
            key: "team_id",
            dataIndex: "team_id",
        },
        {
            title: "Team Profits",
            key: "team_share",
            dataIndex: "team_share",
        },
        {
            title: "Child Team",
            key: "collab_team_share",
            dataIndex: "collab_team_share",
        },
    ];

    const columnsConfig = [
        {
            title: "HRM Team ID",
            key: "hrm_team_id",
            dataIndex: "hrm_team_id",
        },
        {
            title: "Gap ID",
            key: "gap_id",
            dataIndex: "gap_id",
        },
        {
            title: "Location",
            key: "location",
            dataIndex: "location",
        },
    ];

    return {
        gapId,
        form,
        myTeamTabItems,
        filteredData,
        dropdownValue,
        candidatesFormVal,
        isModalVisible,
        activeTabKey,
        profits,
        loading,
        error,
        teams,
        onTabChange,
        profitsColumn,
        columnsConfig,
        formData,
        HRRefFormValues,
        filteredHRRefData,
        handleUpdateHRReftoOpr,
        handleHRRef,
        handleHRRefFormInputChange,
        handleInputChange,
        handleSubmit,
        handleDropdownChange,
        handleButtonClick,
        closeModal,
        handleUpdateCandidatetoHRRef,
        handleCandidatesFormInputChange,
        handleCandidates,
        setSelectedCandidateId
    };
};

export default Team;
