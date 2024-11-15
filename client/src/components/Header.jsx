import { useScreen } from "../context/ScreenContext";
import { BiMenu } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdContact } from "react-icons/io";
import { MdLogout } from "react-icons/md";

const Header = () => {
  const { isMobile, toggleSidebar, sidebarOpen } = useScreen();

  const logoutHandler = () => {
    localStorage.clear();
    toast.success("Logout Successful.");
}
  
  return (
    <div className="bg-blue-400 font-bold w-[100vw] flex flex-row items-center justify-between px-8 py-4">
      {isMobile ? (
        <div>
          {sidebarOpen ? <ImCross className="text-2xl text-white pl-2 cursor-pointer" onClick={toggleSidebar} /> : <BiMenu className="text-3xl text-white cursor-pointer" onClick={toggleSidebar} />}
        </div>
      ) : null}
      <div>
        <h1 className="text-center text-3xl ">Erino&apos;s CRM</h1>
      </div>
      {isMobile ? <div></div> : null}
      <div className="flex gap-10">
        <Link to='/' className="px-4 py-2 bg-blue-500 rounded-lg border-black border-2 flex items-center gap-2"><IoMdContact className="text-2xl"/>Profile</Link>
        <Link to='/login' className="px-4 py-2 bg-red-500 rounded-lg border-black border-2 flex items-center gap-2" onClick={logoutHandler}><MdLogout className="text-2xl"/>Logout</Link>
      </div>
    </div>
  )
}

export default Header