import React from 'react';
import { Share, Location, User, UserGroup, Calendar, Clock } from '../assets/icons'


var cards = [];
for (var i = 1; i <= 12; i++) {
    cards.push(i);
}


export const CardSection = (props) => {
    var cards = props.events
    console.log("test")

    console.log(cards)
    return (
        <>

            <div class="grid grid-cols-6 px-8 py-4 gap-4 h-full cursor-pointer " >

                {cards.map((card) =>
                    <div key={card.id} class="relative col-span-6 lg:col-span-2 sm:col-span-3 h-64 bg-white drop-shadow-md rounded-lg font-poppins" onClick={() => { props.setOpenFullpage(true); props.setPageID(card.id); }} >
                        <div class="">
                            <img src="https://static.onecms.io/wp-content/uploads/sites/43/2022/05/26/45921-crispy-and-creamy-doughnuts-ddmfs-638-3x4-1.jpg" alt="event pics" class="absolute object-cover w-28 h-28 right-3 top-9 rounded-lg" />
                            <div class="absolute right-3 top-2" onClick={() => alert('clicked!')}>
                                <Share />
                            </div>
                        </div>
                        <div class="ml-3 mt-2">
                            <p class="font-bold">{card.name}</p>
                            <div class="relative grid grid-flow-row gap-2.5 mt-3">
                                <div class="flex items-center">
                                    <div class="absolute p-1 pl-0">
                                        <User />
                                    </div>
                                    <p class="text-[12px] ml-6">Natprawee Pattayawij</p>
                                </div>
                                <div class="flex items-center">
                                    <div class="absolute p-1 pl-0">
                                        <Location />
                                    </div>
                                    <p class="text-[12px] ml-6">{card.location}</p>
                                </div>
                                <div class="flex items-center">
                                    <div class="absolute p-1 pl-0">
                                        <Location />
                                    </div>
                                    <p class="text-[12px] ml-6">東京都目黒区大岡山</p>y
                                </div>
                            </div>
                        </div>
                        <div class="relative grid grid-flow-row gap-2 mt-20 ml-3">
                            <div class="flex justify-between">
                                <div class="flex items-center">
                                    <div class="absolute p-1 pl-0">
                                        <Calendar />
                                    </div>
                                    <p class="text-[12px] ml-7 font-medium">{card.date}</p>
                                </div>
                                <div class="flex items-center">
                                    <div class="absolute p-1 right-28">
                                        <UserGroup />
                                    </div>
                                    <p class="text-[12px] mr-3">{card.attendees.length} attendees</p>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <div class="flex items-center">
                                    <div class="absolute p-1 pl-0">
                                        <Clock />
                                    </div>
                                    <p class="text-[12px] ml-7 font-medium">{card.time}</p>
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

