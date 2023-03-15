import React from 'react'
import PropTypes from 'prop-types';
import { FiSave } from 'react-icons/fi';

const ButtonSave = ({onClick, loading, type}) => {
  return (
    <button type={type} className='btn btn-sm btn-success' onClick={onClick}>{loading ? <div className='fa fa-spinner fa-spin'></div> :  <FiSave size={20} /> } {loading ? "Procesando...": "Guardar"}</button>
  )
}

ButtonSave.propTypes = {
    /** Callback onClick */
    onClick: PropTypes.func,
};

ButtonSave.defaultProps = {
    onClick: () => {},
};

export default ButtonSave
