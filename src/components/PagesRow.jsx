import React, { useContext } from 'react'
import { MediaContext } from '../context/MediaContext'
import { AuthContext } from '../auth/context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

export const PagesRow = ({ id, name, imageOne, imageTwo, imageThree,
    textOne, textTwo, collectionOne, collectionTwo }) => {

    const { handleRemovePage } = useContext(MediaContext);

    const { login } = useContext(AuthContext);

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{<img className=" my-2" 
                    src={"../../imgpublicy/" + imageOne} 
                    width='100'
                    height='100'
                    />}</td>


            {!login.isAdmin ||
                <>
                    <td>
                        <NavLink className={"btn btn-secondary btn-sm"} to={'/pages/edit/' + id}>
                            Editar
                        </NavLink>
                    </td>

                    <td>
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemovePage(id)}
                        >
                            remove
                        </button>
                    </td>
                </>
            }
        </tr>
    )
}
