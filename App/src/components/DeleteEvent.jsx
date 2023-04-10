import React from "react";
import { database, db } from "../Firebase";
import { connectDatabaseEmulator, onValue, ref, set, push, update, unsubscribe, remove } from "firebase/database";
import { deleteDoc,doc } from "firebase/firestore";

function DeleteEvent(props){
    const event=props.events.find(event => event.id === props.pageID)
    function refreshPage(){
        window.location.reload(false);
    }
    
    return(
        <div>
            <div class="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-75"></div>
            <div tabIndex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal flex justify-center items-center md:h-full">
                <div class="relative w-full h-full max-w-xl md:h-auto">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => props.closeDeleteEvent(false)}>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span class="sr-only">closeDeleteEvent</span>
                        </button>
                        <h1 class="text-3xl text-center">Are you sure to delete {event.name} ?</h1>
                        <button class=" md-center px-3 py-2 text-xl text-center text-blue-100 bg-red-600 rounded" onClick={() => deleteDoc(doc(database,"events/"+event.id)).then(()=>{alert('event has been deleted')}).then(()=>refreshPage())}> Yes</button>
                        <button class=" md-center px-3 py-2 text-xl tect-center text-blue-100 bg-blue-600 rounded" onClick={() => {props.closeDeleteEvent(false); props.setOpenFullpage(true)}}> No </button>
                    </div>
                </div>
            </div>
        </div>
    )
}export default DeleteEvent