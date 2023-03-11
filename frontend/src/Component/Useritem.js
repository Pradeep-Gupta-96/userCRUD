import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

const Useritem = () => {
  const [data, setData] = useState([])
  const Navigate = useNavigate()
  const { id,username } = useParams()
  // console.log(username)
  const API = `http://localhost:4000/api/students/${id}`
  const callApi = async (url) => {
    const res = await fetch(url)
    const result = await res.json()
    setData(result);
  }
  useEffect(() => {
    callApi(API)
  }, [])

  const Update = (id) => {
    Navigate(`/useredit/${username}/${id}`)
  }

  const Delete = async () => {
    const res = await fetch(`http://localhost:4000/api/students/${id}`, { method: "DELETE" })
    const result = await res.json()
    if (result.message === "succcess") {
      Navigate(`/user/${username}`)
      alert("deleted")
    } else {
      alert("somthing went wrong")
    }
  }
  const onClick = () => {
    Navigate(`/user/${username}`)
  }

  return (
    <>
      <li >{data.name}--{data.department}---{data.year}<button onClick={() => Update(data._id)}>Edit!</button><button onClick={Delete}>delete!</button></li>
      <button onClick={onClick}>Back!</button>
    </>
  )
}

export default Useritem