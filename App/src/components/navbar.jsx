import React from 'react';
import { Search, Filter } from '../assets/icons'

const Navbar = ({ openModal }) => {
    return (
        <>
            <div class="h-[75px] bg-[#f1c470] drop-shadow-lg">
                <div class="h-[70px] bg-[#ff6565] flex flex-wrap items-center">
                    <h1 class='ml-3 text-3xl text-white font-poppins font-bold'>TyTime</h1>
                </div>
            </div>
            <div class="grid grid-cols-9 sm:gap-2 gap-x-2 gap-y-0 mx-3">
                <form class="relative flex flex-row flex-wrap items-center col-span-9 sm:col-span-6 drop-shadow mt-2 sm:my-3">
                    <label for="search-box"></label>
                    <div class="absolute left-4">
                        <Search />
                    </div>
                    <input type="search" id="search-box" class="w-full p-2 pl-14 text-black border border-[#ff6565] rounded-full" placeholder="search for activities" />
                    <button type="submit" class="absolute text-black right-6">Search</button>
                </form>
                <div class="relative grid grid-flow-col grid-cols-5 col-span-6 sm:col-span-2 border border-gray-600 rounded-full my-3 drop-shadow-sm">
                    <div class="flex items-center justify-center">
                        <div class="absolute ml-1" onClick={() => alert('clicked!')}>
                            <Filter />
                        </div>
                    </div>
                    <div class="flex items-center justify-center col-start-2 col-end-4">
                        <button type="submit" class="text-black w-full mx-1 p-2.5 px-1 font-semibold text-sm border-x border-x-gray-600">Date</button>
                    </div>
                    <div class="flex items-center justify-center col-span-2">
                        <button type="submit" class="text-black w-full mx-1 p-2.5 px-1 pr-3 font-semibold text-sm">Status</button>
                    </div>
                </div>
                <button type="submit" class="flex items-center justify-center bg-[#ff6565] hover hover:bg-[#E44444] rounded-full my-3 drop-shadow col-span-3 sm:col-span-1 text-white font-semibold text-sm" onClick={() => { openModal(true) }}>Add Event</button>
            </div>
        </>
    );
}

export default Navbar;