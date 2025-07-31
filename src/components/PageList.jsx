import React, { useContext } from 'react'
import { MediaContext } from '../context/MediaContext';
import { AuthContext } from '../auth/context/AuthContext';
import { PagesRow } from './PagesRow';

export const PageList = () => {

    const { pages } = useContext(MediaContext);

    const { login } = useContext(AuthContext);


    return (
        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Pagina</th>
                    <th>Imagen uno</th>
                    {!login.isAdmin || <>
                        <th>update</th>
                       
                        <th>remove</th>
                    </>}
                    
                </tr>
            </thead>
            <tbody>
                {
                    pages.map(({id, name, imageOne, imageTwo, imageThree, textOne, textTwo, collectionOne, collectionTwo}) => (
                        <PagesRow 
                            key={id}
                            id={id}
                            name={name}
                            imageOne={imageOne}
                            imageTwo={imageTwo}
                            imageThree={imageThree}
                            textOne={textOne}
                            textTwo={textTwo}
                            collectionOne={collectionOne}
                            collectionTwo={collectionTwo}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}
