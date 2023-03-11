import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

const UserEdit = () => {
    const [data, setData] = useState({name:"",department:"",year:""})  
    const { id,username } = useParams()
    const Navigate=useNavigate()
    // console.log(id)
    const API = `http://localhost:4000/api/students/${id}`
    const callApi = async (url) => {
        const res = await fetch(url)
        const result = await res.json()
        setData(result)
    }
    // console.log(data);
    useEffect(() => {
        callApi(API)
    }, [])

  const onChange=(e)=>{
    const {name,value}=e.target
    setData({...data,[name]:value})
  }
  
  const Submit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:4000/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const result = await res.json()
     if(result.message==="succcess"){
        Navigate(`/useritem/${username}/${id}`)
     }
    } catch (error) {
      console.log(error)
    }
  }
    return (
        <>
            <form onSubmit={Submit}>
                <input type="text" name='name' value={data.name} onChange={onChange}/>
                <input type="text" name='department' value={data.department} onChange={onChange}/>
                <input type="text" name='year' value={data.year} onChange={onChange}/>
                <button>Update!</button>
            </form>
        </>
    )
}

export default UserEdit