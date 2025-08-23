import { useProducts } from "../hooks/useProducts"
import { ProductContext } from "./ProductContext";


export const ProductProvider = ({ children }) => {

    const {
        products,
        visibleDetails,
        productSelected,
        initialProductsForm,
        errors,
        formlist,
        errorCatalogMessage,
        handleAddProduct,
        handleRemoveProduct,
        handlerProductSelected,
        handlerOpenDetails,
        handlerCloseDetails,
        handleCloseForms,
        getProducts,
        getProdsByDetails,
        getFindCatalogItems,
        getProductsRebajas,
        getListSelectsForm,
        clearCatalogDetails,
        //optimizeGarbage,
    } = useProducts();

    return (
        <ProductContext.Provider value={
            {
                products,
                visibleDetails,
                productSelected,
                initialProductsForm,
                errors,
                formlist,
                errorCatalogMessage,
                handleAddProduct,
                handleRemoveProduct,
                handlerProductSelected,
                handlerOpenDetails,
                handlerCloseDetails,
                getFindCatalogItems,
                handleCloseForms,
                getProducts,
                getProdsByDetails,
                getProductsRebajas,
                getListSelectsForm,
                clearCatalogDetails,
                //optimizeGarbage,
            }
        }>
            {children}
        </ProductContext.Provider>
    )
}