import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../services/API';

const EditContact = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(location.state);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(formData);
      const response = await API.put(`/contacts/${formData._id}`, 
        formData,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      );
      if(response.data.status === "Success") {
        toast.success("Contact edited successfully");
        navigate('/');
      }
    } catch(err){
      toast.error("Failed to edit contact");
      console.log(err);
    }
  }

  return (
    <div>
      <div className='p-4'>
        <h1 className='text-3xl font-semibold'>Edit contact</h1>
        <div className='flex flex-col mt-4'>
          <label htmlFor='firstName' className='text-lg font-semibold'>First Name</label>
          <input type='text' id='firstName' value={formData.firstName} placeholder='Enter First Name' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='lastName' className='text-lg font-semibold'>Last Name</label>
          <input type='text' id='lastName' value={formData.lastName} placeholder='Enter Last Name' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='email' className='text-lg font-semibold'>Email</label>
          <input type='text' id='email' value={formData.email} placeholder='Enter email' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='phone' className='text-lg font-semibold'>Phone No</label>
          <input type='number' id='phone' value={formData.phone} placeholder='Enter phone number' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='company' className='text-lg font-semibold'>Company</label>
          <input type='text' id='company' value={formData.company} placeholder='Enter company' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='jobTitle' className='text-lg font-semibold'>Job Title</label>
          <input type='text' id='jobTitle' value={formData.jobTitle} placeholder='Enter job title' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex justify-center my-4'>
          <button className='bg-blue-400 text-white px-4 py-2 rounded-lg' onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default EditContact