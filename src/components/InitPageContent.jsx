import React, { useContext, useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext';
import { findMostRecents } from '../services/productService';

const initialSet = {
    talla: "",
    tipo: "",
    tamanio: "",
    color: "",
};

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

export const InitPageContent = ({ id, name, imageOne, imageTwo, imageThree,
    textOne, textTwo, collectionOne, collectionTwo, products, formlist }) => {

    const { getProdsByDetails } = useContext(ProductContext);

    const [recentsProd, setRecentsProd] = useState([]);

    const [detailsFind, setDetailsFind] = useState([]);

    useEffect(() => {
        newProds(products);
    }, [products]
    );

    const newProds = (products) => {
        setRecentsProd(findMostRecents(products));
        const setColl = formlist.tipos.map(t => { return t.name });
        setDetailsFind(setColl);
    }

    const findCollection = (index) => {
        const setFind = formlist.tipos.map(t => { return t.name });
        //console.log(setFind);
        const tipoName = setFind[index];
        initialSet.tipo = tipoName;
        console.log(initialSet);
        getProdsByDetails(initialSet);
        //console.log(detailsFind);
    }

    return (
        <>
            <div className='row content-init-img'>

                <NavLink to={'/products'}>
                    <img className="init-img "
                        src={"../../imgpublicy/" + imageOne}

                    />
                </NavLink>


            </div>

            <div className='row span-new-models'>
                <div className='col span-content-nm'>
                    <h2 className='text-new-models'>Nuevos modelos</h2>
                </div>
            </div>

            <div className='row'>
                <div className='col seccion-one'>
                    <div className='slide-container '>
                        <div className='slide-content'>

                            <Slider {...settings}>

                                {recentsProd.map(prod => (

                                    <div className='card-wrapper ' key={prod.id}>
                                        <div className='card '>
                                            <div className='image-content'>

                                                <div className='card-image'>
                                                    <NavLink to={'/products/mod/' + prod.id}>
                                                        <img src={"../../img/" + prod.images[0].uri} className='card-img' alt=''></img>
                                                    </NavLink>
                                                </div>
                                            </div>
                                            <div className='card-content'>
                                                <h2 className='name'>{prod.name}</h2>
                                                <button className='buttonview' onClick={() => newProds(products)}>View more</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </Slider>


                        </div>

                    </div>
                </div>
            </div>

            <div className='row colecciones-container'>
                <div className='col colecciones-box'>
                    <h2 className='text-colleciones'>Colecciones</h2>
                </div>
            </div>

            <div className='row '>
                <div className='col seccion-two'>
                    {collectionOne.map((coll, index) => (
                        <div className='box-collections' key={coll.id}>
                            <img className="img-collection-one"
                                src={"../../collectionOne/" + coll.uri}
                                onClick={() => findCollection(index)}

                            />
                            <div>
                                <h2 className=''>{detailsFind[index]}</h2>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div className='row rebajas-content'>
                <div className='col rebajas-box'>
                    <NavLink to={'/products'}>
                        <img className="img-rebajas"
                            src={"../../imgpublicy/" + imageTwo}

                        />
                    </NavLink>

                </div>
            </div>

            <div className='content-x'>
                <div className='box-x'>
                    <h3>xffffffffffff</h3>
                </div>
            </div>

        </>
    )
}
