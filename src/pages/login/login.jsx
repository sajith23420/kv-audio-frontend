import axios from "axios"
import "./login.css"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, Link } from "react-router-dom"
import { useGoogleLogin } from "@react-oauth/google"
import { FaUser, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc'; // Import Google icon

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const googleLogin = useGoogleLogin(
        {
            onSuccess: (res) => {
                console.log(res)
                axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`, {
                    accessToken: res.access_token
                }).then((res) => {
                    console.log(res)
                    toast.success("Login Success")
                    const user = res.data.user
                    localStorage.setItem("token", res.data.token)
                    if (user.role === "admin") {
                        navigate("/admin/")
                    } else {
                        navigate("/")
                    }
                }).catch((err) => {
                    console.log(err)
                    toast.error(err.response.data.error)
                })
            }
        }
    )


    function handleOnSubmit(e) {
        e.preventDefault()
        console.log(email, password)

        const backendUrl = import.meta.env.VITE_BACKEND_URL


        axios.post(`${backendUrl}/api/users/login`, {
            email: email,
            password: password
        }
        ).then((res) => {
            console.log(res)
            toast.success("Login Success")
            const user = res.data.user

            localStorage.setItem("token", res.data.token)

            if (user.emailVerified == false) {
                navigate("/verify-email")
                return
            }


            if (user.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/")
            }

        }).catch((err) => {
            console.log(err)
            toast.error(err.response.data.error)
        })
    }




    return (
        <div className="bg-picture">
            <form onSubmit={handleOnSubmit} className="login-form">
                <div className="form-container">
                    <h2 className="form-title">Sign In</h2>

                    <div className="input-group">
                        <input type="email" placeholder="Customer number or username"
                            className="input-field"
                            value={email}
                            onChange={
                                (e) => {
                                    setEmail(e.target.value)
                                }}
                        />
                        <FaUser className="input-icon" />
                    </div>

                    <div className="input-group">
                        <input type="password" placeholder="Password"
                            className="input-field"
                            value={password}
                            onChange={
                                (e) => {
                                    setPassword(e.target.value)
                                }}
                        />
                        <FaLock className="input-icon" />
                    </div>

                    <p className="register-text">Are you new to eBanking? <Link to="/register" className="register-link">Register here</Link></p>

                    <button type="submit" className="login-button">LOGIN</button>

                    <button className="login-button google-login-button" onClick={googleLogin}>
                        <FcGoogle style={{ marginLeft: '-6px', fontSize: '1.3em' }} /> Login with Google
                    </button>
                </div>
            </form>
            <p className="footer-text">© 2025 KV Login Form. All rights reserved | Design by <a href="#" className="footer-link">Sajitha Bandara</a></p>
        </div>
    )
}
