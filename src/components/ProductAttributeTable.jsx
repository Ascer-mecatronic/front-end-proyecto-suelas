import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'
import { AttributesFormModal } from './AttributesFormModal';

export const ProductAttributeTable = () => {

    const { getListSelectsForm, formlist } = useContext(ProductContext);

    useEffect(() => {
        getListSelectsForm();
      },[]);

    return (
        <>
        <div className='container-fluid'>

            <div className='row'>
                <div className='col-4'>
                   <AttributesFormModal/>
                </div>
            </div>
        </div>
        </>
    )
}
