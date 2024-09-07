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
        <div className="bg-[#FEFEFE] min-h-[50vh] flex items-center justify-center" >

            <ul className="footer-container flex justify-evenly w-full flex-wrap">
                <li className="w-[fit-content] flex items-center pl-5">
                    <img src="/images/matriim-01.png" alt="" className="size-[7rem] md:md:size-[8rem]"/>
                </li>
                <li className="pt-8">
                    <h1 className="text-[#000] text-lg py-6 font-semibold">Connect to us</h1>
                    <ul className="social-media-links text-[#000] flex flex-col gap-2 justify-center">
                        <li className="text-lg flex gap-6">
                            <FaFacebookSquare />
                            <FaInstagram />
                            <FaYoutube />
                            <FaSquareXTwitter />
                        </li>

                        <li className="text-[#000] text-sm flex flex-col">
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
                    <h1 className="text-[#000] text-sm py-6 font-semibold">Information</h1>
                    <ul className="information-links text-[#000] flex flex-col gap-2 justify-center">
                        <li className="text-[#000] text-sm flex flex-col">
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
                    <h1 className="text-[#000] text-sm py-6 font-semibold">Help & Support</h1>
                    <ul className="Help-support-links text-[#000] flex flex-col gap-2 justify-center">
                        <li className="text-[#000] text-sm flex flex-col">
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

                <li className="pt-8">
                    <h1 className="text-[#000] text-sm py-6 font-semibold">Testimonials</h1>
                    <ul className="testimonials-links text-[#000] flex flex-col gap-2 justify-center">
                        <li className="text-[#000] text-sm flex flex-col">
                            <a className="flex items-center pb-2">
                                Success stories
                            </a>

                            <a className="flex items-center py-2">
                                Happy families
                            </a>

                        </li> 
                    </ul>
                </li>

                <li className="mt-9 mb-10">
                    <h1 className="text-[#000] text-xs py-6 pb-12 font-semibold flex items-center gap-2">
                        <MdEmail/> Stay upto date on latest from MATRIFY
                    </h1>
                    <form action="#" className="flex flex-col gap-5">
                        <input type="text" className="px-5 py-3 text-xs rounded-lg outline-none bg-[#ecebeb]" placeholder="Enter email address"/>
                        <button className="subscribe-btn">SUBSCRIBE</button>
                    </form>
                </li>
            </ul>

        </div>
    )
}