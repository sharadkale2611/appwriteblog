import React, { useState, useEffect } from 'react'
import { Footer, Header } from './components/'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())        
      }
    }).catch()
    .finally(()=>{
      setLoading(false)
    })
  },[])
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <center>
      <h4 className='w-full mt-24 text-3xl text-red-700'>Loading...</h4>
    </center>
  )
}

export default App
