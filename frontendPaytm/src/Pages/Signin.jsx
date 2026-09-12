import { useState } from "react"
import { Button } from "../Components/Button"
import { Heading } from "../Components/Heading"
import { InputBox } from "../Components/InputBox"
import { SubHeading } from "../Components/SubHeading"
import { BottomWarning } from "../Components/BottomWarning"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signin = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    return  (
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your credentials to access your acccount"} />
                <InputBox onChange={(e) => setUsername(e.target.value)} placeholder ="John@gmail.com " label={"Enter your username"} />
                <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="12345" label={"Enter your password"} />
                <div className="pt-4">
                    <Button onClick={async () => {
                        try {
                            setError("");
                            const response = await axios.post("http://localhost:3000/api/user/signin", {
                                username,
                                password
                            });
                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard");
                        } catch (err) {
                            setError(err.response?.data?.message || "Unable to sign in");
                        }
                    }} label={"Sign in"} />
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                <BottomWarning label={"Don't have an account"} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
    )
}

export default Signin