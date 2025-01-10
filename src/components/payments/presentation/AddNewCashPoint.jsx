import React from 'react';
import ANTDInput from '../../../shared/antd/ANTDInput';
import CommonForm from '../../common/component/Form';

const AddNewCashPoint = ({ form, isEditMode, cashPointDetails, handleInputChange, handleSubmit }) => {
    const fields = () => [
        {
            title: 'Location',
            key: 'location_name',
            dataIndex: 'location_name',
            render: () => (
                <ANTDInput
                    value={cashPointDetails.location_name}
                    onChange={(e) => handleInputChange('location_name', e.target.value)}
                />
            ),
        },
        {
            title: 'Address',
            key: 'location_address',
            dataIndex: 'location_address',
            render: () => (
                <ANTDInput
                    value={cashPointDetails.location_address}
                    onChange={(e) => handleInputChange('location_address', e.target.value)}
                />
            ),
        },
        {
            title: 'Country',
            key: 'country',
            dataIndex: 'country',
            render: () => (
                <ANTDInput
                    value={cashPointDetails.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                />
            ),
        },
        {
            title: 'Mobile Number',
            key: 'mobile_number',
            dataIndex: 'mobile_number',
            render: () => (
                <ANTDInput
                    value={cashPointDetails.mobile_number}
                    onChange={(e) => handleInputChange('mobile_number', e.target.value)}
                />
            ),
        },
    ];

    return (
        <CommonForm
            form={form}
            formData={cashPointDetails}
            column={fields}
            title={isEditMode ? 'Update CashPoint' : 'Create Cashpoint'}
            buttonTxt={isEditMode ? 'Update Cashpoint' : 'Create Cashpoint'}
            handleSubmit={handleSubmit}
        />
    );
};

export default AddNewCashPoint;
