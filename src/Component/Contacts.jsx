import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const getContacts = async() => {
        const {data} = await axios.get('http://localhost:3000/contacts');
        setContacts(data)
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'bg-green-800 rounded-xl text-white px-5 py-2',
          cancelButton: 'bg-red-800 rounded-xl mr-3 text-white px-5 py-2'
        },
        buttonsStyling: false
      })

    const apiDeletecontact = async(id) => {
        
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then(async(result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )

            const {data} = await axios.delete(`http://localhost:3000/contacts/${id}`);
            console.log(data);
            getContacts();
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
    }

    useEffect(() => {
        getContacts();
    }, [])

  return (
    <>
        <Link to={'/create'}>
            <button className=' text-white bg-gray-800 px-5 py-2 rounded my-5'>Create New Contact</button>
        </Link>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                            Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Emial Address
                        </th>
                        <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                            Phone Number
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contacts?.map((contact) => (
                        <tr key={contact.id} className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {contact.name}
                            </th>
                            <td className="py-4 px-6">
                                {contact.email}
                            </td>
                            <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                                {contact.phone}
                            </td>
                            <td className="py-4 px-6 flex gap-3">
                                <Link to={`/edit/${contact.id}`}>
                                    <AiFillEdit className=' text-xl text-green-600 cursor-pointer'/>
                                </Link>
                                <AiFillDelete onClick={() => apiDeletecontact(contact.id)} className=' text-xl text-red-600 cursor-pointer'/>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </>
  )
}

export default Contacts