import { MdLocalHospital } from "react-icons/md";
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoute = () => {

    const validateCredentials = [ 

        {username: '00742731', password: '123456' },
     ];

   const username = localStorage.getItem('username');
  
   const password = localStorage.getItem('password');

   const isAuthenticated = validateCredentials.some(cred  => cred.username === username && cred.password === password)

  return (

    isAuthenticated ? <Outlet/> : <Navigate to="/" replace={true} />

  )
}

export default PrivateRoute