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
                handleCloseForms,
                getProducts,
                getProdsByDetails,
                getListSelectsForm,
                clearCatalogDetails,
                //optimizeGarbage,
            }
        }>
            {children}
        </ProductContext.Provider>
    )
}