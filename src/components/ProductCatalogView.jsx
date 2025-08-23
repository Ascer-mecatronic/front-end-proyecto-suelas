
import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductContext';
import { ProductCardView } from './ProductCardView';
import { NavLink } from 'react-router-dom';
import { ProductCatalogForm } from './ProductCatalogForm';
import { DetailsModal } from './DetailsModal';
import { useCartItems } from '../hooks/useCartItems';
import { findItemsCatalogFilter } from '../services/productService';
//PONER AQUI EL SESSION STORAGE DE INICIO
const initialSet = JSON.parse(sessionStorage.getItem('filters')) || {
  talla: "",
  tipo: "",
  tamanio: "",
  color: "",
  rebaja:false,
};
export const ProductCatalogView = ({products}) => {

    const {visibleDetails, errorCatalogMessage } = useContext(ProductContext);

    const { handleAddItemsCart } = useCartItems();

    const [prodsSelected, setProdsSelected] = useState([]);

    const [detailsFind, setDetailsFind] = useState(initialSet);

    useEffect(() => { 
        setProdsSelected(findItemsCatalogFilter(products,detailsFind))
    }, [products,detailsFind]);

   
   const handleCatalogDetails = (details) => {
        sessionStorage.setItem('filters', JSON.stringify(details));
        setDetailsFind(JSON.parse(sessionStorage.getItem('filters')));
        //console.log(searchDetails); 
   }

    const handleAddProduct = (product) => {
        handleAddItemsCart(product);
    }

    return (
        <>
            <div className='container-fluid'>
                <header className="row justify-content-center">
                    <div className="col-12 text-center py-4">
                        <h1>CATÁLOGO</h1>
                    </div>
                    <div className="col-10 text-center mx-2 py-2">Para facilitarte encontrar tu punto de calzado, selecciona el filtro Talla, presiona en la talla que estás buscando
                        y te mostraremos la gran variedad de modelos disponibles que tenemos en tu talla.</div>
                </header>
                <main className='row'>
                    <aside className="col-3 p-4">
                        <ProductCatalogForm handler={ handleCatalogDetails} />
                    </aside>
                    <section className="col-9 p-4">
                        {!errorCatalogMessage ?
                            <div className="row">
                                {prodsSelected.map(prod => (
                                    <div className=" col-4 my-2" key={prod.id}>
                                        <ProductCardView
                                            id={prod.id}
                                            name={prod.name}
                                            precio={prod.precio}
                                            cantidad={prod.cantidad}
                                            images={prod.images}
                                            tallas={prod.tallas}
                                            tipo={prod.tipo}
                                            tamanio={prod.tamanio}
                                            color={prod.color}
                                        />
                                    </div>

                                )
                                )}
                            </div>
                            : <div>
                                 <p className="text-danger">Articulos no encontrados</p>
                            </div>}
                    </section>

                </main>
            </div>

            {!visibleDetails ||
                <DetailsModal handle={handleAddProduct} />

            }



        </>
    )
}
