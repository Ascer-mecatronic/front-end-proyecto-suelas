import React from 'react'
import { itemAsignId } from '../services/carritoService';

export const cartItemReducer = (state = [], action) => {

    switch(action.type){

        case 'addItem':
            return [
                ...state,
                {
                    item:action.payload,
                    quantity:action.payload.cantidad,
                    sku:itemAsignId(),
                }
            ]

        case 'updateItem':
            return state.map((i)=>{
                if(i.item.id===action.payload.id){
                    return {
                        ...i,
                        quantity: i.quantity + action.payload.cantidad,
                    };
                }
                return i;
            })

        case 'deleteItem':
            return state.filter((i) => i.sku !== action.payload);

        default:
            return state;

    }
  
}
