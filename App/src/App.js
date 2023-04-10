
import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { CardSection } from './components/card';
import { db, database } from "./Firebase";
import { connectDatabaseEmulator, onValue, ref, set, push, update, unsubscribe, remove, child, get } from "firebase/database";
import Modal from "./components/CreateEvent";
import FullPage from "./components/FullPage";
import LoginModal from "./components/Login";
import UserSetupModal from './components/UserSetup';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, getDoc, onSnapshot, doc } from "firebase/firestore";

import DeleteEvent from './components/DeleteEvent';

// function CreateUser(props) {
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const query = ref(db, "Members/" + Date.now());
//     set(query, {
//       name: userName,
//       email: userEmail,
//     });
//     setUserName('');
//     setUserEmail('');
//   };
//   return (
//     <form onSubmit={handleSubmit} key="CreateUser">
//       <label>
//         User name:
//         <input
//           type="text"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         User email:
//         <input
//           type="text"
//           value={userEmail}
//           onChange={(e) => setUserEmail(e.target.value)}
//         />
//       </label>
//       <br />
//       <button type="text">Create user</button>
//     </form>
//   )

// }

function JoinEvent(props) {
  const [attendeeName, setAttendeeName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const attendeeQuery = ref(db, "Members");
    onValue(attendeeQuery, (snapshot) => {
      if (snapshot.exists()) {
        const attendees = snapshot.val();
        Object.entries(attendees).forEach(([key, value]) => {
          if (value.name === attendeeName) {
            const memberKey = key;
            const eventQuery = ref(db, "Events/" + props.id);
            onValue(eventQuery, (snapshot) => {
              if (snapshot.exists()) {
                const event = snapshot.val();

                var currentAttendees = event.attendees;

                if (currentAttendees != undefined) {
                  currentAttendees.push(memberKey);
                }
                else {
                  currentAttendees = { 0: memberKey };
                }
                update(eventQuery, { attendees: currentAttendees })
              }
            }, {
              onlyOnce: true
            })
          }
        });

      }
    }
    );


  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Attendee name:
        <input
          type="text"
          value={attendeeName}
          onChange={(e) => setAttendeeName(e.target.value)}
        />
      </label>
      <br />
      <button type="text">Submit</button>
    </form>
  )
}

