import { useState } from "react"
import { Button } from "../Components/Button"
import { Heading } from "../Components/Heading"
import { InputBox } from "../Components/InputBox"
import { SubHeading } from "../Components/SubHeading"
import { BottomWarning } from "../Components/BottomWarning"

import axios from "axios";
import { useNavigate } from "react-router-dom"



const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your infromation to create an account"} />
                    <InputBox onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="Enter userNme" label={"First Name"} />
                    
                    <InputBox onChange={(e) => {
                        setLastName(e.target.value);
                    }} placeholder="Doe" label={"Last Name"} />

                    <InputBox onChange={e => {
                        setUsername(e.target.value);
                    }} placeholder="harkirat@gmail.com" label={"Email"} />

                    <InputBox onChange={(e) => {
                        setPassword(e.target.value)
                    }} placeholder="123456" label={"Password"} />
                    
                    <div className="pt-4">
                        <Button onClick={ async() => {
                            try {
                                setError("");
                                const response = await axios.post("http://localhost:3000/api/user/signup", {
                                    username,
                                    firstName,
                                    lastName,
                                    password
                                });
                                localStorage.setItem("token", response.data.token);
                                navigate('/dashboard');
                            } catch (err) {
                                setError(err.response?.data?.message || "Unable to create account");
                            }
                        }}
                        label={"Sign up"} />
                    </div>
                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                
            
                </div>
            </div>
        </div>
    )
}

export default Signup