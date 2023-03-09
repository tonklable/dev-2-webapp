import React, { useState, useEffect } from 'react';
import { Search, Filter } from '../assets/icons'
import { getAuth, signOut} from "firebase/auth";
import { database } from "../Firebase";
// import { connectDatabaseEmulator, onValue, ref, set, push, update, unsubscribe } from "firebase/database";
import { collection, getDoc, doc} from "firebase/firestore";

function Navbar ({ userid, openModal, openLogin }) {
    const auth = getAuth();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Signed out.")
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    // retrieve username value from firestore based on uid
    const [username, setUsername] = useState("");
    const usersRef = collection(database, 'users');
    const userRef = userid ? doc(usersRef, userid) : null;

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
      }, [usersRef, userid]);
    
    return (
        <>
            <div class="h-[75px] bg-[#f1c470] drop-shadow-lg">
                <div class="h-[70px] bg-[#ff6565] flex flex-wrap items-center">
                    {/* <h1 class='ml-3 text-3xl text-white font-poppins font-bold'>TyTime</h1> */}
                    <div class="grid grid-cols-12 sm:gap-2 gap-x-2 gap-y-0">

                        <div class="items-center col-span-1"><h1 class='ml-3 text-3xl text-white font-poppins font-bold'>TyTime</h1></div>
                        <div class="flex justify-end items-center h-full mr-3 col-start-10 col-span-3 sm:col-start-11 sm:col-span-2">
                            {userid ?
                                <span class="text-right mr-3">
                                    <p class="font-semibold">Welcome, {username}!</p>
                                    <button class="bg-transparent hover:underline text-white" onClick={handleSignOut}>sign out</button>
                                </span>
                                // <button class="bg-transparent hover:bg-white text-white font-semibold hover:text-[#ff6565] py-2 px-4 border border-white rounded-full"
                                //         onClick={handleSignOut}>Sign Out</button>
                                :
                                <button class="bg-transparent hover:bg-white text-white font-semibold hover:text-[#ff6565] py-2 px-4 border border-white rounded-full"
                                        onClick={() => { openLogin(true) }}>Sign In</button>
                            }
                        </div>
                    </div>

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