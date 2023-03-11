import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Signin = () => {
    const [user, setUser] = useState({ username: "", password: "" })
    const Navigate = useNavigate()
    const onChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    const Submit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:4000/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const result = await res.json()
            if (result.message.role === "Admin") {
                alert("login successsfull")
                Navigate('/admin')
            } else if (result.message.role === "User") {
                alert("login successsfull")
                Navigate(`/user/${result.message.username}`)
            } else {
                alert("invalid cradential")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h3>Sinup</h3>
            <form onSubmit={Submit}>
                <input type="text" name='username' value={user.username} onChange={onChange} />
                <input type="text" name='password' value={user.password} onChange={onChange} /><br /><br />
                <button>Submit</button>
            </form>
        </>
    )
}
export default Signin