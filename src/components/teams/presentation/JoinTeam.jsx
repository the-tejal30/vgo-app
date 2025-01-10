import React, { useEffect } from "react";
import ANTDInput from "../../../shared/antd/ANTDInput";
import CommonForm from "../../common/component/Form";
import "../../Services/service.scss";
import Team from "../container/teams.container";

function JoinTeam() {
  const { gapId, form, formData, handleInputChange, handleSubmit } = Team();

  useEffect(() => {
    if (gapId) {
      handleInputChange("gap_id", gapId); 
    }
  }, [gapId]);

  const hrmColumn = () => [
    {
      title: "HRM ID",
      key: "hrm_team_id",
      dataIndex: "hrm_team_id",
      render: () => (
        <ANTDInput
          value={formData.hrm_team_id}
          onChange={(e) => handleInputChange("hrm_team_id", e.target.value)}
        />
      ),
    },
    // {
    //   title: "Gap ID",
    //   key: "gap_id",
    //   dataIndex: "gap_id",
    //   render: () => (
    //     <ANTDInput
    //       value={formData?.gap_id}
    //       onChange={(e) => handleInputChange("gap_id", e.target.value)}
    //     />
    //   ),
    // },
    {
      title: "Location",
      key: "location",
      dataIndex: "location",
      render: () => (
        <ANTDInput
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      ),
    },
  ];

  return (
    <CommonForm
      form={form}
      column={hrmColumn}
      title="Join Team"
      buttonTxt="Join"
      formData={formData}
      handleSubmit={handleSubmit}
    />
  );
}

export default JoinTeam;
