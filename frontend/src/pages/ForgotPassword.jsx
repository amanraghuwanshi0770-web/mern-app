import { useState } from "react";
import { forgetPassword } from "../api/api";
import {Link,useNavigate} from 'react-router-dom'

function ForgetPassword() {
    const navigate = useNavigate()

    const[email, setEmail] = useState("")
    const[error, setError] = useState("")
    const[loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')

      if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true)

    try {
        await forgetPassword(email.trim())

        navigate('/verify-reset-otp',{
            state:{email:email.trim()}
        })
    } catch (error) {
        setError(
        error.response?.data?.message || "failad to sand otp. please try again."
        )
    }finally{
        setLoading(false)
    }}
  return (
    <div className="auth-container">
        <div className="auth-card">
            <h1>Forget Password</h1>
            <p>Enter your registered email address..</p>

            {error && (
                <p className="errpr-message">{error}</p>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div className="from-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-input" id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter your email" />
                </div>

                <button type="submit" disabled={loading}>
                    {loading
                    ?"Sending OTP..."
                    :"Send OTP"
                    }
                </button>
            </form>
            <p>Remember your Password?{""}
                <Link to='/login'>Login</Link>
            </p>
        </div>
    </div>
  )
}

export default ForgetPassword
