import React from 'react';
import ANTDCard from '../../../shared/antd/ANTDCard';
import ANTDButton from '../../../shared/antd/ANTDButton';
import ANTDRow from '../../../shared/antd/ANTDRow';
import ANTDModal from '../../../shared/antd/ANTDModal';
import '../service.scss'
import AddNewProduct from './AddNewProduct';

const StoreProducts = ({ form, addProduct, products, onBack, handleInputChange, handleOpenProductModal, handleCloseProductModal, handleAddProduct, isProductModalVisible, setIsEditMode, isEditMode }) => {

    console.log(products, 'products')
    return (
        <>
            <ANTDCard className="w-75 mt-5">
                <ANTDRow className="d-flex align-center space-between mb-10">
                    <ANTDButton type="primary" onClick={onBack}>
                        &larr;
                    </ANTDButton>
                    <ANTDButton type="primary" onClick={() => {
                        handleOpenProductModal();
                        setIsEditMode(false);
                    }}>
                        Add Products
                    </ANTDButton>
                </ANTDRow>
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product, index) => (
                        <ANTDCard
                            key={index}
                            className="order-suggestions-list d-flex align-center space-between w-100 mt-5"
                        >
                            <div className="flex flex-column">
                                <div className="mb-2">
                                    <strong>Product Name: </strong> {product?.product_name}
                                </div>
                                <div className="mb-2">
                                    <strong>Description: </strong> {product?.product_desc}
                                </div>
                                <div className="mb-2">
                                    <strong>Category: </strong> {product?.category}
                                </div>
                                <div className="mb-2">
                                    <strong>Price: </strong> {product?.price} {product?.currency || 'USD'}
                                </div>
                            </div>
                            <ANTDButton type="primary" onClick={(e) => {
                                e.stopPropagation();
                                // handleEditStore(store?.store_id);
                                setIsEditMode(true);
                                handleOpenProductModal(product?.id);
                            }}>
                                Edit
                            </ANTDButton>
                        </ANTDCard>
                    ))
                ) : (
                    <div className="no-results-found w-100 text-center mt-5">
                        No products found for this store.
                    </div>
                )}
            </ANTDCard>
            <ANTDModal
                visible={isProductModalVisible}
                onCancel={handleCloseProductModal}
                footer={null}
                title="Add New Product"
            >
                <AddNewProduct form={form} addProduct={addProduct} handleAddProduct={handleAddProduct} handleInputChange={handleInputChange} isEditMode={isEditMode} />
            </ANTDModal>
        </>
    );
};

export default StoreProducts;
