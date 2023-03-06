import React from "react";
import Datepicker from "tailwind-datepicker-react"
import { useState, useEffect } from 'react';
import { db, database } from "../Firebase";
import { connectDatabaseEmulator, onValue, ref, set, push, update, unsubscribe } from "firebase/database";
import TimePicker from 'react-time-picker';
import { doc, addDoc, collection } from "firebase/firestore";


// Calendar
const options = {
    title: "Event Date",
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        background: "bg-white ",
        todayBtn: "bg-[#ff6565] hover:bg-[#E44444] font-poppins text-white",
        clearBtn: "bg-gray-400 hover:bg-gray-500 font-poppins text-white",
        icons: "text-[12px] font-bold font-poppins flex justify-center items-center",
        text: "font-poppins",
        disabledText: "text-gray-400 font-poppins",
        input: "",
        inputIcon: "",
        selected: "text-white bg-[#ff6565] hover:bg-[#E44444]",
    },
    icons: {
        // () => ReactNode | JSX.Element
        prev: () => <span>Previous</span>,
        next: () => <span>Next</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date("2023-02-01"),
    language: "en",
}

// Real Modal
function Modal({ closeModal }) {
    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState();
    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState();
    const [eventTime, setEventTime] = useState();
    const [eventOwner, setEventOwner] = useState();
    const [eventCapacity, setEventCapacity] = useState('');
    const [eventFood, setEventFood] = useState('');
    const [eventCost, setEventCost] = useState('');
    const [eventNote, setEventNote] = useState('');
    const [eventStatus, setEventStatus] = useState(true);
    const [eventTag, setEventTag] = useState('');

    const handleChange = (selectedDate) => {
        // setEventDate(selectedDate)
        console.log(selectedDate);
        const datestring = selectedDate.toLocaleDateString();
        console.log(datestring);
        setEventDate(datestring);
    }
    const handleClose = (state) => {
        setShow(state)
    }





    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventsRef = collection(database, "events");
        console.log(eventsRef)
        await addDoc(eventsRef, {
            name: eventName,
            location: eventLocation,
            date: eventDate,
            time: eventTime,
            tag: eventTag,
            capacity: eventCapacity,
            food: eventFood,
            cost: eventCost,
            note: eventNote,
        });


        // const query = ref(db, "Events/" + Date.now());
        // set(query, {
        //     name: eventName,
        //     location: eventLocation,
        //     date: eventDate,
        //     time: eventTime,
        //     tag: eventTag,
        //     capacity: eventCapacity,
        //     food: eventFood,
        //     cost: eventCost,
        //     note: eventNote,
        // });
        setEventName('');
        setEventLocation('');
        setEventDate('');
        setEventTime()
        setEventTag('')
        setEventCapacity('')
        setEventFood('')
        setEventCost('')
        setEventNote('')
    };

    return (
        <div>
            <div class="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-75"></div>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal flex justify-center items-center md:h-full">
                <div class="relative w-full h-full max-w-3xl md:h-auto">

                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => closeModal(false)}>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="md:px-6 px-4 md:py-6 py-2 lg:px-8">
                            <h3 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add Event</h3>
                            <form class="md:space-y-6 space-y-2" action="#" onSubmit={handleSubmit}>
                                <div class="columns-1 md:columns-2 md:space-y-0 space-y-2">
                                    <div class="md:break-after-column md:space-y-6 space-y-4">
                                        <div>
                                            <label for="Event Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name*</label>
                                            <input type="Event Name" name="Event Name" id="Event Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Tokodai Year-End Party" value={eventName} onChange={(e) => setEventName(e.target.value)} required></input>
                                        </div>
                                        <div>
                                            <label for="Event Location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location*</label>
                                            <input type="Event Location" name="Event Location" id="Event Location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Taki Plaza" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} required></input>
                                        </div>
                                        <div class="grid grid-cols-8 gap-4">
                                            <div class="md:col-span-5 col-span-4">
                                                <label for="Event Date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date*</label>
                                                <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
                                            </div>
                                            <div class="md:col-span-3 col-span-4">
                                                <label for="Event Time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time*</label>
                                                <input type="time" name="Event Time" id="Event Time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="HH:mm" value={eventTime} onChange={(e) => setEventTime(e.target.value)} required></input>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="md:space-y-6 space-y-2">

                                        <div class="grid grid-cols-8 gap-4">
                                            <div class="md:col-span-5 col-span-4">
                                                <label for="Event Tag" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                                                <input type="Event Tag" name="Event Tag" id="Event Tag" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="#dinner #tokodai" value={eventTag} onChange={(e) => setEventTag(e.target.value)} ></input>
                                            </div>
                                            <div class="md:col-span-3 col-span-4">
                                                <label for="Event Capacity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max No. of People</label>
                                                <input type="text" name="Event Capacity" id="Event Capacity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="10" value={eventCapacity} onChange={(e) => setEventCapacity(e.target.value)}></input>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-8 gap-4">
                                            <div class="md:col-span-5 col-span-4">
                                                <label for="Event Food" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Food</label>
                                                <input type="Event Food" name="Event Food" id="Event Food" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Pizza, Yakiniku" value={eventFood} onChange={(e) => setEventFood(e.target.value)} ></input>
                                            </div>
                                            <div class="md:col-span-3 col-span-4">
                                                <label for="Event Cost" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Est. Cost (JPY)</label>
                                                <input type="text" name="Event Cost" id="Event Capacity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="1000-1200" value={eventCost} onChange={(e) => setEventCost(e.target.value)} ></input>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <label for="Event Note" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</label>
                                    <textarea type="Event Note" name="Event Location" id="Event Location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-full md:h-auto p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Write your note here..." value={eventNote} onChange={(e) => setEventNote(e.target.value)}></textarea>
                                </div>
                                <button type="submit" class="w-full text-white bg-[#ff6565] hover:bg-[#E44444] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Event</button>

                            </form>
                        </div>

                    </div>
                </div >
            </div >
        </div >
    )
}

export default Modal;