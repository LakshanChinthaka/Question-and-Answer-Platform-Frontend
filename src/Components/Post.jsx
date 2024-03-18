import React, { useEffect, useRef, useState } from 'react'
import AddPostSection from './AddPostSection'
import ReplyBox from './ReplyBox'
import { BiLike, BiSolidLike } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios, { Axios } from 'axios';
import CommentReplyBox from './CommentReplyBox';
import LikeUserList from './LikeUserList';
import { IoIosArrowDropdown } from "react-icons/io";



function Post() {
    //handle reply box
    const [parentReplyBox, setParentReplyBox] = useState(false);
    const [childReplyBox, setChildReplyBox] = useState(false);

    //handle like
    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState(true)
    const [showLikeList, setShowLikeList] = useState(false);
    const [isOtherLikeListClose, setCloseOtherLikeList] = useState(false);
    const [id, setId] = useState(0);

    //get data from API
    const [post, setPost] = useState([])

    //for input feild
    const [commentID, setCommentID] = useState(null)
    const [postID, setPostID] = useState(null)

    //Pagindation
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const pageSize = 10; // Number of items per page

    const [username, setUserName] = useState("");

    const LOAD_POST = "http://localhost:8080/api/v1/post/all"
    const ADD_POST_LIKE = "http://localhost:8080/api/v1/post"
    const ADD_COMMENT_LIKE = "http://localhost:8080/api/v1/comment"
    const ADD_CHILD_COMMENT_LIKE = "http://localhost:8080/api/v1/child"
    const DELETE_POST = "http://localhost:8080/api/v1/post/remove/"
    const DELETE_COMMENT = "http://localhost:8080/api/v1/post/comment/"
    const DELETE_CHILD_COMMENT = "http://localhost:8080/api/v1/post/child/"

    //Pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };



    //Close reply box
    const closeReplyBox = () => {
        setChildReplyBox(false);
        setParentReplyBox(false);
        setCommentID(null)
        setPostID(null)
    }

    useEffect(() => {
        loadAllPost()
        setUserName(localStorage.getItem('email'))
    }, [currentPage])

    console.log("Email", username)

    // Load all post and comment
    const loadAllPost = async (e) => {
        try {
            const res = await axios.get(LOAD_POST, {
                params: {
                    page: currentPage,
                    size: pageSize,
                },
            });
            // Set data
            var respose = res.data.response
            setPost(respose.content);
            console.log(respose.content)
            setTotalPages(respose.totalPages);
            setTotalElements(respose.totalElements);
            console.log("User like ID-", respose.content[1].userLikeList[0].userId)

        } catch (error) {
            console.error("Error loading posts:", error);
        }
    }

    //Handle Post's like count 
    const addLike = async (id, typeId) => {
        setLike(!like);
        console.log("Like", like);
        console.log(typeId === 0 ? "Post" : (typeId === 1 ? "Parent Comment" : "Child Comment"), id);

        const user = localStorage.getItem("email");

        try {
            if (typeId === 0) {
                const res = await axios.put(`${ADD_POST_LIKE}/${id}/${like}/${user}/post`);
                loadAllPost();
            } else if (typeId === 1) {
                const res = await axios.put(`${ADD_COMMENT_LIKE}/${id}/${like}/${user}/com`);
                loadAllPost();
            } else {
                const res = await axios.put(`${ADD_CHILD_COMMENT_LIKE}/${id}/${like}/${user}/child`);
                loadAllPost();
            }
        } catch (error) {
            console.error("Error liking:", error);
        }
    }


    //Like list
    const togglePostLikeList = () => {
        setShowLikeList(!showLikeList);
        setId(null)
        setCloseOtherLikeList(true)
    };

    const toggleCommentLikeList = () => {
        setShowLikeList(!showLikeList);
        setId(null)
        setCloseOtherLikeList(true)
    };

    console.log("Set id", id)
    console.log("isOpen", showLikeList)
    console.log("isOpenOther", isOtherLikeListClose)

    const dropdownRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowLikeList(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);


    //DELETE POST
    const deletePost = async (id, typeId) => {
        console.log("DELETE - ID", id ," -", typeId)

        try {
            if (typeId === 0) {
                const res = await axios.delete(`${DELETE_POST}/${id}`);
                loadAllPost();
                const confirmed = await SuccessMessage("Sucessfully Deleted!", "success");
            } else if (typeId === 1) {
                const res = await axios.delete(`${DELETE_COMMENT}/${id}`);
                loadAllPost();
                const confirmed = await SuccessMessage("Sucessfully Deleted!", "success");
            } else {
                const res = await axios.delete(`${DELETE_CHILD_COMMENT}/${id}`);
                loadAllPost();
                const confirmed = await SuccessMessage("Sucessfully Deleted!", "success");
            }
        } catch (error) {
            console.error("Error liking:", error);
        }
    }


    return (
        <div className='px-[-10px]'>
            <div className='justify-center'>

                <h1 class="mb-[-70px] lg:mt-[-10px] text-4xl text-center font-extrabold tracking-tight leading-none md:text-5xl "><small class="ms-2 text-center font-semibold text-gray-500 dark:text-gray-400">Question & Answer</small></h1>
                <AddPostSection refreshPage={loadAllPost} />
            </div>

            <div className='lg:mx-10 h-full mt-[-30px] sm:mt-[-30px]  mx-5 my-3 p-3'>

                {/* Border */}
                <div className='border-t-2 mt-5 mb-6 border-gray-300'></div>
                {post?.map((item, index) => (
                    <>
                        {/* Post */}
                        <div className=' py-3 lg:my-[2px] mr-[-1px] lg:mx-20 my-[10px] mt-[-20px] lg:mr-[65px] lg:mt-[-20px]  mb-1 mx-3'>

                            <article key={item.postId} className="p-3 text-base bg-gradient-to-r from-cyan-200 to-blue-100 rounded-lg">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-gray-800 font-semibold">
                                            <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough" />
                                            {item.userID}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-500">
                                            <time  >{item.postDate}</time>
                                        </p>
                                    </div>
                                </footer>
                                <p className="text-sm text-gray-700">{item.description}</p>
                                <div className="flex items-center mt-4 space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setParentReplyBox(true);
                                            setChildReplyBox(false);
                                            setCommentID(null)
                                            setPostID(item.postId)
                                        }}
                                        className="flex items-center text-sm text-gray-600 hover:underline dark:text-gray-500 font-medium"
                                    >
                                        <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                        </svg>
                                        Reply ({item.replyCount})
                                    </button>

                                    <button
                                        type='button'
                                        onClick={() => addLike(item.postId, 0)}

                                        className='flex items-center text-sm text-gray-600 hover:underline font-medium'>
                                        {item.likeStatus ? <BiSolidLike className='mr-1' /> : <BiLike className='mr-1' />}
                                        Like {item.likeCount}

                                        <div ref={dropdownRef} >
                                            {showLikeList && id === item.postId && isOtherLikeListClose && <LikeUserList users={item.userLikeList} />}
                                        </div>

                                    </button>

                                    <button className="pl-[-505px]">
                                        {!showLikeList && id === item.postId ? ( // true
                                            <IoIosArrowDropdown open={false} onClick={() => { togglePostLikeList(); setId(item.postId); }} /> // light | 2 true
                                        ) : (
                                            <IoIosArrowDropdown open={false} onClick={() => { togglePostLikeList(); setId(item.postId); }} /> // Dark | 2 false
                                        )}


                                    </button>

                                    <button type="button" onClick={() => handleTypeButtonClick(item.type)} className="flex items-center text-sm text-gray-600 hover:underline dark:text-gray-500 font-medium">
                                        #{item.type}
                                    </button>

                                    {/* Delete */}
                                    {username === item.userID &&
                                    <button type="button" onClick={() => { console.log(item.postId); deletePost(item.postId,0); }}  className="flex items-center text-sm text-gray-600 hover:underline dark:text-gray-500 font-medium">
                                        <RiDeleteBin6Line className="mr-1" />
                                        Delete
                                    </button>
                                    }
                                </div>
                            </article>

                            {/* {parentReplyBox ? <ReplyBox closeReplyBox={closeReplyBox} isChildReply={false} /> : null} */}
                            {postID === item.postId && <ReplyBox closeReplyBox={closeReplyBox} postIds={item.postId} refreshPage={loadAllPost} />}

                        </div>

                        {/* Parent comment */}
                        {item.comments && item.comments.length > 0 && (
                            item.comments.map((comment, index) => (
                                <div className='mt-[-5px] mb-4 mr-1  lg:mt-[-8px] ml-10 lg:ml-[10px] lg:mr-[-12px]' key={comment.id}>


                                    <article className="p-2 lg:mt-5  lg:mr-20 lg:ml-[110px] drop-shadow-sm text-base bg-gradient-to-r from-gray-300 to-gray-200  rounded-lg">
                                        <footer className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                                                    <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Jese Leos" />
                                                    {comment.userID}
                                                </p>
                                                <p className="text-sm text-gray-600 ">
                                                    <time>{comment.timeStamp}</time>
                                                </p>
                                            </div>
                                        </footer>
                                        <p className="text-gray-600 dark:text-gray-600 text-sm">{comment.comment}</p>
                                        <div className="flex items-center mt-4 space-x-4">
                                            <button type="button"
                                                onClick={() => {
                                                    setChildReplyBox(true);
                                                    setParentReplyBox(false);
                                                    setCommentID(comment.id)
                                                    setPostID(null)
                                                }}
                                                className="flex items-center text-sm text-gray-600 hover:underline  font-medium">
                                                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                                                </svg>
                                                Reply ({comment.replyCount})
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() => addLike(comment.id, 1)}
                                                className='flex items-center text-sm text-gray-600 hover:underline font-medium'>
                                                {comment.likeStatus ? <BiSolidLike className='mr-1' /> : <BiLike className='mr-1' />}
                                                Like {comment.likeCount}


                                                {/* <div ref={dropdownRef} >
                                                    {showLikeList && id === comment.id &&  isOtherLikeListClose && <LikeUserList users={comment.commentLikeList} />}
                                                </div> */}

                                            </button>

                                            {/* <button className="">

                                                {!showLikeList && id === comment.id ? ( // true
                                                    <IoIosArrowDropdown open={false} onClick={() => { toggleCommentLikeList(); setId(comment.id); }} /> // light | 2 true
                                                ) : (
                                                    <IoIosArrowDropdown open={false} onClick={() => { toggleCommentLikeList(); setId(comment.id); }} /> // Dark | 2 false
                                                )}


                                            </button> */}


                                            <button type="button"
                                               onClick={() => { console.log(comment.id); deletePost(comment.id,1); }} className="flex items-center text-sm text-gray-600 hover:underline dark:text-gray-500 font-medium">
                                                <RiDeleteBin6Line className='mr-1' />
                                                Delete
                                            </button>
                                        </div>
                                    </article>
                                    <div className='lg:ml-[110px]'>
                                        {/* {childReplyBox ? <CommentReplyBox closeReplyBox={closeReplyBox} /> : null} */}
                                        {commentID === comment.id && <CommentReplyBox closeReplyBox={closeReplyBox} commentID={comment.id} refreshPage={loadAllPost} />}
                                    </div>


                                    {/* CHILD COMMENT */}
                                    {comment.childComment && comment.childComment.length > 0 && (
                                        comment.childComment.map((childComment) => (
                                            <div key={childComment.id} className="mt-3 ml-5">
                                                <article className="p-2  lg:mt-5  lg:mr-20 lg:ml-[120px] drop-shadow-sm text-base bg-gradient-to-r from-gray-200 to-gray-200 rounded-lg">
                                                    <footer className="flex justify-between items-center mb-2">
                                                        <div className="flex items-center">
                                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                                                                <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Jese Leos" />
                                                                {childComment.userID}
                                                            </p>
                                                            <p className="text-sm text-gray-600 ">
                                                                <time>{childComment.timeStamp}</time>
                                                            </p>
                                                        </div>
                                                    </footer>
                                                    <p className="text-gray-600 dark:text-gray-600 text-sm">{childComment.comment}</p>
                                                    <div className="flex items-center mt-4 space-x-4">
                                                        <button
                                                            type='button'
                                                            onClick={() => addLike(childComment.id, 2)}
                                                            className='flex items-center text-sm text-gray-600 hover:underline font-medium'>
                                                            {childComment.likeStatus ? <BiSolidLike className='mr-1' /> : <BiLike className='mr-1' />}
                                                            Like {childComment.likeCount}
                                                        </button>
                                                        <button type="button"
                                                             onClick={() => { console.log(childComment.id); deletePost(childComment.id,2); }}className="flex items-center text-sm text-gray-600 hover:underline dark:text-gray-500 font-medium">
                                                            <RiDeleteBin6Line className='mr-1' />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </article>
                                            </div>
                                        ))
                                    )}
                                </div>
                            ))
                        )}



                        <div className='border-t-2 mt-2 mb-6 border-gray-300'></div>



                    </>


                ))}

            </div>

            {/* Pagination */}
            <div className="md:flex mt-4 px-6">
                <p className="text-sm text-gray-400 flex-1">
                    Showing {currentPage * pageSize + 1} to{" "}
                    {Math.min(
                        currentPage * pageSize + pageSize,
                        currentPage * pageSize + post.length
                    )}{" "}
                    of {totalPages * pageSize} entries
                </p>
                {/* Pagination  */}
                <div className="flex items-center max-md:mt-5 mb-1">
                    <Stack spacing={3}>
                        <Pagination
                            count={totalPages}
                            shape="rounded"
                            color="primary"
                            page={currentPage + 1}
                            onChange={(e, page) => handlePageChange(page - 1)}
                        />
                    </Stack>
                </div>
            </div>



        </div>
    )
}

export default Post

{/* Pagination */ }
{/* <div className="flex justify-center mt-4">
<Stack spacing={2}>
    <Pagination
        count={totalPages}
        page={currentPage + 1}
        onChange={(event, page) => handlePageChange(page - 1)}
        shape="rounded"
        color="primary"
        boundaryCount={2}
        siblingCount={2}
        hidePrevButton
        hideNextButton
        showFirstButton
        showLastButton
    />
</Stack>
</div> */}