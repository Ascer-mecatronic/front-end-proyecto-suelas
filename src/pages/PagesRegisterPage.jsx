import React, { useContext, useEffect, useState } from 'react'
import { MediaContext } from '../context/MediaContext'
import { useParams } from 'react-router-dom';
import { PageForm } from '../components/PageForm';

export const PagesRegisterPage = () => {

    const { pages, initialPageForm } = useContext(MediaContext);

    const [pageSelect, setPageSelect] = useState(initialPageForm);

    const {id} = useParams();

    useEffect(()=>{
        if (id) {
            console.log(id);
            const page = pages.find(p => p.id == id) || initialPageForm;
            setPageSelect(page);
        }
    },[id])

  return (
    <div className="container-fluid">
        <header className='row justify-content-center'>
            <div className='col-12 text-center py-4'>
                <h4>{pageSelect.id > 0 ? "Editar" : "Registrar"} </h4>
            </div>
        </header>
        <main className='row'>
            <PageForm pageSelected={pageSelect}/>
        </main>
    </div>
  )
}
