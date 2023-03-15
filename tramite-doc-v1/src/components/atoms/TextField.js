import React from 'react'
import { useField } from "react-final-form";
import clsx from 'clsx';
import { MdSearch } from 'react-icons/md';

const TextField = ({name, label, requerido, className, isButton, onClick, loading, validate, ...props}) => {
    const {input, meta: {error, touched}} = useField(name,{validate})
  return (
    <div className={clsx('form-group', className)}>
      <label>{label}: {requerido && <span className='text-danger'>(*)</span>}</label>
      {isButton ? <div className='input-group'>
        <input className={clsx('form-control', className)} {...input} {...props}/>
        <button type='button' onClick={onClick} className='btn btn-sm btn-success'>{loading ? <div className='fa fa-spinner fa-spin'></div> :  <MdSearch size={20} /> } </button>
      </div>
      :
      <input className={clsx('form-control', className)} {...input} {...props}/>
      }
      
      {touched && <span className='text-danger'>{error}</span>}
    </div>
  )
}

export default TextField
