import { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({
        email: "",
        name: "",
        address: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        try {
            const res = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
                credentials: "include"
            });
            if (!res.ok) throw new Error("Failed to send inquiry");
            setSuccess("Your inquiry has been sent successfully!");
            setForm({ email: "", name: "", address: "", message: "" });
        } catch (err) {
            setError("There was a problem sending your inquiry. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="relative w-full min-h-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/djman.jpg')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 z-0" />

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl mx-auto px-6 py-20 gap-12">
                {/* Left: Contact Info */}
                <div className="flex-1 flex flex-col justify-center text-white gap-10 min-w-[320px]">
                    <h1 className="text-5xl font-extrabold mb-2 tracking-tight">CONTACT US</h1>

                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-yellow-400 text-3xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.086c.51 0 .998.195 1.366.547l2.21 2.11a2.25 2.25 0 01.668 1.602v2.086a2.25 2.25 0 01-.668 1.602l-1.11 1.11a16.012 16.012 0 006.364 6.364l1.11-1.11a2.25 2.25 0 011.602-.668h2.086a2.25 2.25 0 012.25 2.25v2.086c0 1.243-1.007 2.25-2.25 2.25h-.75C6.477 21.75 2.25 17.523 2.25 12.75v-.75z" /></svg>
                        </span>
                        <div>
                            <div className="text-2xl font-bold">Call Us</div>
                            <div className="text-lg opacity-90">94 11 700 300, 94 11 700 400</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-yellow-400 text-3xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 21.092a1.125 1.125 0 01-1.724 0l-6.6-7.425A7.5 7.5 0 1119.5 9.75c0 2.485-1.12 4.71-2.938 6.167l-1.2 1.05a.75.75 0 01-1.05 0l-1.2-1.05A7.5 7.5 0 0112 21.75c0-.414.336-.75.75-.75h1.5c.414 0 .75.336.75.75z" /></svg>
                        </span>
                        <div>
                            <div className="text-2xl font-bold">Location</div>
                            <div className="text-lg opacity-90">121 Rock Sreet, 21 Avenue, Colombo , Sri Lanka</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-yellow-400 text-3xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </span>
                        <div>
                            <div className="text-2xl font-bold">Business Hours</div>
                            <div className="text-lg opacity-90">Mon – Fri ...... 10 am – 8 pm, Sat, Sun ....... Closed</div>
                        </div>
                    </div>
                </div>

                {/* Right: Contact Form */}
                <div className="flex-1 flex flex-col justify-center">
                    <form className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-10 w-full max-w-xl mx-auto text-white" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-lg font-semibold mb-2" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter a valid email address"
                                    className="w-full bg-transparent border-b-2 border-white focus:border-yellow-400 text-white placeholder-white py-2 px-1 outline-none"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-semibold mb-2" htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter Your Name"
                                    className="w-full bg-transparent border-b-2 border-white focus:border-yellow-400 text-white placeholder-white py-2 px-1 outline-none"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg font-semibold mb-2" htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Enter your address"
                                className="w-full bg-transparent border-b-2 border-white focus:border-yellow-400 text-white placeholder-white py-2 px-1 outline-none"
                                required
                                value={form.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-8">
                            <label className="block text-lg font-semibold mb-2" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="3"
                                placeholder="Enter your message"
                                className="w-full bg-transparent border-b-2 border-white focus:border-yellow-400 text-white placeholder-white py-2 px-1 outline-none resize-none"
                                required
                                value={form.message}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white text-xl font-semibold py-3 rounded-full transition disabled:opacity-60"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "SUBMIT"}
                        </button>
                        {success && <div className="text-green-300 text-center mt-4">{success}</div>}
                        {error && <div className="text-red-300 text-center mt-4">{error}</div>}
                    </form>
                </div>
            </div>
        </section>
    );
}
