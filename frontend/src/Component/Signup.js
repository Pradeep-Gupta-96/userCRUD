import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
    const [user, setUser] = useState({ username: "", password: "", role: ""})
    const Navigate=useNavigate()
    const onChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    const Submit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:4000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const result = await res.json()
            if (result.message === 'registration successfull') {
                alert('registration successfull')
                Navigate('/signin')
            } else {
                alert("Something went wrong")
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
                <input type="text" name='password' value={user.password} onChange={onChange} />
                <select name="role" onChange={onChange}>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select><br /><br />
                <button>Submit</button>
            </form>
        </>
    )
}

export default Signup