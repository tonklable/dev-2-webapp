import React, { useState } from 'react';
import Fire from './Firebase.js';

function CreateEvent(props) {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    // writeEventData(eventName, eventLocation, eventDate)
    // const saveToFirebase = FireBase.firestore();
    // saveToFirebase.collection("Events").add({
    //   id: uuidv4(),
    //   EventName: eventName,
    //   EventLocation: eventLocation,
    //   EventDate: eventDate,

    // })


    fetch('http://localhost:3001/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: eventName,
        location: eventLocation,
        date: eventDate,
        attendees: []
      })
    }).then((res) => {
      if (res.ok) {
        setEventName('');
        setEventLocation('');
        setEventDate('');
        // console.log(res)
        props.updateEventList();

      } else {
        console.error('An error occurred');
      }
    })
      .then(data => console.log(data))
  };
  return (
    <form onSubmit={handleSubmit}>
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

function JoinEvent(props) {
  const [attendeeName, setAttendeeName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/api/attendees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: props.id,
        name: attendeeName,
      })
    }).then((res) => {
      if (res.ok) {
        setAttendeeName('');
        console.log(attendeeName)
        props.updateEventList();
      } else {
        console.error('An error occurred');
      }
    })
      .then(data => console.log(data))
  };
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
    try {
      const res = await fetch('http://localhost:3001/api/events');
      const data = await res.json();
      console.log(data)
      setEvents(data)
    } catch (error) {
      console.error(error);
    }
  }


  const updateEventList = () => {
    fetchEvents();
  };

  React.useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Create Event</h1>
      <CreateEvent updateEventList={updateEventList} />
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
        </div>
      ))}
    </div>
  )
};

function App() {
  return (
    <div>
      {/* <h1>Create Event</h1>
      <CreateEvent />
      <h2>Event List</h2> */}
      <EventList />
    </div>
  );
}

export default App;
