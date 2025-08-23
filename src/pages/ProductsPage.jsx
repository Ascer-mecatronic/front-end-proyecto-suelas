import { useContext, useEffect } from "react"
import { ProductContext } from "../context/ProductContext";
import { ProductCatalogView } from "../components/ProductCatalogView";

export const ProductsPage = () => {

    const { products, getProducts } = useContext(ProductContext);

    useEffect(() => {
        getProducts();
    }, []
    );

    return ( 
            <>
            <ProductCatalogView products={products}/>
            </>
    )
}
