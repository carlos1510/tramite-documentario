import React from 'react'
import { Link } from 'react-router-dom'
import { BiArchive, BiSitemap } from "react-icons/bi";

export default function Sidebar() {
  return (
    <nav className="navbar-default navbar-static-side" role="navigation">
  <div className="sidebar-collapse">
    <ul className="nav metismenu" id="side-menu">
      <li className="nav-header">
        <div className="dropdown profile-element">
          <img alt="image" className="rounded-circle" src="img/profile_small.html" />
          <a data-toggle="dropdown" className="dropdown-toggle" href="#">
            <span className="block m-t-xs font-bold">David Williams</span>
            <span className="text-muted text-xs block">Art Director <b className="caret" /></span>
          </a>
          <ul className="dropdown-menu animated fadeInRight m-t-xs">
            <li><a className="dropdown-item" href="profile.html">Profile</a></li>
            <li><a className="dropdown-item" href="contacts.html">Contacts</a></li>
            <li><a className="dropdown-item" href="mailbox.html">Mailbox</a></li>
            <li className="dropdown-divider" />
            <li><a className="dropdown-item" href="login.html">Logout</a></li>
          </ul>
        </div>
        <div className="logo-element">
          ES+
        </div>
      </li>
      <li>
        <Link to='/' className="active"><i className="fa fa-home" /> <span className="nav-label">Home</span></Link>
      </li>
      <li>
        <Link to='/' ><i className="fa fa-file-text-o" /> <span className="nav-label">Tramite</span></Link>
      </li>
      <li>
        <Link to='/' ><i className="fa fa-user" /> <span className="nav-label">Usuario</span></Link>
      </li>
      <li>
        <Link to='empleados' ><i className="fa fa-users" /> <span className="nav-label">Empleado</span></Link>
      </li>
      <li>
        <Link to='areas' ><BiSitemap /> <span className="nav-label">Area</span></Link>
      </li>
      <li>
        <Link to='tipo_documentos'><BiArchive /> <span className="nav-label">Tipo Documento</span></Link>
      </li>
      <li>
        <Link to='empresas'><BiArchive /> <span className="nav-label">Empresa</span></Link>
      </li>
    
    </ul>
  </div>
</nav>

  )
}
