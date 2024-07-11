import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useTypedSelectors";
import { FaHome, FaInfoCircle, FaBlog, FaImages, FaEnvelope, FaUser } from "react-icons/fa";

export const NavbarToggleDiv = () => {
    const userId = useAppSelector(state => state.user.user?._id);

    return (
        <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            transition={{ duration: 0.5 }}
            className="navbar-toggle-div absolute top-[10vh] right-5 bg-gray-800 w-64 rounded-bl-lg shadow-lg overflow-hidden block md:hidden"
        >
            <ul className="flex flex-col items-start justify-center w-full">
                <NavItem to="/home" icon={<FaHome />} text="Home" />
                <NavItem to="/about" icon={<FaInfoCircle />} text="About" />
                <NavItem to="/blog" icon={<FaBlog />} text="Blog" />
                <NavItem to="/gallery" icon={<FaImages />} text="Gallery" />
                <NavItem to="/contact" icon={<FaEnvelope />} text="Contact" />
                <NavItem to={`/profile/${userId}`} icon={<FaUser />} text="Profile" />
            </ul>
        </motion.div>
    );
};

const NavItem = ({ to, icon, text } :{to:string, icon: JSX.Element, text: string}) => (
    <li className="w-full">
        <Link 
            to={to} 
            className="flex items-center py-3 px-4 text-white hover:bg-gray-700 transition-colors duration-200"
        >
            <span className="mr-3 text-lg">{icon}</span>
            <span>{text}</span>
        </Link>
    </li>
);