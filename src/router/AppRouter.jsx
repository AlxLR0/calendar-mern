import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { LoginPage, RegisterPage } from '../auth';
import { CalendarPage } from '../calendar';

export const AppRouter = () => {

    const authStatus ='not-authenticated';
  return (
    <Routes>
        {
            (authStatus === 'authenticated')
            ?(
              <Route path="/auth/*">
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
              </Route>
            )
            :<Route path="/*" element={<CalendarPage/>}/>
        }
        
        <Route path="/*" element={<Navigate to="/auth/login"/>}/>
    </Routes>
  )
}
