import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai"


export default function login(){


    return(
        <div className="shadow-xl mt-32 p-10 text-gray-400 rounded-lg w-1/2 grid place-items-center">
            <h2 className="text-3xl font-medium"> Sign up</h2>
            <div className="py-4">
                <h3>Sign in with one of the providers</h3>
            </div>
            <div className="flex flex-col gap-4">
                <button className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2"><FcGoogle className="text-2xl" />Sign in with Google</button>
                <button className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2"><AiFillFacebook className="text-2xl text-blue-500" />Sign in with Facebook</button>
            </div>
        </div>
    )
}