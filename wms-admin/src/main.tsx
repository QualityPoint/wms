import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoutes.tsx'
import Login from './pages/auth/Login.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import { Toaster } from 'sonner'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
    children: 
      [
        {
          index: true,
          element: <Navigate to="login" replace />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'dashboard',
          element: 
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>,
        }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <Toaster />
  </StrictMode>,
)
