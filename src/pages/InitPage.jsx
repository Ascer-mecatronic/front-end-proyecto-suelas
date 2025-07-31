import React, { useContext, useEffect, useState } from 'react'
import { MediaContext } from "../context/MediaContext";
import { InitPageContent } from '../components/InitPageContent';

const initContentFiles =
{
    id: 0,
    name: '',
    imageOne: null,
    imageTwo: null,
    imageThree: null,
    textOne: '',
    textTwo: '',
    collectionOne: [
        {
            id: 0,
            uri: '',
        }
    ],
    collectionTwo: [
        {
            id: 0,
            uri: '',
        }
    ]
};


export const InitPage = () => {

    const { pages, getPages } = useContext(MediaContext);

    useEffect(() => {
        getPages();
    }, [])

    return (
        <>
            <div className='row'>
                <div className='col'>
                    {
                        pages.map(page => {
                            if (page.name === 'Pagina Uno') {
                                return (
                                    <div key={page.id}>
                                       
                                        <InitPageContent
                                            id={page.id}
                                            name={page.name}
                                            imageOne={page.imageOne}
                                            imageTwo={page.imageTwo}
                                            imageThree={page.imageThree}
                                            textOne={page.textOne}
                                            textTwo={page.textTwo}
                                            collectionOne={page.collectionOne}
                                            collectionTwo={page.collectionTwo}
                                        />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <div className='row'>
                <div className='col'>

                </div>
            </div>
        </>
    )
}
