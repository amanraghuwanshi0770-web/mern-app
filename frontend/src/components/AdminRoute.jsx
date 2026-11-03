import {Navigate} from 'react-router-dom'

function AdminRoute({children}) {
    const token = localStorage.getItem("token")
    let user = null

    try {
        user = JSON.parse(localStorage.getItem("user"))
    } catch (error) {
        user = null
    }

    if(!token){
        return <Navigate to='/admin-login' replace />
    }

    if(!user || user.role !== "admin"){
        return <Navigate to='/home' replace />
    }
  return children
}

export default AdminRoute
