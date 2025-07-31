import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductContext';
import { NavLink } from 'react-router-dom';



export const ProductForm = ({ productSelected }) => {

  const { 
    initialProductsForm,
     handleAddProduct, 
     errors, 
     handleCloseForms, 
     getListSelectsForm, 
     formlist, 
     
    } = useContext(ProductContext);

  const [prodForm, setProdForm] = useState(initialProductsForm);

  const [rebaja, setRebaja] = useState(false);

  const [disponible, setDisponible] = useState(false);

  const [checkedState, setCheckedState] = useState(new Array(formlist.tallas.length).fill(false));


  useEffect(() => {
    
    if (productSelected) {
      setProdForm(productSelected);
    }
    getListSelectsForm();
    
    console.log(formlist.tallas.length);
    
  }, [productSelected], []);  //***AQUI */

  const onInputChange = ({ target }) => {

  }

  const onInputCheck = ({ target }) => {
    if (target.name === 'rebaja') {
      if (target.checked) {
        setRebaja(true);
      } else {
        setRebaja(false);
      }
    }
    if (target.name === 'disponible') {
      if (target.checked) {
        setDisponible(true);
      } else {
        setDisponible(false);
      }
    }
  }

  const onCheckTallasChange = (position) => {

    

    const updateCheckState = checkedState.map((item, index) => {
      return index === position ? !item : item
    });
    setCheckedState(updateCheckState);
  }

  const onSubmit = (event) => {

    event.preventDefault();
    const frm = document.getElementById('formElem');
    //const tallas = document.getElementById('tallas').tallas;

    const file = document.getElementById('floatingFile').files;
    const frms = document.forms['formElem'];


    const formData = new FormData(frm);
    const formJs = Object.fromEntries(formData.entries());
    const cantidad = [
      formData.get('cant19'),
      formData.get('cant20'),
      formData.get('cant21'),
      formData.get('cant22'),
      formData.get('cant23'),
      formData.get('cant24'),
      formData.get('cant25'),
      formData.get('cant26'),
      formData.get('cant27'),
      formData.get('cant28'),
      formData.get('cant29'),
    ]

    /*const cantidad = [
      {
        id:0,
        name:formData.get('cant19'),
      },
      {
        id:1,
        name:formData.get('cant20'),
      },
      {
        id:2,
        name:formData.get('cant21'),
      },
      {
        id:3,
        name:formData.get('cant22'),
      },
      {
        id:4,
        name:formData.get('cant23'),
      },
      {
        id:5,
        name:formData.get('cant24'),
      },
      {
        id:6,
        name:formData.get('cant25'),
      },
      {
        id:7,
        name:formData.get('cant26'),
      },
      {
        id:8,
        name:formData.get('cant27'),
      },
      {
        id:9,
        name:formData.get('cant28'),
      },
      {
        id:10,
        name:formData.get('cant29'),
      },
    ]

   
    /*const tallas = [
      {
        id:0,
        name:formData.get('19'),
      },
      {
        id:1,
        name:formData.get('20'),
      },
      {
        id:2,
        name:formData.get('21'),
      },
      {
        id:3,
        name:formData.get('22'),
      },
      {
        id:4,
        name:formData.get('23'),
      },
      {
        id:5,
        name:formData.get('24'),
      },
      {
        id:6,
        name:formData.get('25'),
      },
      {
        id:7,
        name:formData.get('26'),
      },
      {
        id:8,
        name:formData.get('27'),
      },
      {
        id:9,
        name:formData.get('28'),
      },
      {
        id:10,
        name:formData.get('29'),
      },
    ];*/

    formData.append('cantidad', cantidad);
    //formData.append('tallas', tallas);

    const formJson = {
      'id': prodForm.id,
      'files': file,
      'name': formJs.name,
      'precio': formJs.precio,
      'tipo': formJs.tipo,
      'tamanio': formJs.tamanio,
      'color': formJs.color,
      'rebaja': formJs.rebaja,
      'disponible': formJs.disponible,
      'tallas': [
        {
          id: 0,
          name: formJs.talla19,
        },
        {
          id: 1,
          name: formJs.talla20,
        },
        {
          id: 2,
          name: formJs.talla21,
        },
        {
          id: 3,
          name: formJs.talla22,
        },
        {
          id: 4,
          name: formJs.talla23,
        },
        {
          id: 5,
          name: formJs.talla24,
        },
        {
          id: 6,
          name: formJs.talla25,
        },
        {
          id: 7,
          name: formJs.talla26,
        },
        {
          id: 8,
          name: formJs.talla27,
        },
        {
          id: 9,
          name: formJs.talla28,
        },
        {
          id: 10,
          name: formJs.talla29,
        },
      ],

    }
    console.log(...formData);

    /*const formJson = Object.fromEntries(formData.entries());
    console.log(formJson.files);*/
    handleAddProduct(formData, prodForm.id);
  }

  return (
    <>

      <section className='col-6'>
        <div className='container'>

          <form className="row" id='formElem' name='formElem' onSubmit={(event) => onSubmit(event)} encType="multipart/form-data">
            <div className='col-8'>

              <input
                type="hidden"
                name="id"
                id='id'
                value={prodForm.id}
              />
              <p className="text-danger">{errors?.id}</p>

              <div className='form-floating  mb-3'>
                <input
                  className="form-control w-75"
                  type="file"
                  name="files"
                  id='floatingFile'
                  multiple
                  onChange={onInputChange}
                />
                <label htmlFor='floatingFile'>Imagenes: </label>
              </div>
              <p className="text-danger">{errors?.files}</p>
              <br />

              <div className='form-floating'>
                <input
                  className="form-control form-control-sm w-75"
                  placeholder="name"
                  type="text"
                  name="name"
                  id='floatingName'
                  onChange={onInputChange}
                />
                <label htmlFor='floatingName'>Nombre... </label>
              </div>
              <p className="text-danger">{errors?.name}</p>
              <br />

              <div className='form-floating'>
                <input
                  className="form-control w-75"
                  placeholder="precio"
                  type="text"
                  name="precio"
                  id='floatingPrecio'
                  onChange={onInputChange}
                />
                <label htmlFor='floatingPrecio'>Precio... </label>
              </div>
              <p className="text-danger">{errors?.precio}</p>
              <br />

              <div className='form-floating'>
                <select
                  className="form-select w-75"
                  name="tipo"
                  id='floatingTipo'
                  onChange={onInputChange}
                  aria-label="Floating label select example">

                  <option value={""} >--seleccione una opcion--</option>
                  {
                    formlist.tipos.map((t) => (
                      <option key={t.id} value={t.name}> {t.name} </option>
                    ))
                  }
                </select>
                <label htmlFor='floatingTipo'>Tipo: </label>
              </div>
              <p className="text-danger">{errors?.tipo}</p>
              <br />

              <div className='form-floating'>
                <select
                  className="form-select form-select-sm mx-2 w-75"
                  name="tamanio"
                  id='floatingTamanio'
                  onChange={onInputChange}
                  aria-label="form-select-sm example">

                  <option value={""} >--seleccione una opcion--</option>
                  {
                    formlist.tamanios.map((t) => (
                      <option key={t.id} value={t.name}> {t.name} </option>
                    ))
                  }
                </select>
                <label htmlFor='floatingTamanio'>Tamaño: </label>
              </div>
              <p className="text-danger">{errors?.tamanio}</p>
              <br />


              <div className='form-floating'>
                <select
                  className="form-select form-select-sm mx-2 w-75"
                  name="color"
                  id='floatingColores'
                  onChange={onInputChange}
                  aria-label="form-select-sm example">

                  <option value={""} >--seleccione una opcion--</option>
                  {
                    formlist.colores.map((c) => (
                      <option key={c.id} value={c.name}> {c.name} </option>
                    ))
                  }
                </select>
                <label htmlFor='floatingColores'>Colores: </label>
              </div>
              <p className="text-danger">{errors?.color}</p>
              <br />

              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  name='rebaja'
                  id='rebaja'
                  onChange={(event) => onInputCheck(event)}
                  value={rebaja}
                />
                <label htmlFor='rebaja' className='form-check-label'>Rebaja</label>
              </div>


              <div className='form-check my-4 py-2'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  name='disponible'
                  id='disponible'
                  onChange={(event) => onInputCheck(event)}
                  value={disponible}
                />
                <label htmlFor='disponible' className='form-check-label'>Disponible</label>
              </div>
            </div>

            <div className='col-4'>
              <h4>Tallas:</h4>
              {formlist.tallas.map(({ id, name }, index) => {
                if(checkedState.length === 0){
      setCheckedState(new Array(formlist.tallas.length).fill(false));
    }
                return (
                  <div className='' key={index}>

                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        name='tallas'
                        id='tallas'
                        value={name}
                        checked={checkedState[index]}
                        onChange={() => onCheckTallasChange(index)}

                      />
                      <label htmlFor={name} className='form-check-label'>{name}</label>
                    </div>

                    <div>
                      <label htmlFor={`cant${name}`} >{checkedState[index] === true ? 'Cantidad:' : ''}</label>
                      <input
                        className="form-control w-50"
                        defaultValue='0'
                        placeholder="0"
                        type={checkedState[index] === true ? 'number' : 'hidden'}
                        name={`cant${name}`}
                        id={'cantidad'}
                        onChange={onInputChange}
                      />
                    </div>

                  </div>)
              })}
              <p className="text-danger">{errors?.tallas}</p>
              <br />

            </div>

            <div className='col-2'>
              <button
                className="btn btn-primary"
                type='submit'
              >Enviar
              </button>
            </div>

          </form>

          <button
            className="btn btn-primary my-4 "
            onClick={handleCloseForms}
          >Home</button>
        </div>
      </section>

      {prodForm.id !== 0 ?

        <aside className='col-4 mx-3 px-3'>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> {productSelected ? 'Producto a editar ID:' + prodForm.id : ''}</h5>
              <ul>
                {productSelected ? <><li> Imagenes:

                  {prodForm.images.map(i => (
                    <ul key={i.id}>
                      <li><img src={"../../img/" + i.uri} width='100' /></li>
                    </ul>
                  ))}

                </li></> : ''}
                <li>{productSelected ? 'Nombre: ' + prodForm.name : ''}</li>
                <li>{productSelected ? 'Precio: $' + prodForm.precio : ''}</li>
                
                <li>{productSelected ? 'En rebaja: ' + prodForm.rebaja : ''}</li>
                <li>{productSelected ? 'Disponible: ' + prodForm.disponible : ''}</li>
                {productSelected ? <><li> Tallas:

                  {prodForm.tallas.map(t => (
                    <ul key={t.id}>
                      <li>{t.name}</li>
                    </ul>
                  ))}

                </li></> : ''}
                {productSelected ? <> <li> Cantidad:

                  {prodForm.cantidad.map(c => (
                    <ul key={c.id}>
                      <li>{c.name}  ' disponibles: ' {c.total}</li>
                    </ul>
                  ))}

                </li>
                
                </> : ''}
                
                <li>{productSelected ? 'Tipo: ' + prodForm.tipo.name : ''}</li>
                <li>{productSelected ? 'Tamaño: ' + prodForm.tamanio.name : ''}</li>
                <li>{productSelected ? 'Color: ' + prodForm.color.name : ''}</li>


              </ul>
            </div>
          </div>
        </aside> : ''}

    </>
  )
}
