
import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { CardSection } from './components/card';
import { db } from "./Firebase";
import { connectDatabaseEmulator, onValue, ref, set, push, update, unsubscribe, child, get} from "firebase/database";
import Modal from "./components/CreateEvent";
import FullPage from "./components/FullPage";
import LoginModal from "./components/Login";
import UserSetupModal from './components/UserSetup';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
  const [pageID, setPageID] = useState()
  const fetchEvents = async () => {
    const query = ref(db, "Events");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      setEvents([]);
      if (snapshot.exists()) {
        Object.entries(data).forEach((event) => {
          const attendeeID = event[1].attendees;
          if (attendeeID != undefined) {
            const attendeeQuery = ref(db, "Members");
            onValue(attendeeQuery, (snapshot) => {
              if (snapshot.exists()) {
                const attendees = snapshot.val();
                const attendeeNames = attendeeID.map(id => attendees[id].name);

                setEvents((events) => [...events, { id: event[0], name: event[1].name, location: event[1].location, date: event[1].date, capacity:event[1].capacity, food:event[1].food,cost:event[1].cost,tag:event[1].tag,note:event[1].note,time:event[1].time, attendees: attendeeNames }]);


              }
            }
            )
          }
          else {
            setEvents((events) => [...events, { id: event[0], name: event[1].name, location: event[1].location, capacity:event[1].capacity, date: event[1].date,food:event[1].food,cost:event[1].cost,time:event[1].time,tag:event[1].tag,note:event[1].note,attendees: [] }]);

          }





        });
      }
    });
  }


  const updateEventList = () => {
    fetchEvents();
  };

  React.useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {openFullpage && <FullPage closeFP={setOpenFullpage}  events={events} pageID={pageID} />}


      <CardSection events={events} setOpenFullpage={setOpenFullpage} setPageID={setPageID}/>
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

  // track user status
  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // // Check if this is a new user by checking creation time and last sign in time
        // if (currentUser.metadata.creationTime === currentUser.metadata.lastSignInTime) {
        //   // This is a new user, so redirect them to the modal component for filling out their display name and username
        //   // history.push('/modal');
        //   setOpenUserSetup(true);
        // }

        // Check if a new user by checking the uid existence in our db
        const usersRef = ref(db, 'Members');
        const userRef = child(usersRef, currentUser.uid);
        get(userRef).then((snapshot) => {
          if (!snapshot.exists()) {
            setOpenUserSetup(true);
          }
        }, (error) => {
          console.error(error);
        });
        
      }
    })
  }, []);

  return (
    <div>
      {/* <button className="openFP" onClick={()=>{setOpenFullpage(true);}}> OpenFP </button> */}
      

      {/* <h1>Create Event</h1>
      <CreateEvent />
      <h2>Event List</h2> */}
      <Navbar user={user} openModal={setOpenModal} openLogin={setOpenLogin}/>
      <br />

      {/* conditional rendering */}
      {openModal && <Modal closeModal={setOpenModal} />}
      {openLogin && <LoginModal closeModal={setOpenLogin} openUserSetup={setOpenUserSetup} />}
      {openUserSetup && <UserSetupModal user={user} closeModal={setOpenUserSetup} />}
      
      {/* <h1>Create User</h1>
      <CreateUser />
      <br /> */}

      <EventList />
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