function EventList(props) {
  const [events, setEvents] = useState([]);
  const [openFullpage, setOpenFullpage] = useState(false)
  const [openDeleteEvent, setDeleteEvent] = useState(false)
  const [pageID, setPageID] = useState()
  const fetchEvents = async () => {
    setEvents([]);
    const eventsTempt = [];
    // console.log('test database')
    // console.log(events)
    const eventsCollection = collection(database, "events");
    // const querySnapshot = await getDocs(eventsCollection);
    onSnapshot(eventsCollection, (querySnapshot) => {

      querySnapshot.forEach((document) => {
        const event = document.data();
        const attendeeIDs = event.attendees;
        const attendees = [];
        const attendeesPromises = [];


        if (Array.isArray(attendeeIDs)) {
          // console.log(attendeeIDs)
          attendeeIDs.forEach(async (id) => {
            // console.log(id)
            const attendeeDoc = doc(database, "users", id)
            const attendeeSnapshot = await getDoc(attendeeDoc);
            // console.log(attendeeSnapshot.data().name);
            attendees.push(attendeeSnapshot.data().name);
            // console.log(attendees)
          });
        }

        eventsTempt.push({
          id: document.id,
          ownerid: event.ownerid,
          name: event.name,
          location: event.location,
          date: event.date,
          capacity: event.capacity,
          food: event.food,
          cost: event.cost,
          tag: event.tag,
          note: event.note,
          time: event.time,
          attendees: attendees,
        });
      });
      setEvents(eventsTempt);

      console.log(events)

    })



    // const query = ref(db, "Events");
    // return onValue(query, (snapshot) => {
    //   const data = snapshot.val();
    //   setEvents([]);
    //   if (snapshot.exists()) {
    //     Object.entries(data).forEach((event) => {
    //       const attendeeID = event[1].attendees;
    //       if (attendeeID != undefined) {
    //         const attendeeQuery = ref(db, "Members");
    //         onValue(attendeeQuery, (snapshot) => {
    //           if (snapshot.exists()) {
    //             const attendees = snapshot.val();
    //             const attendeeNames = attendeeID.map(id => attendees[id].name);

    //             setEvents((events) => [...events, { id: event[0], name: event[1].name, location: event[1].location, date: event[1].date, capacity: event[1].capacity, food: event[1].food, cost: event[1].cost, tag: event[1].tag, note: event[1].note, time: event[1].time, attendees: attendeeNames }]);


    //           }
    //         }
    //         )
    //       }
    //       else {
    //         setEvents((events) => [...events, { id: event[0], name: event[1].name, location: event[1].location, capacity: event[1].capacity, date: event[1].date, food: event[1].food, cost: event[1].cost, time: event[1].time, tag: event[1].tag, note: event[1].note, attendees: [] }]);

    //       }





    //     });
    //   }
    // });


  }


  const updateEventList = () => {
    fetchEvents();
  };

  React.useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {openFullpage && <FullPage closeFP={setOpenFullpage} setDeleteEvent={setDeleteEvent}  events={events} pageID={pageID} userid={props.userid}/>}
      {openDeleteEvent && <DeleteEvent setOpenFullpage={setOpenFullpage} closeDeleteEvent={setDeleteEvent} events={events} pageID={pageID} /> }  
      


      <CardSection events={events} setOpenFullpage={setOpenFullpage} setPageID={setPageID} />
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.name}</h3>
          <p>{event.location}</p>
          <p>{event.date}</p>
          <h4>Attendee</h4>
          <ul>
            {
              event.attendees.map((attendee) => (
                <li key={attendee}>{attendee}</li>
              ))
            }
          </ul>
          <JoinEvent id={event.id} updateEventList={updateEventList} />
          <br />
        </div>
      ))}
    </div>
  )
};

function App() {

  const [openModal, setOpenModal] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openUserSetup, setOpenUserSetup] = useState(false);

  console.log(openModal)
  console.log(openLogin)

  // Users
  const [user, setUser] = useState(null);
  const [userid, setUserID] = useState(null);
  useEffect(() => {
    const auth = getAuth();

    // Track user status
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserID(currentUser.uid);

        // Check if a new user by checking the uid existence in our Firestore db
        const usersRef = collection(database, 'users');
        const userRef = doc(usersRef, currentUser.uid);
        getDoc(userRef).then((doc) => {
          if (!doc.exists()) {
            setOpenUserSetup(true);
          }
        }).catch((error) => {
          console.error(error);
        });
      } else {
        // if no current user
        setUserID(null);
      }
    })
  }, []);

  return (
    <div>
      {/* <button className="openFP" onClick={()=>{setOpenFullpage(true);}}> OpenFP </button> */}


      {/* <h1>Create Event</h1>
      <CreateEvent />
      <h2>Event List</h2> */}
      {/* <Navbar user={user} openModal={setOpenModal} openLogin={setOpenLogin} /> */}
      <Navbar userid={userid} openModal={setOpenModal} openLogin={setOpenLogin} />
      <br />

      {/* conditional rendering */}
      {openModal && <Modal closeModal={setOpenModal} userid={userid} />}

      {openLogin && <LoginModal closeModal={setOpenLogin} openUserSetup={setOpenUserSetup} />}
      {openUserSetup && <UserSetupModal user={user} closeModal={setOpenUserSetup} />}

      {/* <h1>Create User</h1>
      <CreateUser />
      <br /> */}

      <EventList userid={userid} />
      {/* {projects.map((project) => (
        <div>
          <p>{project.name}</p>
          <p>{project.location}</p>
          <p>{project.date}</p>
        </div>
      ))} */}

    </div>
  );
}

export default App;
