import { APIAuthenticated } from 'http'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateTsqPp } from 'store/productsSlice'
import { updateProductStatus } from 'store/productsSlice'
// import { updatePaymentStatus } from 'store/productSlice'
// import {}


const Singleproduct = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {products} = useSelector((state)=>state.products)
    const [orders,setOrders] = useState([])

    const [filteredproduct] = products?.filter((product)=>product._id === id)
    

    const [productStatus,setproductStatus] = useState(filteredproduct?.productStatus)
    // const [paymentStatus,setPaymentStatus] = useState(filteredproduct?.paymentDetails.status)
    const handleProductStatus = (e)=>{
        setproductStatus(e.target.value)

        dispatch(updateProductStatus(id,e.target.value))
    }

//     const handlePaymentStatus = (e)=>{
//       setPaymentStatus(e.target.value)

//       dispatch(updatePaymentStatus(id,e.target.value))
//   }
    const handleChange = (value,name)=>{
        let data = {};
        if(name=='pp'){
            data.productPrice = value 
        }else{
            data.productStockQty = value
        }
        dispatch(updateTsqPp(id,data))
    }
    


    const deleteproduct = async()=>{
        try {
          const response = await APIAuthenticated.delete("/admin/products/" + id)
        
          if(response.status == 200){
              navigate("/admin/products")
          }
        } catch (error) {
          console.log(error)      
        }
      }
      const fetchProductOrders = async()=>{
        const response = await APIAuthenticated.get(`/products/productOrders/${id}`)
        if(response.status === 200){
          setOrders(response.data.data)
        }
      }

      useEffect(()=>{
        fetchProductOrders()
      },[])
      console.log(orders)
  return (
    <div className="py-20 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
    
      <div className="flex justify-start item-start space-y-5 flex-col">
        <h1 className="text-1xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-600">product {id}</h1>
        <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{new Date(filteredproduct.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">My product</p>
 
                <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                <div className="pb-4 md:pb-8 w-full md:w-40">
                  <img className="w-full hidden md:block" src={filteredproduct?.productImage} alt="dress" />
                  <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
                </div>
                <div className="bproduct-b bproduct-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{filteredproduct?.productName}</h3>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base dark:text-white xl:text-lg leading-6">Rs. {filteredproduct.productPrice} </p>
                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">TSQ: {filteredproduct.productStockQty}</p>
                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Status: {filteredproduct.productStatus}</p>
                  </div>
                </div>
              </div>
      

          </div>

    <div   className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Orders</p>
            {orders.length > 0 && orders.map((order)=>{
  return (
                <div key={order._id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
  
                <div className="bproduct-b bproduct-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className=" dark:text-white  ">{order?._id}</h3>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base dark:text-white xl:text-lg leading-6"> {order?.orderStatus} </p>
                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{order?.shippingAddress}</p>
                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{order?.phoneNumber}</p>
                  </div>
                </div>
              </div>
      

      )
    })}
          </div>

    
        </div>

    
        <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-2 md:p-1 xl:p-8 flex-col" style={{height:'200px'}}>
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Update</h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
      
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          
              <div className="flex w-full justify-center items-center md:justify-start md:items-start">
     
          
         <div style={{display:'flex',flexDirection:'column',padding:'18px'}}>
         <div>
           <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select product Status</label>
            <select id="countries" class="bg-gray-50 bproduct bproduct-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:bproduct-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:bproduct-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:bproduct-blue-500" onChange={handleProductStatus} >
            {/* <option value={filteredproduct?.productStatus}>{filteredproduct?.productStatus}</option> */}
            <option value="available">available</option>
            <option value="unavailable">unavailable</option>
      
            </select>
           </div>

            <div>
           <div style={{display:'flex',width:'150%',justifyContent:'space-between'}}>
       <div>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Update TSQ</label>
            <input type="number" name="tsq" id="tsq" min={0} max={500} style={{padding : '0 15px'}} value={filteredproduct.productStockQty} onChange={(e)=>handleChange(e.target.value,'tsq')}/>
       </div>
            <div>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Update Price</label>
            <input type="number" name="productPrice" id="productPrice" min={0} max={500} style={{padding : '0 15px'}} value={filteredproduct.productPrice} onChange={(e)=>handleChange(e.target.value,'pp')}/>
            </div>
           </div>
            </div>
         </div>

              </div>
              {
                filteredproduct?.productStatus !== 'cancelled' && (
              <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                <button className="mt-6 md:mt-0 dark:bproduct-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bproduct bproduct-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800" style={{marginTop:'10px',backgroundColor:'red',color:'white'}} onClick={deleteproduct} >Delete product</button>
    
              </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Singleproduct