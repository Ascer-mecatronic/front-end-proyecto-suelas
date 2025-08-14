import axios from "axios";

const BASE_URL = 'http://localhost:8080/product';

const BASE_URL_1 = 'http://localhost:8080/catalog';

const BASE_URL_2 = 'http://localhost:8080/product/picture';

const BASE_URL_3 = 'http://localhost:8080/product/update';

const BASE_URL_4 = 'http://localhost:8080/listado';

const BASE_URL_5 = 'http://localhost:8080/product/optimize';

export const findAll = async () =>{

    try {
        const response = await axios.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const save = async(product) =>{
    try {
        return await axios.post(BASE_URL_2, product, 
            {
                headers: {
                    'Authorization': sessionStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                  }
            }
        );
    } catch (error) {
        throw error;
    }
}

export const update = async(product)=>{
    try {
        return await axios.put(BASE_URL_3, product,
            {
                headers: {
                    'Authorization': sessionStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                  }
            }
        );
    } catch (error) {
       throw error; 
    }
}

export const remove = async (id) => {
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
       // throw error;
    }
}

export const findByDetails = async({talla, tipo, tamanio, color}) =>{
    try {
        return await axios.put(BASE_URL_1,{
            talla,
            tipo,
            tamanio,
            color,
        });
        
    } catch (error) {
        throw error;
    }
}

export const findListsForm = async () =>{

    try {
        const response = await axios.get(BASE_URL_4);
        return response;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const optimizeGarbageFiles = async () =>{
try {
        const response = await axios.get(BASE_URL_5,
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

const firtsSixValues = (elements) => {
    elements.sort(function(a,b){return b - a}); 
    return elements.slice(0,6);
}

export const findMostRecents = (products) =>{
    let findProds = new Array();
    const productsId = products.map( p => p.id);
    firtsSixValues(productsId).forEach(p => {
        const findProd = products.find(prod => prod.id === p);
        if(findProd){
            findProds.push(findProd);
        }
    });
    return findProds;
}