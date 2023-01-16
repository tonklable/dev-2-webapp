import React from 'react';
import {Share,Location,User,UserGroup,Calendar,Clock} from '../assets/icons'

var cards = [];
for (var i = 1; i <= 12; i++) {
    cards.push(i);
}


export const CardSection = () => {
    return(
        <>
            <div class="grid grid-cols-6 px-8 py-4 gap-4 h-full">
                {cards.map((card) => 
                        <div class="relative col-span-6 lg:col-span-2 sm:col-span-3 h-64 bg-white drop-shadow-md rounded-lg font-poppins">
                            <div class="">
                                <img src="https://shorturl.at/bDHS3" alt="event pics" class="absolute object-cover w-28 h-28 right-3 top-9 rounded-lg"/>
                                <div class="absolute right-3 top-2" onClick={() => alert('clicked!')}>
                                    <Share/>
                                </div>
                            </div>
                            <div class="ml-3 mt-2">
                                <p class="font-bold">Kokoro</p>
                                <div class="relative grid grid-flow-row gap-2.5 mt-3">
                                    <div class="flex items-center">
                                        <div class="absolute p-1 pl-0">
                                            <User/>
                                        </div>
                                        <p class="text-[12px] ml-6">Natprawee Pattayawij</p>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="absolute p-1 pl-0">
                                            <Location/>
                                        </div>
                                        <p class="text-[12px] ml-6">東京工業大学</p>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="absolute p-1 pl-0">
                                            <Location/>
                                        </div>
                                        <p class="text-[12px] ml-6">東京都目黒区大岡山</p>
                                    </div>
                                </div>
                            </div>
                            <div class="relative grid grid-flow-row gap-2 mt-20 ml-3">
                                <div class="flex justify-between">
                                    <div class="flex items-center">
                                        <div class="absolute p-1 pl-0">
                                            <Calendar/>
                                        </div>
                                        <p class="text-[12px] ml-7 font-medium">Friday 2022/11/20</p>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="absolute p-1 right-28">
                                            <UserGroup/>
                                        </div>
                                        <p class="text-[12px] mr-3">21/30 attendees</p>
                                    </div>
                                </div>
                                <div class="flex justify-between">
                                    <div class="flex items-center">
                                        <div class="absolute p-1 pl-0">
                                            <Clock/>
                                        </div>
                                        <p class="text-[12px] ml-7 font-medium">18.00</p>
                                    </div>
                                    <div class="flex items-center justify-center bg-[#37DF66] rounded-full h-6 w-14 mr-3">
                                        <p class="text-white font-semibold text-sm">OPEN</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div> 
        </>
    );
}

