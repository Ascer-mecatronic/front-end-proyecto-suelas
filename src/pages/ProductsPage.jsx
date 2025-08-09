import { useContext, useEffect, useState } from "react"
import { ProductCardView } from "../components/ProductCardView";
import { ProductContext } from "../context/ProductContext";
import { DetailsModal } from "../components/DetailsModal";
import { ProductCatalogForm } from "../components/ProductCatalogForm";
import { useCartItems } from "../hooks/useCartItems";


export const ProductsPage = () => {

    const {
        products,
        getProducts,
        visibleDetails,
        handleCloseForms,
        errorCatalogMessage,
       
    } = useContext(ProductContext);

    useEffect(() => {
        getProducts();
        handleCloseForms();
    }, []
    );

   

    return (
     
            <>
            
            <div className="container-fluid">

                <div className="row justify-content-center">
                    <div className="col-12 text-center py-4">
                        <h1>CATÁLOGO</h1>
                    </div>
                    <div className="col-10 text-center mx-2 py-2">Para facilitarte encontrar tu punto de calzado, selecciona el filtro Talla, presiona en la talla que estás buscando
                        y te mostraremos la gran variedad de modelos disponibles que tenemos en tu talla.</div>
                </div>

                <main className="row">
                    <aside className="col-3 p-4">
                        <ProductCatalogForm />
                    </aside>
                    <section className="col-9 p-4">
                        {!errorCatalogMessage ?
                            <div className="row">
                                {products.map(prod => (
                                    <div className=" col-4 my-4" key={prod.id}>
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
                                            porciento={prod.porciento}
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
                <DetailsModal />
            }
            </>

        
    )
}
