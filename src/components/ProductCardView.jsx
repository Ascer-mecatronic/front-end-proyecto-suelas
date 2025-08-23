import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { DetailsModal } from "./DetailsModal";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";

const initiCont = 0;

export const ProductCardView = ({id, name, precio, cantidad, images, tallas, tipo, tamanio, color, porciento }) => {

    const {
        handlerProductSelected,
        handleRemoveProduct,
        optimizeGarbage,
    } = useContext(ProductContext);

    const {login} = useContext(AuthContext);

    const[contImg, setContImg] = useState(initiCont);

    

    const onMouseUpImg = () =>{
        setContImg(1);
        
    }

    const onMouseDownImg = () =>{
        setContImg(initiCont);
    }

    const handleRemove = (id) => {
        console.log(id);
        handleRemoveProduct(id);
        //optimizeGarbage();
    }

    return (
        <>
            <div className="card m-2 card-estilos">
                <div className="card-body">
                   <NavLink to={'/products/mod/' + id}>
                    <img className="card-img-top my-2" 
                    src={"../../img/" + images[contImg].uri} 
                    width='100'
                    height='200'
                    onMouseOver={()=>onMouseUpImg()}
                    onMouseOut={()=>onMouseDownImg()}
                    />
                   
                   </NavLink>
                    <p className="card-text text-center m-2">Modelo: {id}</p>
                    <p className="card-text text-center m-2">${precio}</p>
                    {!login.isAdmin || <>
                    <NavLink className={"btn btn-secondary btn-sm"} to={'/products/edit/' + id}>
                    Editar
                    </NavLink>
                    <button
                        onClick={()=>handleRemoveProduct(id)}
                        className="btn btn-danger btn-sm"
                    >Eliminar</button> </>}

                    <button
                        onClick={()=>handlerProductSelected({id, name, precio, cantidad, images, tallas, tipo, tamanio, color, porciento})}
                        className="btn btn-sm btn-secondary m-2"
                    >Detalles</button>
                </div>
            </div>
        </>
    )
}