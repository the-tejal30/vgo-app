import React, { useState } from 'react';
import { Select, Button } from 'antd';
import ANTDRow from '../../../shared/antd/ANTDRow';
import ANTDColumn from '../../../shared/antd/ANTDColumn';
import CommonForm from '../../common/component/Form';
import ANTDModal from '../../../shared/antd/ANTDModal';
import ANTDInput from './../../../shared/antd/ANTDInput';
import ListDisplay from './ListDisplay';

const { Option } = Select;

const Candidates = ({
    form,
    candidatesFormVal,
    isModalVisible,
    dropdownValue,
    handleDropdownChange,
    handleButtonClick,
    handleCandidatesFormInputChange,
    closeModal,
    loading,
    error,
    columns,
    data,
    handleUpdateCandidatetoHRRef,
    handleCandidates,
    HRRefFormValues,
    handleUpdateHRReftoOpr,
    handleHRRef,
    handleHRRefFormInputChange,
    setSelectedCandidateId
}) => {

    const hrmColumn = () => [
        {
            title: 'Operation Team ID',
            key: 'operations_team_id',
            dataIndex: 'operations_team_id',
            render: () => (
                <ANTDInput
                    value={candidatesFormVal?.operationTeamId}
                    onChange={(e) => handleCandidatesFormInputChange('operations_team_id', e.target.value)}
                />
            ),
        },
        {
            title: 'Team ID',
            key: 'team_id',
            dataIndex: 'team_id',
            render: () => (
                <ANTDInput
                    value={candidatesFormVal?.teamId}
                    onChange={(e) => handleCandidatesFormInputChange('team_id', e.target.value)}
                />
            ),
        },
        {
            title: 'Designation',
            key: 'desig',
            dataIndex: 'desig',
            render: () => (
                <ANTDInput
                    value={candidatesFormVal?.desig}
                    onChange={(e) => handleCandidatesFormInputChange('desig', e.target.value)}
                />
            ),
        },
        {
            title: 'Department',
            key: 'dept',
            dataIndex: 'dept',
            render: () => (
                <ANTDInput
                    value={candidatesFormVal?.dept}
                    onChange={(e) => handleCandidatesFormInputChange('dept', e.target.value)}
                />
            ),
        },
    ];

    const hrRefColumn = () => [
        {
            title: 'Operation Team ID',
            key: 'operations_team_id',
            dataIndex: 'operations_team_id',
            render: () => (
                <ANTDInput
                    value={HRRefFormValues?.operationTeamId}
                    onChange={(e) => handleHRRefFormInputChange('operations_team_id', e.target.value)}
                />
            ),
        },
        {
            title: 'Team ID',
            key: 'team_id',
            dataIndex: 'team_id',
            render: () => (
                <ANTDInput
                    value={HRRefFormValues?.teamId}
                    onChange={(e) => handleHRRefFormInputChange('team_id', e.target.value)}
                />
            ),
        },
        {
            title: 'Entrepreneur Team ID',
            key: 'entrep_team_id',
            dataIndex: 'entrep_team_id',
            render: () => (
                <ANTDInput
                    value={HRRefFormValues?.teamId}
                    onChange={(e) => handleHRRefFormInputChange('entrep_team_id', e.target.value)}
                />
            ),
        },
        {
            title: 'Company Code',
            key: 'company_code',
            dataIndex: 'company_code',
            render: () => (
                <ANTDInput
                    value={HRRefFormValues?.teamId}
                    onChange={(e) => handleHRRefFormInputChange('company_code', e.target.value)}
                />
            ),
        },
        {
            title: 'Designation',
            key: 'desig',
            dataIndex: 'desig',
            render: () => (
                <ANTDInput
                    value={HRRefFormValues?.desig}
                    onChange={(e) => handleHRRefFormInputChange('desig', e.target.value)}
                />
            ),
        },
        {
            title: 'Department',
            key: 'dept',
            dataIndex: 'dept',
            render: () => (
                <ANTDInput
                    value={HRRefFormValues?.dept}
                    onChange={(e) => handleHRRefFormInputChange('dept', e.target.value)}
                />
            ),
        },
    ];


    return (
        <ANTDRow className="candidates-col w-100 flex flex-col">
            <ANTDColumn className="d-flex w-100 justify-right mb-10">
                <Select
                    defaultValue="New"
                    value={dropdownValue}
                    onChange={handleDropdownChange}
                    style={{ width: 200 }}
                >
                    <Option value="New">New</Option>
                    <Option value="Team">Team</Option>
                </Select>
            </ANTDColumn>

            <ANTDColumn className="w-100">
                <ListDisplay
                    loading={loading}
                    error={error}
                    columns={columns}
                    data={data}
                    dropdownValue={dropdownValue}
                    handleButtonClick={handleButtonClick}
                    handleCandidates={dropdownValue === 'New' ? handleCandidates : handleHRRef}
                    setSelectedCandidateId={setSelectedCandidateId}
                />
            </ANTDColumn>
            <ANTDModal
                title="Form Details"
                visible={isModalVisible}
                onCancel={closeModal}
                footer={null}
            >
                {dropdownValue === 'New' ? (
                    <CommonForm
                        form={form}
                        column={hrmColumn}
                        buttonTxt="Submit"
                        handleSubmit={handleUpdateCandidatetoHRRef}
                        formData={candidatesFormVal}
                        closeModal={closeModal}
                    />
                ) : (
                    <CommonForm
                        form={form}
                        column={hrRefColumn}
                        buttonTxt="Submit"
                        handleSubmit={handleUpdateHRReftoOpr}
                        formData={HRRefFormValues}
                        closeModal={closeModal}
                    />
                )}
            </ANTDModal>
        </ANTDRow>
    );
};

export default Candidates;
