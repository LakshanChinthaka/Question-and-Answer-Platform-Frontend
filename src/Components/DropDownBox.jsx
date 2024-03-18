import React, { useEffect, useRef, useState } from 'react'
import axios, { Axios } from 'axios';

function DropDownBox({onSelectValue}) {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectValue, setSelectValue] = useState("Category")
    const [postType, setPostType] = useState([])

    const POST_CATEGORY = "http://localhost:8080/api/v1/post/category"

    //Close Dropdown Menu when clicking outside
    useEffect(() => {

        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleSelectValue = (value) => {
        setSelectValue(value)
        setIsOpen(false)
        onSelectValue(value) //return value to parent
    }

    const value = ["Java", "Python", "#C", "Pascal", ".NET"]

    useEffect (()=> {
        loadPostType()
    },[])

    const loadPostType = async (e) => {
        try {
            const res = await axios.get(POST_CATEGORY);
            setPostType(res.data.response)
            console.log(res.data.response)

        } catch (error) {
            console.error("Error loading posts:", error);
        }
    }

    return (
        <div ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)}
                class="text-xs mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg px-5 py-2.5 text-center inline-flex items-center" type="button">{selectValue} <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {isOpen && (
                <div class="z-10 absolute right-3 lg:right-20  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2 h-72 text-sm overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        
                        {postType.map((data, index) => (
                            <li key={index}>
                                <a onClick={() => handleSelectValue(data)} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{data}</a>
                            </li>
                        ))}

                    </ul>
                </div>
            )}

        </div>
    )
}

export default DropDownBox