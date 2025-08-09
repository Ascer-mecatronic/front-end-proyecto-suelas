import React, { useContext, useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext';
import { findMostRecents } from '../services/productService';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

export const InitPageContent = ({ id, name, imageOne, imageTwo, imageThree,
    textOne, textTwo, collectionOne, collectionTwo, products }) => {

    const [recentsProd, setRecentsProd] = useState([]);

    useEffect(() => {
            newProds(products);
        }, [products]
);

    const newProds = (products) =>{
        setRecentsProd(findMostRecents(products));
    }

    return (
        <>
            <div className='row'>
                <div className='col'>
                    <NavLink to={'/products'}>
                        <img className="card-img-top my-2"
                            src={"../../imgpublicy/" + imageOne}
                            width='150'
                            height='400'
                        />
                    </NavLink>

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
                                            <img src={"../../img/" + prod.images[0].uri} className='card-img' alt=''></img>
                                        </div>
                                    </div>
                                    <div className='card-content'>
                                        <h2 className='name'>{prod.name}</h2>
                                        <button className='buttonview' onClick={()=>newProds(products)}>View more</button>
                                    </div>
                                </div>
                            </div>
                                ))}

                            </Slider>
                               

                        </div>
        
                    </div>
                </div>
            </div>
        </>
    )
}
