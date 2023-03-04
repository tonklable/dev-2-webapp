import React from "react";
import { useState, useEffect } from 'react';
import { db } from "../Firebase";
import { connectDatabaseEmulator, onValue, ref, set, push, update, unsubscribe } from "firebase/database";
import { 
    getAuth,
    signOut,
    GoogleAuthProvider, signInWithRedirect
} from "firebase/auth";

// Real Modal
function LoginModal({ closeModal, openUserSetup }) {

    // Get the default authentication instance for the default Firebase app
    const auth = getAuth();

    const handleGoogleSingIn = () => {
        const provider = new GoogleAuthProvider();

        // Redirect the user to the Google sign-in page
        signInWithRedirect(auth, provider)
            .then(() => {
                console.log("Signed in successfully!")
            })
            .catch((error) => {
                console.error(error);
            });
    }

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
                        <div class="px-6 py-12 lg:px-8">
                            <button type="submit" id="btnSignIn" class="w-full text-white bg-[#ff6565] hover:bg-[#E44444] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={handleGoogleSingIn}>Sign in with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;