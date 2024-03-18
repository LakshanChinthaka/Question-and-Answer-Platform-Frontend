
function LikeUserList({ users }) {

    return (
        <div >
            <ul className='absolute  shadow-lg bg-white py-1 z-[1000] mt-4 w-max rounded-xl max-h-96 overflow-auto'>

            
                {users && users.map(user => (
                    <li key={user.userId} className='py-2 px-3 flex items-center hover:bg-blue-50 text-black text-sm'>
                        <img src="https://readymadeui.com/profile_2.webp" className="w-8 h-8 rounded-full shrink-0 mr-3" alt="Profile" />
                    {user.userId != "null" ? user.userId : "Public user"}

                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" class=" ml-2 inline-block  fill-blue-600"
                            viewBox="0 0 24 24">
                            <path
                                d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                data-original="#000000" />
                        </svg>
                    </li>

                ))}
                  {!users && users.length === 0 && (
                    <li className='py-2 px-3 flex items-center hover:bg-blue-50 text-black text-sm cursor-pointer'>
                       
                        No Like
                      
                    </li>
                )}
            </ul>
        </div>

    )
}

export default LikeUserList
