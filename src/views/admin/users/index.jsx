import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {useNavigate} from 'react-router-dom'

import { fetchUser,deleteUser } from 'store/userSlice'

const Myusers = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {users} = useSelector((state)=>state.users)
    
    const [searchTerm,setSearchTerm] = useState('')
    const [date,setDate] = useState('')
    const deleteUserId =  (userId) =>{
  
        dispatch(deleteUser(userId))
    }
  
    useEffect(()=>{
        dispatch(fetchUser())
    },[])


    // const filteredusers = selectedItem === "all" ? users : users.filter((user)=>user.userstatus === selectedItem)
    const filteredusers = users?.filter((user)=>
    user._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) 

    )
    .filter((user)=>date === "" || new Date(user.createdAt).toLocaleDateString() === new Date(date).toLocaleDateString() )
    
  return (
  
<div className="antialiased font-sans bg-gray-200 pt-20">
    <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
            <div>
                <h2 className="text-2xl font-semibold leading-tight">Users</h2>
            </div>
            <div className="my-2 flex sm:flex-row flex-col">
                <div className="block relative">
                    <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                            <path
                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                        </svg>
                    </span>
                    <input placeholder="Search"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none buser buser-gray-400 buser-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
                <div className="block relative">
                
                    <input placeholder="Search"
                    type='date'
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none buser buser-gray-400 buser-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 buser-b-2 buser-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Id
                                </th>
                     
                                <th
                                    className="px-5 py-3 buser-b-2 buser-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th
                                    className="px-5 py-3 buser-b-2 buser-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    PhoneNumber
                                </th>
                                <th
                                    className="px-5 py-3 buser-b-2 buser-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                   UserName
                                </th>
                                <th
                                    className="px-5 py-3 buser-b-2 buser-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Registered At
                                </th>
                                <th
                                    className="px-5 py-3 buser-b-2 buser-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                           filteredusers && filteredusers.length > 0 && filteredusers.map((user)=>{
                                return (
                                    <tr key={user._id}>
                                    {/* <td className="px-5 py-5 buser-b buser-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 w-10 h-10">
                                                <img className="w-full h-full rounded-full"
                                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                    alt="" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {user.userName}
                                                </p>
                                            </div>
                                        </div>
                                    </td> */}
                                       <td className="px-5 py-5 buser-b buser-gray-200 bg-white text-sm">
                                        <p onClick={()=>navigate(`/myusers/${user._id}`)} className="text-blue-900 whitespace-no-wrap" style={{textDecoration:'underline'}} >{user._id}</p>
                                    </td>
                                    <td className="px-5 py-5 buser-b buser-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{user.userEmail}</p>
                                    </td>
                                    <td className="px-5 py-5 buser-b buser-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                           {user.userPhoneNumber}
                                        </p>
                                    </td>
                               
                                    <td className="px-5 py-5 buser-b buser-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                           {user.userName}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 buser-b buser-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{new Date(user.createdAt).toLocaleDateString()}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button onClick={()=>deleteUserId(user._id)}  className="text-gray-900 whitespace-no-wrap bg-red-400 p-2">Delete</button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                
                        </tbody>
                    </table>
                    <div
                        className="px-5 py-5 bg-white buser-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span className="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                            <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
                            <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Myusers