import React from "react";
import { useState, useEffect } from 'react';
import { db, database } from "../Firebase";
// import { connectDatabaseEmulator, onValue, ref, set, push, update, unsubscribe } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";

function UserSetupModal({ user, closeModal }) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState(user.email);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const userDocRef = doc(database, 'users', user.uid);
      setDoc(userDocRef, {
        email: userEmail,
        name: userName,
      })
      setUserName('');
      setUserEmail('');
      closeModal(false);
    };

    return (
        <div>
            <div class="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-75"></div>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal flex justify-center items-center md:h-full">
                <div class="relative w-full h-full max-w-md md:h-auto">

                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="px-6 py-6 lg:px-8">
                            <h3 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Profile Setup</h3>
                            <form class="space-y-6" action="#" onSubmit={handleSubmit}>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                        value={user.email}
                                        readonly
                                    />
                                </div>
                                <div>
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                        placeholder="Taro Tokodai" 
                                        value={userName} 
                                        onChange={(e) => setUserName(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <button type="submit" id="btnSignup" class="w-full text-white bg-[#ff6565] hover:bg-[#E44444] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSetupModal;