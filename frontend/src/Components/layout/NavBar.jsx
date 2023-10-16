import {React, useRef} from 'react'
import "./NavBar.css"
// logo imports 
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function NavBar() {
    const navigate = useNavigate();
    const searchRef = useRef();
    const searchProduct = () => {
        navigate(`/search/${searchRef.current.value}`);
    }

  return (
    <nav className='g-fonts NavBar flex flex-col  text-white justify-between'>
        <div className='logo-container mx-3  flex flex-col items-center'>
                {/* logo  */}
            <div className=' my-3'>
                <Link to="/">
                    <img src="\images\clothingGuru_logo.png" alt="" width={"100rem"}/>
                </Link>
            </div>
            {/* contact logo with number  */}
            <div className='flex justify-center content-center text-center text-xs theme-color'>
            <BsFillTelephoneFill className='mt-1 mr-1' /><a className='underline-animation' href="">+91 9100000000</a>
            </div>
            {/* cart  logo */}
            <div className=' mt-8'>
                <div className=' w-16 h-20 bg-white flex justify-center items-center'>
                    <RiShoppingBag3Fill className='cart-logo-container ' size={"50px"}/>
                </div>
            </div>
        </div>
        <div>
            <ul className=' Nav-items flex flex-col items-center uppercase text-2xl tracking-wide'>
                <li className='underline-animation'><Link to={"/"}>Home</Link></li>
                <li className='underline-animation'><Link >About</Link></li>
                <li className='underline-animation'><Link href="/">Services</Link></li>
                <li className='underline-animation'><Link href="/">Contact</Link></li>
            </ul>
        </div>
        <div >
            <div className='flex justify-center items-center ' ><input  className='search mx-auto w-9/12' type="text" placeholder='Search' ref={searchRef}/> <BiSearchAlt2 className='mr-3 cursor-pointer'  size={"25px"} onClick={searchProduct}/></div>
        </div>
        <div className='mb-6 uppercase text-center'>
            <a href="">2023 &#169; copyright by All rights resarved</a>
        </div>

    </nav>
  )
}

export default NavBar
