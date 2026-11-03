import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import {loginUser} from '../../api/api.js'

function AdminLogin() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
    
    try {
        const response = await loginUser({
            email: email.trim(),
            password
        })
        const {token,user} = response.data
        if(user?.role !== "admin"){
            setError("you are not authorized as an admin")
            return
        }

        localStorage.setItem("token", token)
        localStorage.setItem("user",JSON.stringify(user))
        navigate("/admin/dashboard",{replace : true})

    } catch (error) {
        setError(
            error.response?.data?.message || "admin login failed"
        )
    }finally{
        setLoading(false)
    }
}


  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <p>Sign in to manage your store</p>

        {error && <div className="admin-error">{error}</div>}

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin email" required/>

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" required/>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login as Admin"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin
