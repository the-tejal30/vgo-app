import React from 'react';
import ANTDCard from '../../../shared/antd/ANTDCard';
import ANTDButton from '../../../shared/antd/ANTDButton';
import ANTDRow from '../../../shared/antd/ANTDRow';
import '../../Services/service.scss';
import cashpoints from '../container/cashpoints.container';
import AddNewCashPoint from './AddNewCashPoint';
import { Modal } from 'antd';

const CashPoints = () => {
    const {
        loading,
        error,
        cashPointsData,
        isEditMode,
        isModalVisible,
        cashPointDetails,
        setIsEditMode,
        setCashPointsDetails,
        handleSelectCashPoint,
        handleInputChange,
        handleCloseModal,
        handleOpenModal,
        addUpdateCashPoints,
        form,
    } = cashpoints();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="d-flex flex-column align-center justify-center w-100">
            <h2 className="mb-10">My CashPoints</h2>
            <ANTDCard className="w-75">
                <ANTDRow className="d-flex align-center justify-right mb-10">
                    <ANTDButton
                        type="primary"
                        onClick={() => {
                            handleOpenModal();
                            setIsEditMode(false);
                            // setCashPointsDetails({
                            //     location_name: '',
                            //     location_address: '',
                            //     country: 'INDIA',
                            //     mobile_number: '',
                            // });
                        }}
                    >
                        Add Cashpoints
                    </ANTDButton>
                </ANTDRow>
                <ANTDRow className="recent-orders-container">
                    {Array.isArray(cashPointsData) &&
                        cashPointsData.map((point, index) => (
                            <ANTDCard
                                key={index}
                                className="order-suggestions-list d-flex space-between w-100 mt-5"
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="flex flex-column">
                                    <div className="mb-2">
                                        <strong>Location: </strong> {point.location_name}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Address: </strong> {point.location_address}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Country: </strong> {point.country}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Mobile Number: </strong> {point.mobile_number}
                                    </div>
                                </div>
                                <ANTDButton
                                    type="primary"
                                    onClick={() => {
                                        handleOpenModal();
                                        setIsEditMode(true);
                                        handleSelectCashPoint(point?.id);
                                    }}
                                >
                                    Edit
                                </ANTDButton>
                            </ANTDCard>
                        ))}
                </ANTDRow>
            </ANTDCard>

            <Modal
                title={isEditMode ? 'Edit Cashpoint' : 'Add Cashpoint'}
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
                className='cashpoint-form'
            >
                <AddNewCashPoint
                    form={form}
                    isEditMode={isEditMode}
                    cashPointDetails={cashPointDetails}
                    handleInputChange={handleInputChange}
                    handleSubmit={(e) => addUpdateCashPoints(e, isEditMode)}
                />
            </Modal>
        </div>
    );
};

export default CashPoints;
