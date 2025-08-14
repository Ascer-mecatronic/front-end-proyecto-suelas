import { useContext, useEffect, useReducer, useState } from "react"
import { cartItemReducer } from "../reducers/cartItemReducer"
import { itemsTotalCalculate } from "../services/carritoService";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";


const initialCartItem = JSON.parse(sessionStorage.getItem('cart')) || [];

export const useCartItems = () => {

    const [items, dispatch] = useReducer(cartItemReducer, JSON.parse(sessionStorage.getItem('cart')) || []);

    const[total, setTotal] = useState(0);

    const {handlerCloseDetails} = useContext(ProductContext);

    const navigate = useNavigate();

    useEffect(()=>{
      
        sessionStorage.setItem('cart', JSON.stringify(items));
        setTotal(itemsTotalCalculate(items));
        
    },[items]);

    const handleAddItemsCart = (item) =>{       
      const hasItem = items.find( (i) => i.item.product.id === item.product.id && i.item.talla === item.talla);
        if(hasItem ){
            console.log('se actualiza');
            dispatch({
                type: 'updateItem',
                payload: item,
            });
        }else{
            console.log('se agrega nuevo item');
            dispatch({
                type: 'addItem',
                payload: item,
            });
        }
        //handlerCloseDetails();
        //navigate('/products/cartPage');
    }

    const deleteItemsCart = (sku) => {
        console.log('sku en el hook' + sku);
        dispatch({
            type: 'deleteItem',
            payload:sku,
        });
       // navigate('products/cartPage');
    }

    return {
        items,
        total,
        handleAddItemsCart,
        deleteItemsCart,
    }

}