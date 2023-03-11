import React, { useEffect, useState } from 'react'
import { useNavigate , useParams } from 'react-router-dom'

const User = () => {
  const [data, setData] = useState([])
  const [student, setStudent] = useState({ name: "", department: "", year: "" })
  const Navigate = useNavigate()
  const {username}=useParams()
  const API = "http://localhost:4000/api/students"
  const callApi = async (url) => {
    const res = await fetch(url)
    const result = await res.json()
    setData(result)
  }
  useEffect(() => {
    callApi(API)
  }, [])

  const onClick = (id) => {
    Navigate(`/useritem/${username}/${id}`)
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setStudent({ ...student, [name]: value })
  }
  const Submit = async (e) => {
    try {
      const res = await fetch('http://localhost:4000/api/students', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
      })
      const result = await res.json()
      if (result.message === "Save") {
        alert("post")
      } else {
        alert("somthing went wrong")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    {username}
      {data.map((item, index) => {
        return <li key={index}>{item.name}--{item.department}---{item.year}<button onClick={() => onClick(item._id)} >Open!</button></li>
      })}
      <form onSubmit={Submit}>
        <input type="text" name="name" value={student.name} onChange={onChange} />
        <input type="text" name="department" value={student.department} onChange={onChange} />
        <input type="text" name="year" value={student.year} onChange={onChange} />
        <button>Submit!</button>
      </form>
    </>
  )
}

export default User