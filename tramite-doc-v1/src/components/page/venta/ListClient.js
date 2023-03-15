import React from 'react'
import ContentHeader from '../../ContentHeader'
import {Form} from "react-final-form";

import TextField from '../../atoms/TextField';
import { isNumber, required } from '../../validations/Validations';

export default function ListClient() {
  const onSubmit = () => {
    console.log("prueba click");
  }

  const validate = () => {
    console.log("Validaciones");
  }
  return (
    <div>
      <ContentHeader title='Cliente' type={true}  />
      <div className="wrapper wrapper-content">
        <div className='row'>
          <div className='col-lg-12'>
            <Form 
            onSubmit={onSubmit} 
            validate={validate}
            render={({handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className='col-lg-3'>
                  <TextField name='nombre' label='Nombre' className='text-success' validate={required()} />
                </div>
              </form>
            )} />
          </div>
        </div>
      </div>
    </div>
  )
}
