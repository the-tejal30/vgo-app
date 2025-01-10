import React from 'react';
import ANTDCard from '../../../shared/antd/ANTDCard';
import ANTDButton from '../../../shared/antd/ANTDButton';
import ANTDRow from '../../../shared/antd/ANTDRow';
import ANTDModal from '../../../shared/antd/ANTDModal';
import AddNewStore from './AddNewStore';
import StoreProducts from './StoreProducts';
import store from '../container.js/store.container';
import '../service.scss';

const MyStores = () => {
  const {
    stores,
    loading,
    error,
    storeDetails,
    isEditMode,
    isModalVisible,
    selectedStoreProducts,
    selectedStoreId,
    productDetails,
    isProductModalVisible,
    setIsEditMode,
    handleEditStore,
    handleCreateStore,
    handleInputChange,
    handleBackToStores,
    handleSelectStore,
    handleOpenModal,
    handleCloseModal,
    handleCloseProductModal,
    handleOpenProductModal,
    handleAddProduct,
    handleProductInputChange,
    form
  } = store();

  const allStores = stores?.data?.flatMap((industry) => industry.stores) || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="d-flex flex-column align-center justify-center w-100">
      <h2 className="mb-10">My Stores</h2>
      {!selectedStoreId ? (
        <>
          <ANTDCard className="w-75">
            <ANTDRow className="d-flex align-center justify-right mb-10">
              <ANTDButton
                type="primary"
                onClick={() => {
                  handleOpenModal();
                  setIsEditMode(false);
                }}
              >
                Add Store
              </ANTDButton>
            </ANTDRow>
            <ANTDRow className="recent-orders-container">
              {allStores.length === 0 ? (
                <div className="no-results-found w-100 text-center mt-5">
                  No results found.
                </div>
              ) : (
                allStores.map((store, index) => (
                  <ANTDCard
                    key={index}
                    className="order-suggestions-list d-flex space-between w-100 mt-5"
                    onClick={() => {
                      handleSelectStore(store?.store_id);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="flex flex-column">
                      <div className="mb-2">
                        <strong>Store ID: </strong> {store?.store_id}
                      </div>
                      <div className="mb-2">
                        <strong>Store Name: </strong> {store?.store_name}
                      </div>
                      <div className="mb-2">
                        <strong>Store Location: </strong> {store?.location}
                      </div>
                      <div className="mb-2">
                        <strong>Supply Items: </strong> {store?.supply_items}
                      </div>
                    </div>
                    <ANTDButton
                      type="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditStore(store?.store_id);
                        setIsEditMode(true);
                        handleOpenModal();
                      }}
                    >
                      Edit
                    </ANTDButton>
                  </ANTDCard>
                ))
              )}
            </ANTDRow>
          </ANTDCard>
        </>
      ) : (
        <StoreProducts
          form={form}
          products={selectedStoreProducts}
          onBack={handleBackToStores}
          handleOpenProductModal={handleOpenProductModal}
          handleCloseProductModal={handleCloseProductModal}
          addProduct={productDetails}
          isProductModalVisible={isProductModalVisible}
          handleInputChange={handleProductInputChange}
          handleAddProduct={(e) => handleAddProduct(e, isEditMode)}
          setIsEditMode={setIsEditMode}
          isEditMode={isEditMode}
        />
      )}

      <ANTDModal visible={isModalVisible} onCancel={handleCloseModal} footer={null}>
        <AddNewStore
          form={form}
          addStore={storeDetails}
          handleCreateStore={(e) => handleCreateStore(e, isEditMode)}
          handleInputChange={handleInputChange}
          isEditMode={isEditMode}
        />
      </ANTDModal>
    </div>
  );
};

export default MyStores;
