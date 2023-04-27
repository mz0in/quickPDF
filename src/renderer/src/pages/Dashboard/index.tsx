import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import NewCompany from './NewCompany'
import NewDesign from './NewDesign'
import NewPDF from './NewPDF'
import Company from './Company'
import AddUser from './AddUser'
import EditUser from './EditUser'

export default function Dashboard(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/company',
      element: <NewCompany />
    },
    {
      path: '/company/:companyName',
      element: <Company />
    },
    {
      path: '/new-design/:companyName',
      element: <NewDesign />
    },
    {
      path: '/new-pdf/:companyName',
      element: <NewPDF />
    },
    {
      path: '/user-add',
      element: <AddUser />
    },
    {
      path: '/user-edit',
      element: <EditUser />
    }
  ])

  return <RouterProvider router={router} />
}
