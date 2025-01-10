import React, { useRef } from 'react';
import ANTDCard from '../../../shared/antd/ANTDCard';
import ANTDRow from '../../../shared/antd/ANTDRow';
import { ANTDSearch } from '../../../shared/antd/ANTDInput';
import ANTDButton from '../../../shared/antd/ANTDButton';
import '../service.scss';
import ANTDPopover from '../../../shared/antd/ANTDPopover';
import newOrder from '../container.js/newOrder.container';
import NewOrder from './NewOrder';
import ANTDModal from '../../../shared/antd/ANTDModal';

const RecentOrders = () => {
    const { form, items, formData, handleInputChange, handleSubmit, searchHistory, searchTerm, filteredItems, modalVisible, selectedItem, setSelectedItem, setModalVisible, setSearchTerm, popoverVisible, setPopoverVisible, handleSearchWithPopover } = newOrder();
    const searchInputRef = useRef(null);
    const popoverContent = (
        <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '10px' }}>
            {searchHistory.map((item) => (
                <div
                    key={item.id}
                    onClick={() => {
                        setSearchTerm(item.search_item);
                        setPopoverVisible(false);
                    }}
                    style={{
                        padding: '5px 10px',
                        cursor: 'pointer',
                    }}
                >
                    {item.search_item}
                </div>
            ))}
        </div>
    );

    return (
        <>
            <ANTDCard className='w-75'>
                <ANTDRow className='d-flex align-center justify-center mb-10'>
                    <ANTDPopover
                        content={popoverContent}
                        trigger="click"
                        placement="bottom"
                        getPopupContainer={() => searchInputRef.current}
                        overlayStyle={{
                            width: searchInputRef.current
                                ? `${searchInputRef.current.offsetWidth}px`
                                : '100%',
                        }}
                        visible={popoverVisible}
                        onVisibleChange={(visible) => setPopoverVisible(visible)}
                    >
                        <div style={{ width: '100%' }} ref={searchInputRef}>
                            <ANTDSearch
                                className='w-100'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onSearch={handleSearchWithPopover}
                                onPressEnter={handleSearchWithPopover}
                            />
                        </div>
                    </ANTDPopover>
                </ANTDRow>
                <ANTDRow className='recent-orders-container'>
                    {filteredItems.length === 0 ? (
                        <div className="no-results-found w-100 text-center mt-5">
                            No results found.
                        </div>
                    ) : (
                        filteredItems.map((item, index) => (
                            <ANTDCard className="order-suggestions-list d-flex space-between w-100 mt-5" key={index}>
                                <div className="flex flex-column">
                                    <div className="mb-2">
                                        <strong>Category: {item.category}</strong>
                                    </div>
                                    <div className="mb-2">
                                        <strong>Item: {item.item}</strong>
                                    </div>
                                </div>
                                <ANTDButton type="primary" onClick={() => {
                                    setSelectedItem(item);
                                    setModalVisible(true);
                                }}>
                                    Create Order
                                </ANTDButton>
                            </ANTDCard>
                        ))
                    )}
                </ANTDRow>
            </ANTDCard>
            <ANTDModal
                title="Create New Order"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                className='recent-orders-modal'
            >
                <NewOrder selectedItem={selectedItem} form={form} items={items} formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
            </ANTDModal>
        </>
    );
};

export default RecentOrders;

