import React, { useState, useEffect } from 'react'
import ContentHeader from '../../ContentHeader'
import DataTable from 'react-data-table-component';
import { MdEdit, MdOutlineClear, MdReplay } from 'react-icons/md';
import { FiSave } from 'react-icons/fi';
import http from '../../../http';
import UseForm from '../../utility/UseForm';
import Swal from 'sweetalert2';

export default function ListCategory() {

  const [category, setCategories] = useState([]);
  const [estado, setEstado] = useState(false);
  const [id, setId] = useState();
  const [titulo, setTitulo] = useState('Agregar')

  const columns = [
    {
        name: '#',
        selector: (row, index) => ++index,
        sortable: true,
    },
    {
        name: 'Descripcion',
        selector: row => row.descripcion,
        sortable: true,
    },
    {
        name: 'Editar',
        cell: (row) => <button key={row.id} className="btn btn-success btn-sm" 
        onClick={() => {setEstado(true); setTitulo('Editar'); fechCategory(row.id);}}><MdEdit /></button>,
        button: true,
    },
    {
        name: 'Eliminar',
        cell: (row) => <button key={row.id} className="btn btn-danger btn-sm" 
        onClick={() => fechtDeleteCategory(row.id)}><MdOutlineClear /></button>,
        button: true,
    },
  ];

  const initialData = {descripcion: ''} 

  const onValidate = (form) => {
    let errors = {};

    if(!form.descripcion.trim()){
      errors.descripcion = 'El campo "Descripcion" no debe ser vacio.';
    }

    return errors
  }

  const { inputs, setInputs, errors, loading, setLoading, handleChange, handleSubmit, clearForm, resetForm } = UseForm(initialData, onValidate);

    useEffect(() => {
      fectAllCategories();
    }, []);

    const fectAllCategories = () => {
      http.get('/categories').then(res => {
        setCategories(res.data);
      })
    }

    const submitForm = () => {
      console.log(handleSubmit());
      if(handleSubmit()){
        setLoading(true)
        if(estado){
          http.put('/categories/'+id, inputs).then((res) => {
           setTitulo('Agregar');
           Swal.fire({
             icon: 'success',
             title: 'Exito!',
             text: 'Operación realizado exitosamente',
             timer: '3000'
           })
           fectAllCategories();
           limpiarForm();
          });
       }else{
         http.post('/categories', inputs).then(res => {
           Swal.fire({
             icon: 'success',
             title: 'Exito!',
             text: 'Operación realizado exitosamente',
             timer: '3000'
           })
           fectAllCategories();
           limpiarForm();
         })
       }
      }
      
    }

    const fechCategory = (param) => {
      setId(param);
      
      http.post('/categories/'+ param ).then((res) => {
        setInputs({
          descripcion: res.data.descripcion,
        });
      })
    }

    const fechtDeleteCategory = (param) => {
      Swal.fire({
        title: 'Advertencia',
        text: '¿Está seguro que desea eliminar el registro?',
        icon: 'error',
        showDenyButton: true,
        denyButtonText: 'No',
        confirmButtonText: 'Si',
        confirmButtonColor: "blue",

      }).then(response => {
        if(response.isConfirmed){
          http.post('/categories/delete/'+param).then((res) => {
            Swal.fire({
              icon: 'success',
              title: 'Exito!',
              text: 'Se elimino exitosamente el registro',
              timer: '3000'
            });
            fectAllCategories();
            limpiarForm();
          })
        }
      })
    }

    const limpiarForm = () => {
      clearForm();
      setId();
      setEstado(false);
      setLoading(false);
      setTitulo('Agregar');
    }

  return (
    <div>
      <ContentHeader title='Categoria' type={true}  />
      <div className="wrapper wrapper-content">
        <p>{estado}</p>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='panel panel-success'>
              <div className='panel-heading'>Lista de Categorias</div>
              <div className='panel-body'>
                <div className='table-responsive'>
                  <DataTable columns={columns}
                    data={category || [] }
                    pagination 
                    fixedHeader
                    fixedHeaderScrollHeight="340px"
                    responsive={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='panel panel-success'>
              <div className='panel-heading'>{titulo} Categoria</div>
              <form >
                <div className='panel-body'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='form-group'>
                        <label>Descripcion: <span className='text-danger'>(*)</span></label>
                        <input className="form-control text-uppercase" name="descripcion" type="text" value={inputs.descripcion} 
                        onChange={handleChange}/>
                        {errors.descripcion && <div className='alert alert-danger p-1'>{errors.descripcion}</div> } 
                      </div>
                    </div>
                  </div>
                </div>
                <div className='panel-footer align-items-center'>
                  <div className='col text-center'>
                    <button type='button' onClick={limpiarForm} className='btn btn-danger'><MdReplay /> Limpiar</button>
                    <button type='button' onClick={submitForm} className='btn btn-success'>{loading ? <div className='fa fa-spinner fa-spin'></div> :  <FiSave /> } {loading ? "Procesando...": "Guardar"}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
