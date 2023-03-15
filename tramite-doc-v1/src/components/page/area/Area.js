import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Form } from 'react-final-form';
import { MdEdit, MdOutlineClear, MdPersonAddAlt } from 'react-icons/md';
import Swal from 'sweetalert2';
import http from '../../../http';
import TextField from '../../atoms/TextField';
import ContentHeader from '../../ContentHeader'
import ButtonBack from '../../utility/ButtonBack';
import ButtonSave from '../../utility/ButtonSave';
import { required } from '../../validations/Validations';

const Area = () => {
  const columns = [
    {name: '#',selector: (row, index) => ++index,},
    {name: 'area_nombre', selector: row => row.area_nombre},
    {name: 'Editar', 
        cell: (row) => <button key={row.id} className="btn btn-success btn-sm" 
        onClick={() => {setEstado(true); setTitulo('Editar'); fechAreaById(row.id)}} ><MdEdit /></button>,
        button: true,
    },
    {name: 'Eliminar',
        cell: (row) => <button key={row.id} className="btn btn-danger btn-sm" 
        onClick={() => fechtDeleteArea(row.id)} ><MdOutlineClear /></button>,
        button: true,
    }
]

  const [estadoregistro, setEstadoRegistro] = useState(false);
    const [data, setData] = useState({});
    const [estado, setEstado] = useState(false);
    const [id, setId] = useState();
    const [titulo, setTitulo] = useState('Agregar')
    const [area, setAreas] = useState([]);


    const nuevoRegistro = () => {
      nuevo();
      setEstadoRegistro(true);
  }

  const nuevo = () => {
      limpiarDato();
      setId();
      setTitulo('Agregar');
      setEstado(false);
      //setLoading(false);
  }

  const salirRegistro = () => {
      limpiarDato();
      setEstadoRegistro(false);
  }

  const limpiarDato = () => {
      setData({
        area_nombre: '', 
        })
  }

  useEffect(() => {
    fectAllAreas();
}, []);

const fectAllAreas = () => {
    http.get('/areas/listar').then(res => {
        setAreas(res.data);
    })
}

const fechAreaById = (param) => {
    setId(param);
    
    http.post('/areas/obtenerbyId/'+ param ).then((res) => {
        setEstadoRegistro(true)
      setData({
        area_nombre: res.data.area_nombre, 
      })
    })
}

const fechtDeleteArea = (param) => {
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
        http.post('/areas/delete/'+param).then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Exito!',
            text: 'Se elimino exitosamente el registro',
            timer: '3000'
          });
          fectAllAreas();
        })
      }
    })
}

  const onSubmit = async (values) => {
    if(estado){
      http.put('/areas/update/'+id, values).then((res) => {
        setTitulo('Agregar');
        Swal.fire({
          icon: 'success',
          title: 'Exito!',
          text: 'Operación realizado exitosamente',
          timer: '3000'
        })
        fectAllAreas();
        setEstadoRegistro(false);
        nuevo()
       });
    }else{
      http.post('/areas/guardar', values).then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Exito!',
          text: 'Operación realizado exitosamente',
          timer: '3000'
        })
        fectAllAreas();
        setEstadoRegistro(false);
        nuevo()
      })
    }
  }

  return (
    <div>
      <ContentHeader title='Area' type={true}  />
      <div className="wrapper wrapper-content">
      {estadoregistro ? 
        <div className='row'>
            <div className='col-lg-12'>
                <div className='ibox'>
                    <div className='ibox-title'>
                        <h5>{titulo} Empresa</h5>
                    </div>
                      <Form 
                          onSubmit={onSubmit} 
                          initialValues={data}
                          render={({handleSubmit}) => (
                              <form onSubmit={handleSubmit}>
                                  <div className='ibox-content'>
                                      <div className='row'>
                                          <div className='col-lg-12'>
                                              <TextField name='area_nombre' requerido={true} label='Nombre del Área' validate={required()} />
                                          </div>
                                      </div>
                                  </div>
                                  <div className='ibox-footer'>
                                      <div className='col text-center'>
                                          <ButtonBack type={'button'} onClick={salirRegistro} />
                                          <ButtonSave type={'submit'} />
                                      </div>
                                  </div>
                              </form>
                          )}
                      />
                </div>
            </div>
        </div>
      :
        <div className='row'>
            <div className='col-lg-12'>
              <div className='ibox'>
                  <div className='ibox-title'>
                      <h5>Lista de Areas</h5>
                      <div className="ibox-tools">
                          <button type='button' onClick={nuevoRegistro} className='btn btn-sm btn-success'><MdPersonAddAlt size={20} /> Agregar</button>
                      </div>
                  </div>
                  <div className='ibox-content no-padding'>
                      <div className='table-responsive'>
                          <DataTable columns={columns}
                          data={ area || [] }
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

export default Area
