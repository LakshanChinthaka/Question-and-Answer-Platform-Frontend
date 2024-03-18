import React, { useEffect, useState } from 'react'
import DropDownBox from './DropDownBox'
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom';
import SuccssAlert from '../Messages/SuccssAlert';
// import { ref, getDownloadURL, } from "firebase/storage";


function AddPostSection({ refreshPage }) {
    const [selectedValue, setSelectedValue] = useState('');
    const { SuccessMessage } = SuccssAlert();
    // const [img, setImg] = useState(null);
    const[username, setUsername] = useState("")
    const [data, setData] = useState({
        userID: localStorage.getItem("email"),
        scription: "",
        type: ""
        // imageUrl: ""
    })

    useEffect(()=>{
        const username = localStorage.getItem("email")
        setUsername(username)
    })

    const ADD_POST = "http://localhost:8080/api/v1/post"

    const navigate = useNavigate()

    const handleSelectedValue = (value) => {
        setSelectedValue(value);
        setData({ ...data, type: value });

    };

    const handleDescriptionChange = (e) => {
        setData({ ...data, description: e.target.value });
    };


    const addPost = async (e) => {
        e.preventDefault()
        if (!username) {
            navigate("/signup")
            return
        }
        if (!data.type) {
            const confirmed = await SuccessMessage(
                "Category not selected!",
                "error"
            );
            return
        }
        console.log("final data", data)

        try {
            const res = await axios.post(ADD_POST, data)
            refreshPage()
            setData({
                userID: "",
                description: "",
                type: ""
            });
            const confirmed = await SuccessMessage("Sucessfully Added!", "success");
        } catch (error) {
            const confirmed = await SuccessMessage("Something wrong!", "error");
            console.log(error)
        }
    }

    return (
        <div className='ml-3 mx-auto px-4 lg:mt-10 lg:px-[120px] lg:pr-[130px] mt-[120px]'>
            <div class="flex justify-between items-center mb-2">
                <h2 class="text-lg lg:text-2xl font-bold text-gray-700 ">Ask your Question</h2>
                <DropDownBox onSelectValue={handleSelectedValue} />
            </div>
            <form onSubmit={addPost} class="mb-6">
                <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-300 ">
                    <label for="comment" class="sr-only">Your question</label>
                    <textarea id="comment" rows="2"
                        maxLength={5000}
                        class="px-0 w-full max-h-[300px] text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                        placeholder="Write a question..." required
                        onChange={handleDescriptionChange}
                    >

                    </textarea>
                </div>
                {/* IMAGE OR PDF INPUT  */}
                {/* <div class="space-y-8 font-[sans-serif] max-w-md mx-auto">

                    <div class="space-y-8 font-[sans-serif] max-w-md mx-auto">

                        <input
                            type="file"
                            onChange={handleDescriptionChange}
                            accept="image/*"
                            class="w-full lg:mb-3 mb-3 lg:ml-[-395px] text-black text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />

                    </div>

                </div> */}
                <button type="submit"
                    class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800">
                    Post question
                </button>
            </form>
        </div>
    )
}

export default AddPostSection