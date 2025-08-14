import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductContext';
import { useParams } from 'react-router-dom';
import { ViewModel } from '../components/ViewModel';


export const ProductViewModel = () => {

    const { products, getProducts, initialProductsForm } = useContext(ProductContext);

    const [ productSelected, setProductSelected] = useState(initialProductsForm);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const product = products.find(p => p.id === parseInt(id)) || initialProductsForm;
            setProductSelected(product);
        }
        getProducts();
    }, []);

    return (
        <div className='container-fluid'>

            <main className='row'>

                {productSelected.id !== 0 ?  

                <ViewModel productSelected = {productSelected}/>

                : 
                 <h2>Articulo no encontrado</h2>
            }

            </main>

        </div>
    )
}
