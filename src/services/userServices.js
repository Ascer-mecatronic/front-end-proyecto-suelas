import axios from "axios";

const BASE_URL = 'http://localhost:8080/users';

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}

export const findAll = async() => {
    try {
        const response = await axios.get(BASE_URL, config());
        console.log(response.data);
        return response;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const save = async ({ name, lastname, username, password, admin }) => {
    try {
        return await axios.post(BASE_URL, {
            name,
            lastname,
            username,
            password,
            admin,
        }, config());
    } catch (error) {
        throw error;
    }
}

export const register = async ({ name,lastname, username, password}) => {
    try {
        return await axios.post(BASE_URL + '/register', {
            name,
            lastname,
            username,
            password,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const update = async({ id, name, lastname, username, admin }) => {
    try {
        return await axios.put(`${BASE_URL}/${id}`, {
            name,
            lastname,
            username,
            admin,
        }, config());
    } catch (error) {
        throw error;
    }
}

export const remove = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`, config());
    } catch (error) {
        throw error;
    }
}