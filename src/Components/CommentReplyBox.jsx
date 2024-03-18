import axios from 'axios';
import SuccssAlert from '../Messages/SuccssAlert';
import { useState } from 'react';

function CommentReplyBox({ closeReplyBox, commentID, refreshPage }) {

    const { SuccessMessage } = SuccssAlert();

    const ADD_CHILD_COMMENT_REPLY = "http://localhost:8080/api/v1/child"

    const [data, setData] = useState({
        userID: localStorage.getItem("email"),
        description: "",
        commentId: commentID
    });


    const handleCommentChange = (e) => {
        const { value } = e.target;
        setData({ ...data, description: value }); // Update comment in data state
    };

    console.log("payload", data)

    const addComment = async (e) => {
        e.preventDefault()
        const isCommentEmpty = data.description
        if (isCommentEmpty === "" || isCommentEmpty.length < 0) {
            const confirmed = await SuccessMessage("Comment body is empty!", "error");
            return
        }

        try {
            const res = await axios.post(ADD_CHILD_COMMENT_REPLY, data)
            refreshPage()
            setData({
                userID: "",
                description: "",
                commentId: ""
            })
            const confirmed = await SuccessMessage("Sucessfully Added!", "success");
        } catch (error) {
            const confirmed = await SuccessMessage("Something wrong!", "error");
            console.log(error)
        }
    }


    return (
        <div>
            <div className='mt-3 mb-[-15px] lg:mb-[-15px] lg:mr-20'>

                <form onSubmit={addComment} class="mb-6">
                    <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                        <label for="comment" class="sr-only">Your question</label>
                        <textarea id="comment" rows="1"
                            maxLength={2000}
                            onChange={handleCommentChange}
                            value={data.description} // Set value here
                            name='description'
                            class="px-0 w-full max-h-[200px] text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-500 dark:bg-gray-800"
                            placeholder="Write a reply..." required></textarea>
                    </div>
                    <button type="submit"
                        class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Send reply
                    </button>

                    <button
                        type='button'
                        onClick={closeReplyBox}
                        class=" ml-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4  hover:bg-red-800">
                        Cancel

                    </button>
                </form>
            </div>
        </div>
    )
}

export default CommentReplyBox