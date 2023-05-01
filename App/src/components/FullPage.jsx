import React, { useState, useEffect } from "react";
import { Share, Location, User, UserGroup, Calendar, Clock } from '../assets/icons'
import { doc, getDoc, updateDoc, collection, arrayUnion, arrayRemove } from "firebase/firestore";
import { database } from "../Firebase";

function FullPage(props) {
    const event = props.events.find(event => event.id === props.pageID)

    /* Fetch current user information (username) */
    const [username, setUsername] = useState("");
    const usersRef = collection(database, 'users');
    const userRef = props.userid ? doc(usersRef, props.userid) : null;

    useEffect(() => {
        if (userRef) {
            getDoc(userRef).then((doc) => {
                if (doc.exists()) {
                    setUsername(doc.data().name);
                }
            }, (error) => {
                console.error(error);
            });
        }
    }, [usersRef, props.userid]);

    /* Join-Unjoin */
    const join = event.attendees.includes(username);

    console.log(event.attendees.includes(username))
    const joinSubmit = async (e) => {
        e.preventDefault();
        const eventRef = collection(database, "events");
        const docRef = doc(eventRef, props.pageID);
        if (props.userid) {
            await updateDoc(docRef, {
                attendees: arrayUnion(props.userid),
            })
            window.location.reload()
        }
        else {
            props.openLogin(true)
            props.closeFP(false)

        }

    }
    const unJoinSubmit = async (e) => {
        e.preventDefault();
        const eventRef = collection(database, "events");
        const docRef = doc(eventRef, props.pageID);
        await updateDoc(docRef, {
            attendees: arrayRemove(props.userid),
        })
        window.location.reload()
    }

    /* Party owner's name */
    const ownerRef = doc(database, 'users', event.ownerid);
    const [ownername, setPartyOwner] = useState("");
    useEffect(() => {
        if (ownerRef) {
            getDoc(ownerRef).then((doc) => {
                if (doc.exists()) {
                    setPartyOwner(doc.data().name);
                } 
            }, (error) => {
                console.error(error);
            });
        }
    });

    

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
                                <div class="grid grid-cols-2 gap-3">
                                    <h1 class="text-left text-xl font-bold text-gray-900 dark:text-white">Party Owner: <br /> Party Date: <br /> Party Time: <br /> Tag: <br /> Location: <br />Food: <br /> Cost:  <br />Capacity:</h1>
                                    <h1 class="text-left text-xl font-bold text-gray-900 dark:text-white">{ownername}<br /> {event.date} <br /> {event.time} <br /> {event.tag} <br /> {event.location} <br /> {event.food} <br /> {event.cost} <br /> {event.capacity}  </h1>

                                </div>
                            </div>
                            <div class="h-full flex flex-col">
                                <div class="mb-2 h-full flex flex-col">
                                    <label for="Note" class="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</label>
                                    <p class="w-full h-full flex p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1 whitespace-pre-wrap"> {event.note}</p>
                                </div>
                                <div className="flex space-x-4">
                                    {!join && <button
                                        className="px-4 py-2 text-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-md transition-colors duration-200"
                                        onClick={joinSubmit}
                                    >
                                        Join
                                    </button>}
                                    {join && <button
                                        className="px-4 py-2 text-xl text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-md transition-colors duration-200"
                                        onClick={unJoinSubmit}
                                    >
                                        Unjoin
                                    </button>}
                                    {props.userid === event.ownerid && (
                                        <button
                                            className="px-4 py-2 text-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md shadow-md transition-colors duration-200"
                                            onClick={() => {
                                                props.setDeleteEvent(true);
                                                props.closeFP(false);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>

                            </div>

                        </div>
                    </div>
                    <div class="h-full flex flex-col">



                    </div>



                </div>
            </div>
        </div>
    );

}
export default FullPage 