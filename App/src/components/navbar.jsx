import React from 'react';
import {Search, Filter} from '../assets/icons'

const Navbar = () => {
    return(
        <>
            <div class="h-[75px] bg-[#f1c470] drop-shadow-lg">
                <div class="h-[70px] bg-[#ff6565] flex flex-wrap items-center">
                    <h1 class='ml-3 text-3xl text-white font-poppins font-bold'>TyTime</h1>
                </div>            
            </div>
            <div class="grid grid-cols-9 gap-2 mx-3">
                <form class="relative flex flex-row flex-wrap items-center col-span-6 drop-shadow">
                    <label for="search-box"></label>
                    <div class="absolute left-4">
                        <Search/>
                    </div>
                    <input type="search" id="search-box" class="w-full p-2 pl-12 my-3 text-black border border-[#ff6565] rounded-full" placeholder="search for activities"/>
                    <button type="submit" class="absolute text-black right-6">Search</button>
                </form>
                <div class="relative flex items-center justify-evenly col-span-2 border border-gray-600 rounded-full my-3 drop-shadow-sm">
                    <div class="absolute left-3">
                        <Filter/>
                    </div>
                    <button type="submit" class="text-black ml-10 p-2.5 px-1 pl-3 font-semibold text-sm border-l border-l-gray-600">Date</button>
                    <button type="submit" class="text-black mr-2 p-2.5 px-1 pl-3 font-semibold text-sm border-l border-l-gray-600">Status</button>
                </div>
                <div class="flex items-center justify-center bg-[#ff6565] hover hover:bg-[#E44444] rounded-full my-3 drop-shadow">
                    <button type="submit" class="text-white font-semibold text-sm">Add Event</button>
                </div>
            </div>
        </>
    );
}

export default Navbar;