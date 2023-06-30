import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import NewCompany from './NewCompany'
import NewDesign from './NewDesign'
import NewPDF from './NewPDF'
import EditPDF from './EditPDF'
import Company from './Company'
import AddUser from './AddUser'
import EditUser from './EditUser'
import EditLayout from "./EditLayout"
import { AnimatePresence } from 'framer-motion'

export default function Dashboard(): JSX.Element {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<NewCompany />} />
          <Route path="/company/:companyName" element={<Company />} />
          <Route path="/new-design/:companyName" element={<NewDesign />} />
          <Route path="/new-pdf/:companyName" element={<NewPDF />} />
          <Route path="/edit-pdf/:companyName/:realDate" element={<EditPDF />} />
          <Route path="/user-add" element={<AddUser />} />
          <Route path="/user-edit" element={<EditUser />} />
          <Route path="/edit-layout/:companyName/:componentName" element={<EditLayout/>} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}
