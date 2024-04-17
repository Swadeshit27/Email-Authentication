import React, { useState } from "react";
import { navItems } from "../utils/NavItems";
import { Link } from "react-router-dom";
import {
    FaDribbble,
    FaFacebookF,
    FaInstagram,
    FaMagnifyingGlass,
    FaPinterest,
    FaTwitter,
} from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { useAppSelector } from "../redux/store";

const Navbar: React.FC = () => {
    const [menu, setMenu] = useState(false);
    const { photo } = useAppSelector(state => state.User.user);
    return (
        <>
            <section className="w-full h-20 bg-white border-b">
                <nav className="w-full h-full max-w-screen-xl mx-auto px-4 xs:px-8 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <Link
                            to={"/"}
                            className="text-3xl font-bold font-dancing text-pink_1 "
                        >
                            dribble
                        </Link>
                        {navItems.map((item) => (
                            <Link
                                to={item.path}
                                className="text-gray-600 capitalize max-lg:hidden"
                                key={item.name}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 w-48 h-10 rounded-md flex items-center px-2">
                            <FaMagnifyingGlass size={16} className="min-w-6 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="px-2 bg-transparent placeholder:text-gray-400 outline-none w-40"
                            />
                        </div>
                        <img
                            src={photo.url ? photo.url : "https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg"}
                            alt="person"
                            className="w-10 h-10 rounded-full object-cover"
                            onClick={() => setMenu(true)}
                        />
                        <button className="w-28 rounded-md text-center text-white bg-pink_1 py-2.5 max-xl:hidden">
                            Upload
                        </button>
                    </div>
                </nav>
            </section>
            <section
                className={`w-full h-screen fixed left-0 top-0 bg-[#0000008c] transition-all duration-500 ease-linear z-[9999] ${menu ? "-translate-x-0 opacity-1" : " opacity-0 -translate-x-[100%]"
                    }`}
            >
                <aside
                    className={`w-3/4 bg-white h-full p-8 transition-all duration-500 ease-linear  ${menu ? "-translate-x-0" : "-translate-x-[100%]"
                        }`}
                >
                    <div className="flex items-center justify-between mb-8">
                        <Link
                            to={"/"}
                            className="text-3xl font-bold font-dancing text-pink_1 "
                        >
                            dribble
                        </Link>
                        <RxCross1
                            size={20}
                            className="text-gray-600 w-5"
                            onClick={() => setMenu(false)}
                        />
                    </div>
                    <div className=" space-y-3 text-lg">
                        {navItems.map((item) => (
                            <Link
                                to={item.path}
                                className="block text-gray-600 capitalize"
                                key={item.name}
                                onClick={() => setMenu(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link to={"/profile"} className="block text-gray-600 capitalize">
                            Profile
                        </Link>
                    </div>

                    <h1 className="font-medium text-gray-600 mt-8 mb-4">Follow us on</h1>
                    <div className="flex items-center space-x-5 text-gray-600 text-xl">
                        <Link to={"/"}>
                            <FaDribbble />
                        </Link>
                        <Link to={"/"}>
                            <FaTwitter />
                        </Link>
                        <Link to={"/"}>
                            <FaFacebookF />
                        </Link>
                        <Link to={"/"}>
                            <FaInstagram />
                        </Link>
                        <Link to={"/"}>
                            <FaPinterest />
                        </Link>
                    </div>
                </aside>
            </section>
        </>
    );
};

export default Navbar;
