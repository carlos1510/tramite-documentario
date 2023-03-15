import React from 'react'
import { Link } from 'react-router-dom'

const ContentHeader = ({title, type}) => {
  return (
    <div className="row wrapper border-bottom white-bg page-heading">
        <div className="col-lg-9">
            <h2>{title}</h2>
            <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to='/'>Home</Link>
            </li>
            {type ? <li className="breadcrumb-item active"><strong>{ title }</strong></li>: ''}
            </ol>
        </div>
    </div>

  )
}

export default ContentHeader;
