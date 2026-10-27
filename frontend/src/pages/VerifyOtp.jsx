import { useState, useRef} from 'react'
import {useNavigate , useLocation,Link} from 'react-router-dom'
import { verifySignupOtp } from '../api/api.js'
import Button from '../components/Button.jsx'


function VerifyOtp() {

    const navigate = useNavigate()
    const location = useLocation()

    const email = location.state?.email || ""

    const[otp, setOtp] = useState(["","","","","",""])
    const[serverError, setServerError] = useState("")
    const[loading,setLoading] = useState(false)
 
    const inputRefs = useRef([])

    const handleOtpChange = (value,index) => {
        const digit = value.replace(/\D/g,"").slice(-1)
    
    const updatedOtp = [...otp]
    updatedOtp[index] = digit
    setOtp(updatedOtp)
    setServerError("")
    
    if(digit && index < 5){
        inputRefs.current[index + 1]?.focus()
    }
}

 const handleKeyDown = (e,index) => {
    if(e.key === "Backspace" && !otp[index] && index > 0){
        inputRefs.current[index -1 ]?.focus()}

    if(e.key === "ArrowLeft" && index > 0){
        inputRefs.current[index -1 ]?.focus()}
    
     if(e.key === "ArrowRight" && index < 5){
        inputRefs.current[index +1 ]?.focus()}
}

const handlePaste = (e) => {
    e.preventDefault()

    const pastedDigits = e.clipboardData
    .getData('text')
    .replace(/\D/g,"")
    .slice(0,6)

    if(!pastedDigits) return 
    const updatedOtp = ["","","","","",""]

    pastedDigits.split("").forEach((digit,index)=>{
        updatedOtp[index] = digit
    })

    setOtp(updatedOtp)
    setServerError("")

    inputRefs.current[Math.min(pastedDigits.length, 5)]?.focus()
}

const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setServerError("");

if(!email){
    setServerError("email missing. plz signup again")
    return
}

const otpValue = otp.join("")
 if (!/^\d{6}$/.test(otpValue)) {
      setServerError("Please enter all 6 digits.")
      return
}
setLoading(true)

try {
      await verifySignupOtp(email, otpValue)
      navigate("/login", { state: { email } })
    } catch (error) {
      console.error("OTP verification error:", error)

      setServerError(
        error.response?.data?.message || "OTP verification failed. Please try again."
      )
    } finally {
      setLoading(false)
    }
}
  return (
    <div className='auth-container'>
        <div className='auth-card otp-card'>
            <h1>Verify your email</h1>
            <p>Enter The 6-Digit code sent to</p>
            <p className='otp-email'>{email}</p>

            {serverError && (
                <p className='error-message'>{serverError}</p>
            )}

            <form onSubmit={handleVerifyOtp} noValidate>
                <div className='otp-inputs'>
                    {otp.map((digit,index)=>(

                        <input key={index}
                         ref={(element) =>{
                            inputRefs.current[index] = element
                         }} 
                          type="text"
                          inputMode="numeric"
                          autoComplete={index === 0 ? "one-time-code" : "off"}
                          aria-label={`OTP digit ${index + 1}`}
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                          handleOtpChange(e.target.value, index)
                        }
 
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        required
                         />
                    ))}
                </div>
                <Button text="Verify Otp" loading={loading}/>            

            </form>

        <p>Wrong email? <Link to="/signup">Sign Up Again</Link></p>
        <p>Already verified? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default VerifyOtp
