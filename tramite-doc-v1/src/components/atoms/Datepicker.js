import React from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from 'react-icons/fa'

 const Datepicker = ({selectedDate, handleChange}) => {
    registerLocale('es', es)
  return (
    <div className='datepicker d-flex align-center'>
      <span className='d-flex align-center icon-container input-group-addon'><FaRegCalendarAlt size={21} /></span>
      <DatePicker todayButton="HOY" autoComplete='off' className='form-control' laceholderText='DD/MM/YYYY'  locale="es" isClearable dateFormat="dd/MM/yyyy" selected={selectedDate} onChange={handleChange} />
    </div>
  )
}

export default Datepicker
