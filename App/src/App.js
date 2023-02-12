
import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { CardSection } from './components/card';
import { db } from "./Firebase";
import { connectDatabaseEmulator, onValue, ref, set, push, update, unsubscribe } from "firebase/database";
import Modal from "./components/CreateEvent";
import LoginModal from "./components/Login";

function CreateUser(props) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = ref(db, "Members/" + Date.now());
    set(query, {
      name: userName,
      email: userEmail,
    });
    setUserName('');
    setUserEmail('');
  };
  return (
    <form onSubmit={handleSubmit} key="CreateUser">
      <label>
        User name:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <br />
      <label>
        User email:
        <input
          type="text"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </label>
      <br />
      <button type="text">Create user</button>
    </form>
  )

}

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

function EventList() {
  const [events, setEvents] = useState([]);
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

                setEvents((events) => [...events, { id: event[0], name: event[1].name, location: event[1].location, date: event[1].date, time: event[1].time, attendees: attendeeNames }]);


              }
            }
            )
          }
          else {
            setEvents((events) => [...events, { id: event[0], name: event[1].name, location: event[1].location, date: event[1].date, time: event[1].time, attendees: [] }]);

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


      <CardSection events={events} />
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

  console.log(openModal)
  console.log(openLogin)

  return (
    <div>

      {/* <h1>Create Event</h1>
      <CreateEvent />
      <h2>Event List</h2> */}
      <Navbar openModal={setOpenModal} openLogin={setOpenLogin} />
      <br />

      {openModal && <Modal closeModal={setOpenModal} />}
      {openLogin && <LoginModal closeModal={setOpenLogin} />}
      
      <h1>Create User</h1>
      <CreateUser />
      <br />

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
