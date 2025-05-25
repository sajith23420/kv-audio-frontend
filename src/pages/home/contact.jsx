export default function Contact() {
    return (
        <div className="relative min-h-screen bg-cover bg-center py-12" style={{ backgroundImage: "url('/audio1.jpg')" }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-20">
                {/* Contact Form */}
                <div className="bg-white/10 backdrop-blur-md text-white p-8 rounded-xl shadow-lg w-full md:w-1/2 max-w-lg">
                    <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
                    <form className="space-y-4">
                        <input type="text" placeholder="Name" className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white focus:outline-none" />
                        <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white focus:outline-none" />
                        <textarea rows="4" placeholder="Message" className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white focus:outline-none" />
                        <button type="submit" className="w-full bg-white text-[#4B3F97] font-semibold py-2 rounded hover:bg-gray-200 transition">Send Message</button>
                    </form>
                </div>

                {/* Google Map */}
                <div className="w-full md:w-1/2 max-w-lg h-[400px] rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="KV Audio Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.586212014973!2d106.6601726152411!3d10.76262249233112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef51f763a1b%3A0xf4e9e8e04b12f028!2sDistrict%201%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1610000000000"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
