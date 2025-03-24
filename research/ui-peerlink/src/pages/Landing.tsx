import { useState } from "react";
import GlobalNavbar from "../components/GlobalNavbar";
import CustomOverlay from "@/components/CustomOverlay";

export default function Landing() {
    const [overlayOpen, setOverlayOpen] = useState(false);
    
    return (
        <>
            <GlobalNavbar />

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="sm:text-5xl text-3xl font-medium title-font text-gray-900 mb-4">PeerLink</h1>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug.</p>
                        <div className="flex mt-6 justify-center">
                            <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                        </div>
                    </div>
                    <button onClick={() => setOverlayOpen(true)} className="flex mx-auto mt-8 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Get Started</button>
                </div>
            </section>
            {overlayOpen && (<CustomOverlay onClose={() => setOverlayOpen(false)} />)}
        </>
    )
}