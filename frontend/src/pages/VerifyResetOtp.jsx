import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyResetOtp } from '../api/api';
import { Link } from 'react-router-dom';

function VerifyResetOtp() {

    const navigate = useNavigate()
    const location = useLocation()

    const email = location.state?.email || "";

    const [otp , setOtp] = useState("")
    const [error, setError] = useState("")
    const [loading , setLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")
    

    if(!email){
        navigate("/forgot-password",{replace: true})
        return
    }
     if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true)

    try{
        await verifyResetOtp(email ,otp)
        navigate('/reset-password',{
            state : {email},
        })
    }catch(error){
        console.log("otp verification error:",error)
        console.log("backend response:", error.response?.data)
        setError(
            error.response?.data?.message || "otp verification faild.plase try again"
        )
    }finally{
        setLoading(false)
    }
}

  return (
      <div className="auth-container">
      <div className="auth-card">
        <h1>Verify OTP</h1>
        <p>Enter the 6-digit OTP sent to your email.</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="otp">Email OTP</label>

            <input id="otp" type="text" inputMode="numeric" maxLength={6}
              value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="Enter 6-digit OTP"/>
           </div>

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p><Link to="/forgot-password">Back</Link></p>
      </div>
    </div>
  )
}

export default VerifyResetOtp
