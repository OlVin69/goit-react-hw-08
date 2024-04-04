
import {Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Layout from '../App/Layout';
import  PrivateRoute  from './PrivateRoute';
import  RestrictedRoute  from './RestrictedRoute';
import { refreshUser } from '../../redux/auth/operations';
import  useAuth  from '../../hooks/useAuth';

import './App.css';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('../../pages/Home'));
const RegisterPage = lazy(() => import('../../pages/Register'));
const LoginPage = lazy(() => import('../../pages/Login'));
const ContactsPage = lazy(() => import('../../pages/Contacts'));


export default function App() {
  const { isRefreshing } = useAuth();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  

  return isRefreshing ? (
    <b>Refreshing user, please wait...</b>
  ) : (<Layout>
        <Suspense fallback={null}>
         <Routes>
         
           <Route path="/" element={<HomePage />} />
            <Route
                path="/register"
                element={
                  <RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />
                   }
                   />
            <Route
                path="/login"
                element={
                  <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
                   }
                   />
            <Route
                path="/contacts"
                element={
                  <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
                   }
                   />
            
          </Routes>
        </Suspense>
        <Toaster/>
      </Layout> 
  );
}




