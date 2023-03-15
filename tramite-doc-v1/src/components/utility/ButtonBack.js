import React from 'react'
import PropTypes from 'prop-types';
import { MdReplay } from 'react-icons/md';

const ButtonBack = ({onClick}) => {
  return (
    <button type='button' className='btn btn-sm btn-danger pr-1 mr-1' onClick={onClick}><MdReplay size={20} /> Salir</button>
  )
}

ButtonBack.propTypes = {
    /** Callback onClick */
    onClick: PropTypes.func,
};

ButtonBack.defaultProps = {
    onClick: () => {},
};

export default ButtonBack
