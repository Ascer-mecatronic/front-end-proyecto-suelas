import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext';
import { ProductCatalogView } from './ProductCatalogView';

export const CatalogView = () => {

     const { products, getProducts } = useContext(ProductContext);

     useEffect(() => { 
             getProducts();  
         }, []);

  return (
    <>
    <ProductCatalogView products={products}/>
    </>
  )
}
