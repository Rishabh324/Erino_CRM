import { useLocation, useNavigate } from "react-router-dom";
import { useScreen } from "../context/ScreenContext";
import { BiSolidContact } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { useEffect, useState } from "react";
import API from "../services/API";
import { toast } from "react-toastify";

const Sidebar = () => {
    const { isMobile, sidebarOpen } = useScreen();
    const navigate = useNavigate();
    const location = useLocation();
    const [contacts, setContacts] = useState([]);

    const getContacts = async () => {
        try{
            console.log("sdkjfkj")
            const response = await API.get('/contacts',
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            });
            
            if(response.data.status==="Success"){
                setContacts(response.data.data);
            }
        } catch(err){
            console.log(err);
            toast.error("Failed to fetch contacts");
        }
    }

    useEffect(()=>{
        getContacts()
    },[]);

    return (
        <div className={`${isMobile && !sidebarOpen ? "hidden": ""} ${isMobile && sidebarOpen ? "absolute lay w-6/12": ""} min-w-fit w-4/12 p-6 bg-blue-200`}>
            <div className="flex justify-between items-center gap-16">
                <h1 className="text-2xl font-semibold flex items-center gap-1"><BiSolidContact className="text-4xl"/>Contacts</h1>
                <button className="px-4 py-1 bg-green-500 rounded-lg border-2 border-black flex items-center gap-1" onClick={()=>navigate('/add-contact')}><IoMdContacts className="text-xl"/>New</button>
            </div>
            <div className={`flex flex-col ${contacts.length>0 ? "" : "justify-around"} h-[82vh] overflow-y-scroll my-2`}>
                {
                    contacts.length>0 ? (contacts?.map((it, index) => (
                        <div key={index} className="flex items-center gap-4 border-gray-400 border-b p-2 cursor-pointer" onClick={()=>navigate(`/contacts/${it._id}`,{
                            state: it
                        })}>
                            <p className="rounded-full border-2 text-white bg-blue-500 text-2xl border-blue-700 w-fit px-4 py-2">{it.firstName[0]}</p>
                            <div className="text-lg">
                                <p>{it.firstName + ' ' + it.lastName}</p>
                                <p>{it.phone}</p>
                            </div>
                        </div>
                    ))) : <p className="text-lg text-center">No contacts found</p>
                }
            </div>
        </div>
    )
}

export default Sidebar;