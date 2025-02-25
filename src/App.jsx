import './App.css';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout.jsx';
import './App.css';
import ErrorTemplate from './helperComponents/ErrorTemplate.jsx';
import UndefinedPath from './helperComponents/UndefinedPath.jsx';
import Loader from './helperComponents/Loader.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

import Homepage from './routes/Homepage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorTemplate />} >
        <Route index element={
          <Suspense fallback={<Loader />} >
            <Homepage />
          </Suspense>
        } />
        <Route path="*" element={<UndefinedPath />} />
      </Route>
    </>
  )
)

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App