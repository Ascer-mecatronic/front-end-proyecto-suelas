import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext';

const initialItemState =
{
    id: 0,
    product: {},
    talla: '',
    cantidad: 0,
};

const initialCantidad = {
    id: 0,
    name: '',
    total: 0,
}

const initPicturePosition = 0;

export const ViewModel = (productSelected) => {

    const {handleAddItemsCart} = useContext(CartContext);

    const { id, name, precio, cantidad, images, tallas, tipo, tamanio, color } = productSelected;

    const [checkState, setCheckState] = useState('');
    const [cantState, setCantState] = useState(initialCantidad);
    const [itemState, setItemState] = useState(initialItemState);
    const [picture, setPicture] = useState(initPicturePosition);

    useEffect(() => {
        setItemState({
            ...itemState,
            id: id,
            product: productSelected,
        })
    }, []);

    const onCheckTallasChange = ({ target }, index) => {

        setCheckState(tallas[index]);
        setItemState({
            ...itemState,
            [target.name]: tallas[index].name,

        })
        if (cantidad) {
            const cant = cantidad.find(c => c.name === tallas[index].name);
            setCantState(cant);
        } else {
            setCantState(initialCantidad);
        }

    }

    const onInputChange = ({ target }) => {
        const num = parseInt(target.value);
        setItemState({
            ...itemState,
            [target.name]: num,
        })
    }

    const onClickImg = (index) =>{
        setPicture(index);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(itemState);
        handleAddItemsCart(itemState);
        //handlerCloseDetails();
        //navigate('/products/cartPage');
    }


    return (
        <div className='row'>
            <aside className='col-6'>
                <div className='row'>
                    <div className='col'>
                        <img className="card-img-top my-2"
                            src={"../../img/" + images[picture].uri}
                            width='700'
                            height='700'
                        />
                    </div>
                </div>
                <div className='row'>
                    {images.map((i, index) => {
                        return (
                            <div className='col' key={i.id}>
                                <img className="card-img-top my-2"
                                    src={"../../img/" + i.uri}
                                    width='100'
                                    height='100'
                                    onClick={() => onClickImg(index)}
                                />
                            </div>
                        )
                    })}

                </div>
            </aside>
            <section className='col-6'>
                <div className='txt-center'>
                    <h1 className='text-white'>{name}</h1>
                </div>

                <div>
                    <h3 className='text-white'>Descripcion</h3>
                </div>
                <div>
                    <h3 className='text-white'> Nombre: {name}</h3>
                </div>
                <div>
                    <h3 className='text-white'> Precio: MXN$ {precio}</h3>
                </div>
                <div>
                    <h3 className='text-white'> Tipo: {tipo.name}</h3>
                </div>
                <div>
                    <h3 className='text-white'> Tamaño: {tamanio.name}</h3>
                </div>
                <div>
                    <h3 className='text-white'> Color: {color.name}</h3>
                </div>

                <div>
                    <form onSubmit={(event) => onSubmit(event)}>
                        <h3>Talla: {checkState.name}</h3>
                        <h3>Disponibles:{cantState ? cantState.total : '0'}</h3>
                        <div className="radio-tile-group">
                            {tallas.map(({ id, name }, index) => {
                                return (
                                    <div className="input-container" key={id}>
                                        <input
                                            id={name}
                                            value={name}
                                            type="radio"
                                            name="talla"
                                            onChange={(event) => {

                                                onCheckTallasChange(event, index)
                                            }}
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
                                    onInputChange(event)
                                }}
                                className="form-control w-50"></input>
                        </div>
                        <div className=''>
                            {checkState ? <button
                                className="btn btn-dark"
                                type="submit"
                            >Agregar
                            </button>
                                : ""}
                        </div>
                    </form>
                </div>



            </section>
        </div>
    )
}
