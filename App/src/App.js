import React, { useState } from 'react';

function CreateEvent(props) {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: eventName,
        location: eventLocation,
        date: eventDate,
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
          {/* <button onClick={() => joinEvent(event.id)}>Join event</button> */}
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
