import React from "react";
import "./FullPage.css";
import { Share, Location, User, UserGroup, Calendar, Clock } from '../assets/icons'



function FullPage(props) {
    const event=props.events.find(event => event.id === props.pageID)
    return (
        <div>
        <div class="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-75"></div>
        <div tabIndex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal flex justify-center items-center md:h-full">
            <div class="relative w-full h-full max-w-5xl md:h-auto" >
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => props.closeFP(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span class="sr-only">closeFP</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-5xl font-bold text-gray-900 dark:text-white">{event.name}</h3>
                    
                    

                    
                    <div class="grid grid-cols-2 gap-3">
                        <img src="https://static.onecms.io/wp-content/uploads/sites/43/2022/05/26/45921-crispy-and-creamy-doughnuts-ddmfs-638-3x4-1.jpg" alt="event pics" class="object-cover object-center h-full w-full " />
                        <div class= "grid grid-cols-2 gap-3">
                            <h1 class="text-left text-xl font-bold text-gray-900 dark:text-white">Party Owner: <br/> Party Date: <br/> Party Time: <br/> Tag: <br/> Location: <br/>Food: <br/> Cost:  <br/>Capacity:</h1>
                            <h1 class="text-left text-xl font-bold text-gray-900 dark:text-white">Ice<br/> {event.date} <br/> {event.time} <br/> {event.tag} <br/> {event.location} <br/> {event.food} <br/> {event.cost} <br/> {event.capacity}  </h1>

                        </div>
                    </div>
                    <div class="h-full flex flex-col">
                        <div class="mb-2 h-full flex flex-col">
                            <label for="Note" class="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</label>
                            <p class="w-full h-full flex p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1 whitespace-pre-wrap"> {event.note}</p> 
                        </div>
                    <div class="">
                        <button class=" px-3 py-2 text-xl text-blue-100 bg-blue-600 rounded">Join</button>
                        <button class=" px-3 py-2 text-xl text-blue-100 bg-red-600 rounded">Delete</button>
                    </div>
                    
                         
                    </div>

                </div>
                
                </div>
                
                
            
            </div>
        </div>
        </div>
    );

} 
export default FullPage 