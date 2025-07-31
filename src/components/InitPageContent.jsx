import React from 'react'
import { NavLink } from 'react-router-dom'

export const InitPageContent = ({ id, name, imageOne, imageTwo, imageThree,
    textOne, textTwo, collectionOne, collectionTwo }) => {
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
        </>
    )
}
