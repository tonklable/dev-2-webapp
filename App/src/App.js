
import React, { useState, useEffect, useMemo } from 'react';
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
import MapComponent from './components/MapComponent';
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
    onSnapshot(eventsCollection, async (querySnapshot) => {
      const processDocument = async (document) => {
        const event = document.data();
        const attendeeIDs = event.attendees;
        const attendees = [];

        if (Array.isArray(attendeeIDs)) {
          const attendeePromises = attendeeIDs.map(async (id) => {
            console.log('ID:', id);
            const usersCollection = collection(database, 'users');
            const userDocRef = doc(usersCollection, id);
            return new Promise((resolve) => {
              onSnapshot(userDocRef, (doc) => {
                if (doc.exists) {
                  const user = doc.data();
                  console.log('User data:', user);

                  if (user && user.name) {
                    const name = user.name;
                    console.log('Name:', name);
                    resolve(name);
                  } else {
                    resolve(null);
                  }
                } else {
                  resolve(null);
                }
              });
            });
          });

          const attendeeNames = await Promise.all(attendeePromises);
          attendeeNames.forEach((name) => {
            if (name) {
              attendees.push(name);
            }
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
      };

      const documentPromises = querySnapshot.docs.map(processDocument);
      await Promise.all(documentPromises);
      setEvents(eventsTempt);
      console.log(events);
    })


  }


  const updateEventList = () => {
    fetchEvents();
  };

  React.useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {openFullpage && <FullPage closeFP={setOpenFullpage} setDeleteEvent={setDeleteEvent} events={events} pageID={pageID} userid={props.userid} openLogin={props.setOpenLogin} />}
      {openDeleteEvent && <DeleteEvent setOpenFullpage={setOpenFullpage} closeDeleteEvent={setDeleteEvent} events={events} pageID={pageID} />}



      <CardSection events={events} setOpenFullpage={setOpenFullpage} setPageID={setPageID} />
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
      <Navbar userid={userid} user={user} openModal={setOpenModal} openLogin={setOpenLogin} />
      <br />

      {/* conditional rendering */}
      {openModal && <Modal closeModal={setOpenModal} userid={userid} />}

      {openLogin && <LoginModal closeModal={setOpenLogin} openUserSetup={setOpenUserSetup} />}
      {openUserSetup && <UserSetupModal user={user} closeModal={setOpenUserSetup} />}

      {/* <h1>Create User</h1>
      <CreateUser />
      <br /> */}

      <EventList userid={userid} setOpenLogin={setOpenLogin} />
      {/* {projects.map((project) => (
        <div>
          <p>{project.name}</p>
          <p>{project.location}</p>
          <p>{project.date}</p>
        </div>
      ))} */}

      <MapComponent />

    </div>
  );
}

export default App;
