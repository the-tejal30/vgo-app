
import { useState } from "react";
import { message } from "antd";

const Dropdown = ({ items, handleInputChange, dropDownLabel }) => {
    const [selectedAction, setSelectedAction] = useState("Select Action");

    const handleMenuClick = (e) => {
        const selectedLabel = items.find((item) => item.key === e.key)?.label;
        if (selectedLabel) {
            setSelectedAction(selectedLabel);
            message.success(`Selected: ${selectedLabel}`);
        }
        handleInputChange(`${dropDownLabel}`, selectedLabel); 
    };

    const menuProps = {
        items: items.length === 0 ? [{ label: "No options found" }] : items,
        onClick: handleMenuClick,
    };

    return { selectedAction, menuProps }

}

export default Dropdown