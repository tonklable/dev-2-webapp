
import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { CardSection } from './components/card';
import { db } from "./Firebase";
import { connectDatabaseEmulator, onValue, ref, set, push, update, unsubscribe } from "firebase/database";


function CreateEvent(props) {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  // Ping
  return (
    <form onSubmit={handleSubmit} key="CreateEvent">
      <label>
        Event name:
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Event location:
        <input
          type="text"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
      </label>
      <br />
      <label>
        Event date:
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </label>
      <br />
      <button type="text">Create event</button>
    </form>
  )

}

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
            console.log(memberKey);
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
                console.log(currentAttendees);
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


  //   fetch('http://localhost:3001/api/attendees', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       id: props.id,
  //       name: attendeeName,
  //     })
  //   }).then((res) => {
  //     if (res.ok) {
  //       setAttendeeName('');
  //       console.log(attendeeName)
  //       props.updateEventList();
  //     } else {
  //       console.error('An error occurred');
  //     }
  //   })
  //     .then(data => console.log(data))
  // };
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

  // useEffect(() => {
  //   const query = ref(db, "Events");
  //   return onValue(query, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data)
  //     if (snapshot.exists()) {
  //       Object.values(data).map((event) => {
  //         setProjects((events) => [...events, event]);
  //       });
  //     }
  //   });
  // }, []);

  const fetchEvents = async () => {
    const query = ref(db, "Events");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      setEvents([]);
      if (snapshot.exists()) {
        Object.entries(data).forEach((event) => {
          const attendeeID = event[1].attendees;
          console.log(attendeeID);
          if (attendeeID != undefined) {
            const attendeeQuery = ref(db, "Members");
            onValue(attendeeQuery, (snapshot) => {
              if (snapshot.exists()) {
                const attendees = snapshot.val();
                const attendeeNames = attendeeID.map(id => attendees[id].name);
                console.log(attendeeNames);

                setEvents((events) => [...events, { id: event[0], name: event[1].name, location: event[1].location, date: event[1].date, attendees: attendeeNames }]);


              }
            }
            )
          }
          else {
            setEvents((events) => [...events, { id: event[0], name: event[1].name, location: event[1].location, date: event[1].date, attendees: [] }]);

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
      <h1>Create User</h1>
      <CreateUser updateEventList={updateEventList} />
      <br />
      <h1>Create Event</h1>
      <CreateEvent updateEventList={updateEventList} />
      <br />

      <h2>Event List</h2>
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
  const [projects, setProjects] = useState([]);


  return (

    <div>
      {/* <h1>Create Event</h1>
      <CreateEvent />
      <h2>Event List</h2> */}
      {/* <Navbar />
      <CardSection /> */}
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
