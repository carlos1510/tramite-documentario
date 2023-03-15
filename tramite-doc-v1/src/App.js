import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ListProduct from './components/page/almacen/ListProduct'
import ListCategory from './components/page/almacen/ListCategory'
import ListUnit from './components/page/almacen/ListUnitMeasurement'
import Home from './components/page/Home'
import ListClient from './components/page/venta/ListClient'
import ListProvider from './components/page/compra/ListProvider'
import TipoDocumento from './components/page/tipodocumento/TipoDocumento'
import Empresas from './components/page/empresa/Empresas'
import Area from './components/page/area/Area'
import Empleados from './components/page/empleado/Empleados'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='listProduct' element={<ListProduct />} />
          <Route path='listCategory' element={<ListCategory />} />
          <Route path='listUnit' element={<ListUnit />} />
          <Route path='listClients' element={<ListClient />} />
          <Route path='listProvider' element={<ListProvider />} />
          <Route path='tipo_documentos' element={<TipoDocumento />} />
          <Route path='empresas' element={<Empresas />} />
          <Route path='areas' element={<Area />} />
          <Route path='empleados' element={<Empleados />} />
        </Route>
      </Routes>
    </Router>
  )
}
