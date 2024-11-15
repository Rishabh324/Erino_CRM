import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/API";
import { toast } from "react-toastify";

const Contact = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  console.log(state);
  const handleDelete = async () => {
    try{
      const response = await API.delete(`/contacts/${state._id}`);
      if(response.data.status === "Success") {
        toast.success("Contact deleted successfully");
        navigate('/');
      } else{
        toast.error("Failed to delete contact");
      }
    } catch (err){
      console.log(err);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">Contact Details</h1>
      <div className="mt-4">
        <div className="flex justify-between border-b border-blue-600">
          <div className="flex gap-2 items-center py-2">
            <p className="rounded-full border-2 text-white bg-blue-500 text-2xl border-blue-700 w-fit px-6 py-4">{state.firstName[0] || state.lastName[0]}</p>
            <div>
              <p className="text-2xl font-medium">{state.firstName + ' ' + state.lastName}</p>
              <p className="text-lg text-gray-700">{state.jobTitle}</p>
            </div>
          </div>
          <div className="flex gap-10 items-center">
            <button className="px-4 py-2 bg-blue-500 rounded-lg border-black border-2 flex items-center gap-2" onClick={()=>navigate(`/edit-contact/${state._id}`,{state})}><MdEdit className="text-2xl"/>Edit</button>
            <button className="px-4 py-2 bg-red-500 rounded-lg border-black border-2 flex items-center gap-2" onClick={handleDelete}><MdDelete className="text-2xl"/>Delete</button>
          </div>
        </div>
        <div className="p-3 text-xl">
          <div className="flex gap-3 items-center">
            <p className="my-2 font-semibold">First Name:</p>
            <p>{state.firstName}</p>
          </div>
          <div className="flex gap-3 items-center">
            <p className="my-2 font-semibold">Last Name:</p>
            <p>{state.lastName}</p>
          </div>
          <div className="flex gap-3 items-center">
            <p className="my-2 font-semibold">Job title:</p>
            <p>{state.jobTitle}</p>
          </div>
          <div className="flex gap-3 items-center">
            <p className="my-2 font-semibold">Email:</p>
            <p>{state.email}</p>
          </div>
          <div className="flex gap-3 items-center">
            <p className="my-2 font-semibold">Phone No:</p>
            <p>{state.phone}</p>
          </div>
          <div className="flex gap-3 items-center">
            <p className="my-2 font-semibold">Company:</p>
            <p>{state.company}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact