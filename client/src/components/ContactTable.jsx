import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../services/API';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import { IoMdContacts } from "react-icons/io";

const ContactTable = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const { page } = useParams();
    const [currentPage, setCurrentPage] = useState(Number(page) || 1);
    const dataPerPage = 7;
    const firstIndex = (currentPage - 1) * dataPerPage;
    let data = contacts;
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

    let totalPages = Math.ceil(contacts?.length / dataPerPage || 1);

    data = data.slice(firstIndex, firstIndex + dataPerPage);

    const prePage = () => {
        if (currentPage > 1) {
        navigate(`/page/${currentPage - 1}`);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
        navigate(`/page/${currentPage + 1}`);
        }
    };

    const handleDelete = async (id) => {
        try{
          const response = await API.delete(`/contacts/${id}`);
          if(response.data.status === "Success") {
            toast.success("Contact deleted successfully");
            getContacts();
          } else{
            toast.error("Failed to delete contact");
          }
        } catch (err){
          console.log(err);
        }
      }

    useEffect(() => {
        setCurrentPage(Number(page) || 1);
    }, [page]);

    useEffect(() => {
        getContacts();
    },[]);

    return (
        <div className='p-6'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-semibold'>Contacts Table</h1>
                <button 
                    className='px-4 py-2 bg-blue-500 border-2 border-black rounded-lg flex items-center gap-2' 
                    onClick={()=>
                        navigate('/add-contact')
                }>
                    <IoMdContacts className='text-xl'/>Add Contact
                </button>
            </div>
            <div className="border-gray-200 w-full border-2 p-2 rounded-md relative h-[calc(100vh-11.5rem)] mt-4">
                <div className="grid grid-cols-11 gap-1">
                    <div className="border-[#B9C0D0] rounded-tl-xl p-4 font-bold text-[#1C66AC] bg-[#E0F0FF]">
                        Actions
                    </div>
                    <div className="border-[#B9C0D0] p-4 font-bold text-[#1C66AC] bg-[#E0F0FF]">
                        First Name
                    </div>
                    <div className="border-[#B9C0D0] p-4 font-bold text-[#1C66AC] bg-[#E0F0FF]">
                        Last Name
                    </div>
                    <div className="border-[#B9C0D0] p-4 col-span-2 font-bold text-[#1C66AC] bg-[#E0F0FF]">
                        Email
                    </div>
                    <div className="border-[#B9C0D0] p-4 col-span-2 font-bold text-[#1C66AC] bg-[#E0F0FF]">
                        Phone
                    </div>
                    <div className="border-[#B9C0D0] p-4 col-span-2 font-bold text-[#1C66AC] bg-[#E0F0FF]">
                        Company
                    </div>
                    <div className="border-[#B9C0D0] p-4 col-span-2 font-bold text-[#1C66AC] bg-[#E0F0FF] rounded-tr-xl">
                        Job Title
                    </div>
                </div>

                <div className="bg-white">
                    {data?.length > 0 ? (
                    data?.map((item, id) => (
                        <div
                        key={id}
                        className="border-2 border-gray-300 rounded-md my-2 py-2 bg-white shadow-sm"
                        >
                        <div className="grid grid-cols-11 gap-1">
                            <div className="px-4 flex justify-evenly items-center">
                                <MdDelete className="cursor-pointer text-lg" onClick={()=>handleDelete(item._id)} />
                                <FaPenToSquare 
                                    className="cursor-pointer text-lg" 
                                    onClick={() => navigate(`/edit-contact/${item._id}`, { state: item })} 
                                />
                            </div>
                            <div className="px-4">{item.firstName}</div>
                            <div className="px-4">{item.lastName}</div>
                            <div className="px-4 col-span-2">{item.email}</div>
                            <div className="px-4 col-span-2">{item.phone}</div>
                            <div className="px-4 col-span-2">{item.company}</div>
                            <div className="px-4 col-span-2">{item.jobTitle}</div>
                        </div>
                        </div>
                    ))
                    ) : (
                    <div className="border-2 border-gray-400 rounded-lg my-2 p-4 bg-white shadow-lg text-center">
                        No data available
                    </div>
                    )}
                </div>
                <div className="flex items-center p-4 rounded-lg bg-[#F6F6F6] justify-between w-full absolute bottom-2">
                    <div></div>
                    <div className="flex">
                    <button
                        className={`mr-2 border bg-white text-black px-4 py-2 rounded-md ${
                            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={prePage}
                        disabled={currentPage === 1}
                    >
                        <FaArrowLeft />
                    </button>
                    {[...Array(totalPages).keys()].map((pageIndex) => (
                        <Link
                        key={pageIndex}
                        to={`/manage-branches/${pageIndex + 1}`}
                        className={`${
                            currentPage === pageIndex + 1
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500 hover:bg-blue-100"
                            } px-4 py-2 rounded-md transition-colors mx-1`}
                        >
                        {pageIndex + 1}
                        </Link>
                    ))}
                    <button
                        className={`ml-2 border bg-white text-black px-4 py-2 rounded-md ${
                            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                    >
                        <FaArrowRight />
                    </button>
                    <div className="ml-6">
                        <select
                            className="border-2 border-gray-400 rounded-md p-2 w-20 text-center"
                            value={currentPage}
                            onChange={(e) => setCurrentPage(e.target.value)}
                            >
                            {[...Array(totalPages).keys()].map((pageIndex) => (
                                <option key={pageIndex} value={pageIndex + 1}>
                                {pageIndex + 1}
                                </option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="border-2 border-black p-2 bg-white rounded-md">
                            Total Records: {data.length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactTable