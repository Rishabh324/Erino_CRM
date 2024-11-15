import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";

const Header = () => {

  const logoutHandler = () => {
    localStorage.clear();
    toast.success("Logout Successful.");
  }
  
  return (
    <div className="bg-blue-400 font-bold w-[100vw] flex flex-row items-center justify-between p-4">
      <div>
        <h1 className="text-center text-3xl ">Erino&apos;s CRM</h1>
      </div>
      <Link to='/login' className="px-4 py-2 bg-red-500 rounded-lg border-black border-2 flex items-center gap-2" onClick={logoutHandler}><MdLogout className="text-2xl"/>Logout</Link>
    </div>
  )
}

export default Header