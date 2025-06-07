import Footer from "../../components/Footer";

export default function About() {
    return (
        <>
            <section
                className="relative w-full min-h-full flex items-center justify-center bg-cover bg-center bg-no-repeat py-20"
                style={{ backgroundImage: "url('/djman.jpg')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/70 z-0" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center text-white max-w-4xl mx-auto px-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight drop-shadow-lg">About KV Audio</h1>
                    <p className="text-lg md:text-xl mb-8 leading-relaxed">
                        KV Audio is your premier partner for creating unforgettable events through exceptional sound and lighting experiences. With years of expertise in the industry, we specialize in providing top-tier audio and visual solutions tailored to meet the unique needs of any event, from intimate gatherings to large-scale celebrations.
                    </p>
                    <p className="text-lg md:text-xl mb-8 leading-relaxed">
                        Our commitment to excellence is reflected in our state-of-the-art equipment, professional service, and a dedicated team that ensures every detail is meticulously handled. We believe that great sound and captivating lighting are the heart of any successful event, and we strive to deliver an immersive atmosphere that leaves a lasting impression on your guests.
                    </p>
                    <p className="text-lg md:text-xl leading-relaxed">
                        At KV Audio, we are passionate about transforming your vision into a vibrant reality. Let us elevate your next event with our reliable gear and unparalleled technical support.
                    </p>
                </div>
            </section>
            <Footer />
        </>
    );
}
