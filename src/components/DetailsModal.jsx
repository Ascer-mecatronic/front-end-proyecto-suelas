import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { itemAsignId } from "../services/carritoService";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const initialItemState = 
    { id:0,
     product:{},
     talla:'',
     cantidad:1,
    };

 const initialCantidad = {
    id:0,
    name:'',
    total:0,
 }

 

export const DetailsModal = () => {

    const {
        handlerCloseDetails,
        productSelected,
    } = useContext(ProductContext);

    const { handleAddItemsCart } = useContext(CartContext);

    const { id, name, precio, images, tallas, tipo, tamanio, color, cantidad } = productSelected;

    const [checkState, setCheckState] = useState('');
    const [cantState, setCantState] = useState(initialCantidad);
    const [itemState, setItemState] = useState(initialItemState);

    const navigate = useNavigate();

    useEffect(() => { 
        setItemState({
            ...itemState,
            id:id,
            product:productSelected,
        })
      }, [])

    const onCheckTallasChange = ({target},index) => {
        
        setCheckState(tallas[index]);
        setItemState({
            ...itemState,
            [target.name]:tallas[index].name,

        })
        if(cantidad){
            const cant = cantidad.find(c => c.name === tallas[index].name);
            setCantState(cant);
        }else{
            setCantState(initialCantidad);
        }
        
    }

    const onInputChange = ({target})=>{
        const num = parseInt(target.value);
        setItemState({
            ...itemState,
            [target.name]:num,
        })
    }

    const onSubmit = (event) => {    
        event.preventDefault();
        console.log(itemState);
        handleAddItemsCart(itemState);
        //handlerCloseDetails();
        //navigate('/products/cartPage');
    }

    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal " style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog modal-resize modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Modelo: {id}
                            </h5>
                            <button
                                className="btn-close"
                                onClick={handlerCloseDetails}
                                data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <img className="my-2"
                                    src={"../../img/" + images[0].uri}
                                    width='400'
                                    height='400'
                                />
                            </div>

                            <div>
                                <ul>

                                    <li><h3>Modelo: {id}</h3></li>
                                    <li>$ {precio}</li>


                                    <li>Tipo: {tipo.name}</li>
                                    <li>Tamaño: {tamanio.name}</li>
                                    <li>Color: {color.name}</li>
                                </ul>
                            </div>
                            <div>
                                <form onSubmit={(event) => onSubmit(event)}>
                                    <h3>Talla: {checkState.name }</h3>
                                    <h3>Disponibles: {cantState ? cantState.total : ''}</h3>
                                    <div className="radio-tile-group">
                                        {tallas.map(({ id, name },index) => {
                                            return (
                                                <div className="input-container" key={id}>
                                                    <input
                                                        id={name}
                                                        value={name}
                                                        type="radio"
                                                        name="talla"
                                                        onChange={(event) => {
                                                            
                                                            onCheckTallasChange(event, index)}}
                                                    />
                                                    <div className="radio-tile">
                                                        <label htmlFor={name}>{name}</label>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <input 
                                        type="number" 
                                        name="cantidad" 
                                        value={itemState.cantidad}
                                        onChange={(event) => {
                                            console.log(event.target.name)
                                            onInputChange(event)}}
                                        className="form-control w-50"></input>
                                    </div>
                                    <div className=''>
                                        {checkState ?<button
                                            className="btn btn-dark"
                                            type="submit"
                                        >Agregar
                                        </button>
                                        :""}
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
