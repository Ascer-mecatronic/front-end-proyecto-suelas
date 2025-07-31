import React, { useContext, useEffect, useState } from 'react'
import { itemAsignId, itemsTotalCalculate } from '../services/carritoService';
import { useCartItems } from '../hooks/useCartItems';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';


const initialMessage = 'El carrito esta vacio!';

export const CartPage = () => {

  const [item, setItem] = useState([]);

  const {total, deleteItemsCart } = useContext(CartContext);
  
  useEffect(() => {
    setItem(JSON.parse(sessionStorage.getItem('cart')) || []);
   
  }, []);

  const handlerDelete = (sku) => {
    console.log(sku);
    deleteItemsCart(sku);
    setItem(item.filter((i) => i.sku !== sku ));
  }
      

  return (
    <>
      <div className="col table-responsive">
        <h3 className="my-2">Carro de compras</h3>
    {item.length != 0 ?
        <table className="table table-striped table-hover table-bordered text-center">
          <thead>
            <tr className="table-dark">
              <th>Producto</th>
              <th>Talla</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {
            
            item.map(i => (
              <tr key={i.sku}>
                <td>{i.item.product.name}</td>
                <td>{i.item.talla}</td>
                <td>{i.item.product.precio}</td>
                <td>{i.quantity}</td>
                <td>{i.quantity * i.item.product.precio}</td>
                <td><button
                  className="btn btn-danger"
                  onClick={()=>handlerDelete(i.sku)}
                >Eliminar</button></td> 
              </tr>
            )) 
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-end fw-bold">Total:</td>
              <td colSpan="2" className="text-start fw-bold">$ {total}</td>
            </tr>
          </tfoot>
        </table>
        : <h3>{initialMessage}</h3>
        }
        <button
          className="btn btn-info"
          
        ><Link className="text-white" to={'/products'}> Seguir comprando!</Link></button>
      </div> 

    </>
  )
}
