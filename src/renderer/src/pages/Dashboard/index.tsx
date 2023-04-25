import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import NewCompany from './NewCompany'
import NewDesign from './NewDesign'
import NewPDF from './NewPDF'
import Company from './Company'
import UserAdd from './userAdd'

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
      element: <UserAdd />
    }
  ])

  return <RouterProvider router={router} />
}
