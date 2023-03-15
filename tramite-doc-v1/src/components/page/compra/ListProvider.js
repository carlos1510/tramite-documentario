import React, { useState } from 'react'
import { MdPersonAddAlt, MdSearch } from 'react-icons/md'
import ContentHeader from '../../ContentHeader'
import DataTable from 'react-data-table-component';
import http from '../../../http';
import ButtonSave from '../../utility/ButtonSave';
import ButtonBack from '../../utility/ButtonBack';
import UseForm from '../../utility/UseForm';
import Swal from 'sweetalert2';

export default function ListProvider() {
  
  const columns = [
    {
      name: '#'
    },
    {
      name: 'Tipo de Doc.'
    },
    {
      name: 'Razon Social',
    },
    {
      name: 'Direccion'
    },
    {
      name: 'Telefono',
    
    },
    {
      name: 'Correo'
    }
  ]

  const [estado, setEstado] = useState(false);
  const [id, setId] = useState();
  const [estadoregistro, setEstadoRegistro] = useState(false);
  const [titulo, setTitulo] = useState('Agregar')

  const initialData = {nro_documento: '', razon_social: '', direccion: '', telefono: '', correo: ''} 

  const onValidate = (form) => {
    let errors = {};

    if(!form.idtipo_documento.trim()){
      errors.idtipo_documento = 'El campo "idtipo_documento" no debe ser vacio.';
    }
    if(!form.nro_documento.trim()){
      errors.nro_documento = 'El campo "nro_documento" no debe ser vacio.';
    }
    if(!form.razon_social.trim()){
      errors.razon_social = 'El campo "razon_social" no debe ser vacio.';
    }

    return errors
  }

  const { inputs, setInputs, errors, loading, setLoading, handleChange, handleSubmit, clearForm, resetForm } = UseForm(initialData, onValidate);

  const newProvider = () => {
    setEstadoRegistro(true);
  }

  const submitForm = () => {
    if(handleSubmit()){
      setLoading(true)
      if(estado){
        http.put('/proveedores/'+id, inputs).then((res) => {
         setTitulo('Agregar');
         Swal.fire({
           icon: 'success',
           title: 'Exito!',
           text: 'Operación realizado exitosamente',
           timer: '3000'
         })
         //fectAllUnidadesMedidas();
         limpiarForm();
        });
     }else{
      console.log("guardar")
       http.post('/proveedores', inputs).then(res => {
         Swal.fire({
           icon: 'success',
           title: 'Exito!',
           text: 'Operación realizado exitosamente',
           timer: '3000'
         })
         //fectAllUnidadesMedidas();
         limpiarForm();
       })
     }
    }
  }

  const limpiarForm = () => {
    clearForm();
    setId();
    setEstado(false);
    setLoading(false);
    setTitulo('Agregar');
    setEstadoRegistro(false);
  }

  const salirRegistro = () => {
    
    limpiarForm();
  }

  return (
    <div>
      <ContentHeader title='Proveedor' type={true}  />
      <div className="wrapper wrapper-content">
        {estadoregistro ? 
          <div className='row'>
            <div className='col-lg-12'>
              <div className='ibox' >
                <div className='ibox-title'>
                  <h5>{titulo} Proveedor</h5>
                </div>
                <form>
                  <div className='ibox-content'>
                    <div className='row'>
                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <label>Tipo de Documento: <span className='text-danger'>(*)</span></label>
                          <select className='form-control' name='idtipo_documento' value={inputs.idtipo_documento} onChange={handleChange} >
                            <option value="">---</option>
                            <option value={'1'}>DNI</option>
                            <option value={'2'}>RUC</option>
                          </select>
                        </div>
                      </div>
                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <label>Nro. Documento: <span className='text-danger'>(*)</span></label>
                          <div className='input-group'>
                            <input type="text" className="form-control" name="nro_documento" value={inputs.nro_documento} onChange={handleChange} />
                            <button className='btn btn-sm btn-success'>
                                <MdSearch />
                            </button>
                          </div>
                          {errors.nro_documento && <div className='alert alert-danger p-1'>{errors.nro_documento}</div> } 
                        </div>                      
                      </div>
                      <div className='col-lg-6'>
                        <div className='form-group'>
                          <label>Razon Social: <span className='text-danger'>(*)</span></label>
                          <input type="text" className='form-control' name='razon_social' value={inputs.razon_social} onChange={handleChange} />
                          {errors.razon_social && <div className='alert alert-danger p-1'>{errors.razon_social}</div> } 
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-6'>
                        <div className='form-group'>
                          <label>Direccion: </label>
                          <input type="text" className='form-control' name='direccion' value={inputs.direccion} onChange={handleChange} />
                        </div>
                      </div>
                      <div className='col-lg-2'>
                        <div className='form-group'>
                          <label>Telefono:</label>
                          <input type="text" className='form-control' name='telefono' value={inputs.telefono} onChange={handleChange} />
                        </div>
                      </div>
                      <div className='col-lg-4'>
                        <div className='form-group'>
                          <label>Correo: </label>
                          <input type="text" className='form-control' name='correo' value={inputs.correo} onChange={handleChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='ibox-footer'>
                      <div className='col flex text-center'>
                        <ButtonBack onClick={salirRegistro} />
                        <ButtonSave onClick={submitForm} loading={loading} />
                      </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          : 
          <div className='row'>
            <div className='col-lg-12'>
              <div className='ibox'>
                <div className='ibox-title'>
                  <h5>Lista de Proveedores</h5>
                  <div className="ibox-tools">
                    <button type='button' onClick={newProvider} className='btn btn-sm btn-success'><MdPersonAddAlt size={20} /> Agregar</button>
                  </div>
                </div>
                <div className='ibox-content'>
                  <h2>dd</h2>
                </div>
                <div className='ibox-footer'>
                  <div className='table-responsive'>
                    <DataTable columns={columns}
                      data={ [] }
                      pagination 
                      fixedHeader
                      fixedHeaderScrollHeight="340px"
                      responsive={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        

        
      </div>
    </div>
  )
}
