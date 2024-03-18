import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { db } from '../firebase';



function SignUp() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [image, setImage] = useState("")
    const [error, setError] = useState("")


    const navigate = useNavigate();

    const createUser = (e) => {

        e.preventDefault()
        if (password === confirmPassword && password.length >= 6) {

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    navigate("/login");

                })
                .catch((error) => {
                    setError(error.message)
                    console.log(error.message);
                });

        } else {

            setError("Passwords do not match");
        }
    }
    console.log("Image", image)

    return (
        <div className='lg:mb-[10px]'>
            <section className=" dark:bg-gray-900">
                <div className="flex flex-col items-center lg:mt-[50px] mt-20 justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">


                        <button
                            onClick={() => navigate("/")}
                            className="inline-flex items-center mt-3 lg:mb-[-20px] ml-5 lg:ml-7 py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800">
                            <MdArrowBackIos /> Back

                        </button>

                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create account
                            </h1>
                            <form onSubmit={createUser} className="space-y-4 md:space-y-6">
{/* 
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Display name</label>
                                    <input onChange={(e) => setDisplayName(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Robert john" required=""></input>
                                </div> */}

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@gmail.com" required=""></input>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark" required=""></input>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " required=""></input>
                                </div>

                                {/* <div class="space-y-8 font-[sans-serif] max-w-md mx-auto">
                                    <input
                                        onChange={(e) => setImage(e.target.files[0])}
                                        accept="image/*" // Only allow image files
                                        type="file"
                                        class="w-full text-gray-600 fill text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
                                </div> */}

                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                            </form>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp