import React, { useContext } from 'react'
import { AuthContext } from '../auth/context/AuthContext';
import { UserContext } from '../context/UserContext';
import { NavLink } from 'react-router-dom';

export const UserRow = ({ id, name, lastname, username, admin }) => {

  const { handlerUserSelectedForm, handlerRemoveUser } = useContext(UserContext);

    const { login } = useContext(AuthContext);

    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{name}</td>
            <td>{admin ? 'admin' : 'user'}</td>

            {!login.isAdmin ||
                <>
                    <td>
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => handlerUserSelectedForm({
                                id,
                                name,
                                lastname,
                                username,
                                admin
                            })}
                        >
                            update
                        </button>
                    </td>
                    
                    <td>
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handlerRemoveUser(id)}
                        >
                            remove
                        </button>
                    </td>
                </>
            }
        </tr>
    )
}
