import React from "react";
import Datepicker from "tailwind-datepicker-react"
import { useState, useEffect } from 'react';
import { db } from "../Firebase";
import { connectDatabaseEmulator, onValue, ref, set, push, update, unsubscribe } from "firebase/database";


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
    defaultDate: new Date("2022-01-01"),
    language: "en",
}

// Real Modal
function Modal({ closeModal }) {
    const [show, setShow] = useState(false)
    const [selectedDate, setSelectedDate] = useState();
    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState();
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
        console.log(eventDate);
        const query = ref(db, "Events/" + Date.now());
        set(query, {
            name: eventName,
            location: eventLocation,
            date: eventDate
        });
        setEventName('');
        setEventLocation('');
        setEventDate('');

    };

    return (
        <div>
            <div class="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-75"></div>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal flex justify-center items-center md:h-full">
                <div class="relative w-full h-full max-w-md md:h-auto">

                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => closeModal(false)}>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="px-6 py-6 lg:px-8">
                            <h3 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add Event</h3>
                            <form class="space-y-6" action="#" onSubmit={handleSubmit}>
                                <div>
                                    <label for="Event Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Name</label>
                                    <input type="Event Name" name="Event Name" id="Event Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Tokodai Year-End Party" value={eventName} onChange={(e) => setEventName(e.target.value)} required></input>
                                </div>
                                <div>
                                    <label for="Event Location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Location</label>
                                    <input type="Event Location" name="Event Location" id="Event Location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Taki Plaza" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} required></input>
                                </div>
                                <div>
                                    <label for="Event Date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Date</label>
                                    <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
                                </div>
                                {/* <div class="flex justify-between">
                                    <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required></input>
                                        </div>
                                        <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                                    </div>
                                    <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                                </div> */}
                                <button type="submit" class="w-full text-white bg-[#ff6565] hover:bg-[#E44444] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Event</button>
                                {/* <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;