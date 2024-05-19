import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import "./Footer.css";



export function Footer() {
    return (
        <div className="w-[100vw] bg-black min-h-[50vh] flex items-center" >

            <ul className="footer-container flex gap-12 flex-wrap">
                <li className="w-[fit-content] flex items-center">
                    <img src="/src/assets/images/MATRIFY-removebg-preview.png" alt="" className="h-[10rem] w-[10rem] md:h-[20rem] md:w-[20rem]"/>
                </li>
                <li className="pt-8">
                    <h1 className="text-[#b7b6b6] text-lg py-6 font-semibold">Connect to us</h1>
                    <ul className="social-media-links text-[#b7b6b6] flex flex-col gap-2 justify-center">
                        <li className="text-xl flex gap-6">
                            <FaFacebookSquare />
                            <FaInstagram />
                            <FaYoutube />
                            <FaSquareXTwitter />
                        </li>

                        <li className="text-[#b7b6b6] text-md flex flex-col">
                            <p className="flex items-center py-2">
                                <FaPhone /> &nbsp;+1(000)123 45611
                            </p>

                            <p className="flex items-center py-2">
                                <SiGmail /> &nbsp;matrify@gmail.com
                            </p>

                            <p className="flex items-center py-2">
                                <IoLocationSharp /> &nbsp;Kannur,Kerala,INDIA
                            </p>
                        </li> 
                    </ul>
                </li>
                <li className="pt-8">
                    <h1 className="text-[#b7b6b6] text-lg py-6 font-semibold">Information</h1>
                    <ul className="information-links text-[#b7b6b6] flex flex-col gap-2 justify-center">
                        <li className="text-[#b7b6b6] text-md flex flex-col">
                            <a className="flex items-center pb-2">
                                About us
                            </a>

                            <a className="flex items-center py-2">
                                Terms and Conditions
                            </a>

                            <a className="flex items-center py-2">
                                Payment options
                            </a>

                            <a className="flex items-center py-2">
                                Privacy Policy
                            </a>
                        </li> 
                    </ul>
                </li>

                <li className="pt-8">
                    <h1 className="text-[#b7b6b6] text-lg py-6 font-semibold">Help & Support</h1>
                    <ul className="Help-support-links text-[#b7b6b6] flex flex-col gap-2 justify-center">
                        <li className="text-[#b7b6b6] text-md flex flex-col">
                            <a className="flex items-center pb-2">
                                24x7 live support
                            </a>

                            <a className="flex items-center py-2">
                                Contact us
                            </a>

                            <a className="flex items-center py-2">
                                Feedbacks
                            </a>

                            <a className="flex items-center py-2">
                                FAQs
                            </a>
                        </li> 
                    </ul>
                </li>

                <li className="pt-8 flex-1">
                    <h1 className="text-[#b7b6b6] text-lg py-6 font-semibold">Testimonials</h1>
                    <ul className="testimonials-links text-[#b7b6b6] flex flex-col gap-2 justify-center">
                        <li className="text-[#b7b6b6] text-md flex flex-col">
                            <a className="flex items-center pb-2">
                                Success stories
                            </a>

                            <a className="flex items-center py-2">
                                Happy families
                            </a>

                        </li> 
                    </ul>
                </li>

                <li className="pt-8 mb-10 flex-1">
                    <h1 className="text-[#b7b6b6] text-xs py-6 pb-12 font-semibold flex items-center gap-2">
                        <MdEmail/> Stay upto date on latest from MATRIFY
                    </h1>
                    <form action="#" className="flex flex-col gap-5">
                        <input type="text" className="px-5 py-3 text-sm rounded-lg outline-none" placeholder="Enter email address"/>
                        <button className="subscribe-btn">SUBSCRIBE</button>
                    </form>
                </li>
            </ul>

        </div>
    )
}