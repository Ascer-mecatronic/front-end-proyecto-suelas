import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../auth/context/AuthContext';
import { UserRow } from './UserRow';

export const UserList = () => {

  const { users } = useContext(UserContext);
    const { login } = useContext(AuthContext);

    return (
        <table className="table table-hover table-striped">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>username</th>
                    <th>name</th>
                    <th>role</th>
                    {!login.isAdmin || <>
                        <th>update</th>
                       
                        <th>remove</th>
                    </>}
                </tr>
            </thead>
            <tbody>
                {
                    users.map(({ id, name, lastname, username, admin }) => (
                        <UserRow
                            key={id}
                            id={id}
                            name={name}
                            lastname={lastname}
                            username={username}
                            admin={admin}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}
