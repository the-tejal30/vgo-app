import React from 'react'

import ANTDButton from './antd/ANTDButton'
import ANTDModal from "./antd/ANTDModal";
import { successSvg, warningImage } from "../utils/icons";
import { ternary } from "../utils/javascript";

const PopUpConfirm = ({
  footer = null,
  title,
  description,
  isOpen,
  success,
  onCancelModel,
  onAccept,
  onReject,
}) => {
  return (
    <ANTDModal
      title={false}
      centered
      open={isOpen}
      onCancel={onCancelModel}
      footer={footer}
      className="warning-modal"
    >
      <div>
        {title && <h3>{title}</h3>}
        <div className="popup-content">
          <div className="d-flex align-center">
            <img
              src={ternary(success, successSvg, warningImage)}
              alt="warning"
            />
            <span className="d-inline-block popup-heading">
              {ternary(success, "msg_Success", "msg_Warning")}
            </span>
          </div>
          <ul className="pl-15 ml-15 mt-20">
            <li className="fs-15">{description}</li>
          </ul>
        </div>
        <div className="confirmation-btn">
          {onAccept && (
            <ANTDButton className="bg-danger" onClick={onAccept}>
              Yes
            </ANTDButton>
          )}
          {onReject && (
            <ANTDButton className="bg-view" onClick={onReject}>
              No
            </ANTDButton>
          )}
        </div>
      </div>
    </ANTDModal>
  );
};

export default PopUpConfirm
