import React from 'react'

function Footer() {
    return (
        <div className='border-t-2 mt-20 border-gray-200'>
            <footer class="bg-white py-12 px-8 font-[sans-serif]">
                <div class="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-5 lg:gap-20 max-lg:gap-8">
                    <div class="lg:col-span-2">
                        <h4 class="text-lg font-bold mb-6 text-[#333]">About Us</h4>
                        <p class="text-gray-500 text-[15px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida,
                            mi eu pulvinar cursus, sem elit interdum mauris.</p>
                       
                    </div>
                    <div>
                        <h4 class="text-lg font-bold mb-6 text-[#333]">Services</h4>
                        <ul class="space-y-4">
                            <li><a href="javascript:void(0)" class="text-gray-500 hover:text-blue-600 text-[15px]">Web
                                Development</a></li>
                            <li><a href="javascript:void(0)" class="text-gray-500 hover:text-blue-600 text-[15px]">Mobile App
                                Development</a></li>
                            <li><a href="javascript:void(0)" class="text-gray-500 hover:text-blue-600 text-[15px]">UI/UX
                                Design</a></li>
                            <li><a href="javascript:void(0)" class="text-gray-500 hover:text-blue-600 text-[15px]">Digital Marketing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-bold mb-6 text-[#333]">Resources</h4>
                        <ul class="space-y-4">
                            <li><a href="javascript:void(0)" class="text-gray-500 hover:text-blue-600 text-[15px]">Webinars</a>
                            </li>
                            <li><a href="javascript:void(0)" class="text-gray-500 hover:text-blue-600 text-[15px]">Ebooks</a>
                            </li>
                            <li><a href="javascript:void(0)" class="text-gray-500 hover:text-blue-600 text-[15px]">Templates</a>
                            </li>
                            <li><a href="javascript:void(0)" class="text-gray-500 hover:text-blue-600 text-[15px]">Tutorials</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-bold mb-6 text-[#333]">About Us</h4>
                        <ul class="space-y-4">
                            <li><a href="javascript:void(0)" class="text-gray-500 hover:text-blue-600 text-[15px]">Our Story</a>
                            </li>
                            <li><a href="javascript:void(0)" class="text-gray-500 hover:text-blue-600 text-[15px]">Mission and
                                Values</a></li>
                            <li><a href="javascript:void(0)" class="text-gray-500 hover:text-blue-600 text-[15px]">Team</a></li>
                            <li><a href="javascript:void(0)" class="text-gray-500 hover:text-blue-600 text-[15px]">Testimonials</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer