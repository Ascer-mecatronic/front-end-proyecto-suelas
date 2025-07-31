import axios from "axios";

const BASE_URL = 'http://localhost:8080/pages';

export const findAllPages = async () => {
    try {
        const response = await axios.get(BASE_URL,);
        return response;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const savePage = async (page) => {
    try {
        return await axios.post(BASE_URL + '/files', page,
            {
                headers: {
                    'Authorization': sessionStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            })
    } catch (error) {
        throw error;
    }
}

export const updatePage = async (page) => {
    try {
        return await axios.put(BASE_URL + '/update', page,
            {
                headers: {
                    'Authorization': sessionStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    } catch (error) {
        throw error;
    }
}

export const removePage = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`,
             {
                headers: {
                    'Authorization': sessionStorage.getItem('token'),
                }
            }
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const garbageCollectionOne = async () =>{
try {
        const response = await axios.get(BASE_URL + '/garbageOne',
             {
                headers: {
                    'Authorization': sessionStorage.getItem('token'),
                }
            }
        );
        return response;
    } catch (error) {
       throw error;
    }
    return null;
}

export const garbageCollectionTwo = async () =>{
try {
        const response = await axios.get(BASE_URL + '/garbageTwo',
             {
                headers: {
                    'Authorization': sessionStorage.getItem('token'),
                }
            }
        );
        return response;
    } catch (error) {
       throw error;
    }
    return null;
}