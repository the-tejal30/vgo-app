// MyTeam.jsx
import React from "react";
import ANTDCard from "../../../shared/antd/ANTDCard";
import Team from "../container/teams.container";
import ListDisplay from "./ListDisplay";
import Candidates from "./Candidates";
import '../teams.style.scss';
import HRRef from "./HRRef";

const MyTeam = () => {
  const {
    form,
    myTeamTabItems,
    activeTabKey,
    teams,
    loading,
    error,
    candidatesFormVal,
    isModalVisible,
    dropdownValue,
    filteredData,
    handleSubmit,
    handleDropdownChange,
    handleButtonClick,
    onTabChange,
    columnsConfig,
    closeModal,
    handleUpdateCandidatetoHRRef,
    handleCandidatesFormInputChange,
    handleCandidates,
    HRRefFormValues, 
    filteredHRRefData, 
    handleUpdateHRReftoOpr, 
    setSelectedCandidateId,
    handleHRRef, 
    handleHRRefFormInputChange
  } = Team();

  const contentList = {
    candidates: (
      <Candidates
        form={form}
        candidatesFormVal={candidatesFormVal}
        isModalVisible={isModalVisible}
        dropdownValue={dropdownValue}
        handleSubmit={handleSubmit}
        handleDropdownChange={handleDropdownChange}
        handleButtonClick={handleButtonClick}
        closeModal={closeModal}
        loading={loading}
        error={error}
        columns={columnsConfig}
        data={filteredData}
        handleUpdateCandidatetoHRRef={handleUpdateCandidatetoHRRef}
        handleCandidatesFormInputChange={handleCandidatesFormInputChange}
        handleCandidates={handleCandidates}
        HRRefFormValues={HRRefFormValues}
        handleUpdateHRReftoOpr={handleUpdateHRReftoOpr}
        handleHRRef={handleHRRef}
        handleHRRefFormInputChange={handleHRRefFormInputChange}
        setSelectedCandidateId={setSelectedCandidateId}
      />
    ),
    childs: (
      <ListDisplay
        loading={loading}
        error={error}
        columns={columnsConfig}
        data={teams?.childs}
      />
    ),
    hrref: (
      <ListDisplay
        loading={loading}
        error={error}
        columns={columnsConfig}
        data={teams?.hrref} 
      />
      // <HRRef
      //   form={form}
      //   loading={loading}
      //   error={error}
      //   columns={columnsConfig}
      //   data={filteredHRRefData}
      //   HRRefFormValues={HRRefFormValues}
      //   isModalVisible={isModalVisible}
      //   dropdownValue={dropdownValue}
      //   handleSubmit={handleSubmit}
      //   handleDropdownChange={handleDropdownChange}
      //   handleButtonClick={handleButtonClick}
      //   closeModal={closeModal}
      //   handleHRRefFormInputChange={handleHRRefFormInputChange}
      //   handleUpdateHRReftoOpr={handleUpdateHRReftoOpr}
      //   handleHRRef={handleHRRef}
      // />
    ),
    my_startups: (
      <ListDisplay
        loading={loading}
        error={error}
        columns={columnsConfig}
        data={teams?.my_startups}
      />
    ),
  };

  return (
    <ANTDCard
      style={{
        width: "75%",
      }}
      title="My Team"
      tabList={myTeamTabItems}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
    >
      {contentList[activeTabKey]}
    </ANTDCard>
  );
};

export default MyTeam;
