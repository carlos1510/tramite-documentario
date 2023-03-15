import React from 'react'
import { useField } from 'react-final-form'
import clsx from 'clsx';

const SelectField = ({name, label, className, requerido, validate, data}) => {
    const {input, meta: {error, touched}} = useField(name, {validate})
  return (
    <div className={clsx('form-group', className)}>
      <label>{label}: {requerido && <span className='text-danger'>(*)</span>}</label>
      <select className={clsx('form-control', className)} {...input}>
        <option value=''>Seleccion</option>
        {data?.map((item, index) => <option key={index} value={item?.id}>{item?.name}</option>)}
      </select>
      {touched && <span className='text-danger'>{error}</span>}
    </div>
  )
}

export default SelectField
