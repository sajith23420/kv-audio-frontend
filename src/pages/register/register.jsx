import toast from "react-hot-toast";
import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        <div className="bg-picture h-screen flex items-center justify-center">
            <form onSubmit={handleOnSubmit}>
                <div className="register-container">
                    <img src="/logo.png" alt="logo" className="w-[150px] h-[150px] object-cover" />

                    <input
                        type="text"
                        placeholder="First Name"
                        className="input-style"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        className="input-style"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="input-style"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="input-style"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        className="input-style"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Phone"
                        className="input-style"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <button className="submit-button">Register</button>
                </div>
            </form>
        </div>
    );
}
