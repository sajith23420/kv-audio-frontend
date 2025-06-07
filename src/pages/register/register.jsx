import toast from "react-hot-toast";
import "./register.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaAddressBook } from 'react-icons/fa'; // Import icons

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log({
            firstName,
            lastName,
            email,
            password,
            address,
            phone
        });
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            address: address,
            phone: phone

        }).then(() => {
            toast.success("Registration Success");
            navigate("/login");
        }).catch((err) => {
            toast.error(err?.response?.data?.error || "An error occurred");
        });
    }


    return (
        <div className="bg-picture">
            <form onSubmit={handleOnSubmit} className="register-form">
                <div className="form-container">
                    <h2 className="form-title">Sign Up</h2>

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="input-field"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <FaUser className="input-icon" />
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="input-field"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <FaUser className="input-icon" />
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FaEnvelope className="input-icon" />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className="input-icon" />
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Address"
                            className="input-field"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <FaAddressBook className="input-icon" />
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Phone"
                            className="input-field"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <FaPhone className="input-icon" />
                    </div>

                    <p className="register-text">Already have an account? <Link to="/login" className="register-link">Login here</Link></p>

                    <button type="submit" className="login-button">Register</button>
                </div>
            </form>
            <p className="footer-text">© 2025 KV Register Form. All rights reserved | Design by <a href="#" className="footer-link">Sajitha Bandara</a></p>
        </div>
    );
}
