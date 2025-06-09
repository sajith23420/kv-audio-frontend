import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import "./verifyEmail.css"
import { FaEnvelope } from 'react-icons/fa';
export default function VerifyEmail() {
    const token = localStorage.getItem("token")
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.error(err)
        })
    })
    function handleVerifyEmail() {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verifyEmail`, {
            code: parseInt(otp)
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res)
            toast.success("Email Verified")
            navigate("/")
        }
        ).catch((err) => {
            console.error(err)
            toast.error("Invalid OTP")
        })
    }

    return (
        <div className="bg-picture">
            <h1 className="main-title">KV Audio</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleVerifyEmail(); }} className="verify-form">
                <div className="form-container">
                    <h2 className="form-title">Verify Email</h2>
                    <p className="register-text" style={{ color: '#fff', marginBottom: '20px' }}>Please verify your email to continue</p>
                    <div className="input-group">
                        <input type="number" placeholder="OTP"
                            className="input-field"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <FaEnvelope className="input-icon" />
                    </div>
                    <button type="submit" className="verify-button">Verify</button>
                </div>
            </form>
            <p className="footer-text">© 2025 KV Login Form. All rights reserved | Design by <a href="#" className="footer-link">Sajitha Bandara</a></p>
        </div>
    )
}
