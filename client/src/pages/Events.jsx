import React, { useState, useEffect } from 'react'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import Event from '../components/Event'
import dates from '../data/dates'
import { getArcadeColor } from '../data/mapConfig'
import '../css/Events.css'

const Events = () => {

    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [status, setStatus] = useState('loading')
    const [locationFilter, setLocationFilter] = useState('all')
    const [sortOrder, setSortOrder] = useState('soonest')

    useEffect(() => {
        (async () => {
            try {
                const [eventsData, locationsData] = await Promise.all([
                    EventsAPI.getAllEvents(),
                    LocationsAPI.getAllLocations()
                ])

                setEvents(eventsData)
                setLocations(locationsData)
                setStatus('ready')
            }
            catch (error) {
                console.error(error)
                setStatus('error')
            }
        }) ()
    }, [])

    if (status === 'loading') {
        return <p className='page-message'>Loading the events...</p>
    }

    if (status === 'error') {
        return <p className='page-message'>We could not load the events. Please try again later.</p>
    }

    const filteredEvents = locationFilter === 'all'
        ? events
        : events.filter(event => event.location_id === locationFilter)

    const visibleEvents = sortOrder === 'soonest'
        ? dates.sortUpcomingFirst(filteredEvents)
        : [...filteredEvents].sort((a, b) => new Date(b.date) - new Date(a.date))

    const filterOptions = [{ id: 'all', name: 'All arcades' }, ...locations]

    return (
        <div className='all-events'>
            <h2>All events</h2>

            <div className='event-controls'>
                <div className='filter-buttons' role='group' aria-label='Filter by arcade'>
                    {
                        filterOptions.map(option =>
                            <button
                                key={option.id}
                                type='button'
                                aria-pressed={locationFilter === option.id}
                                style={option.id === 'all' ? undefined : { '--arcade': getArcadeColor(option.id) }}
                                onClick={() => setLocationFilter(option.id)}
                            >
                                {option.name}
                            </button>
                        )
                    }
                </div>

                <label className='sort-select'>
                    Sort by
                    <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                        <option value='soonest'>Soonest first</option>
                        <option value='latest'>Latest date first</option>
                    </select>
                </label>
            </div>

            {
                visibleEvents.length > 0
                    ? <ul className='event-list'>
                        {
                            visibleEvents.map(event =>
                                <li key={event.id}>
                                    <Event
                                        event={event}
                                        color={getArcadeColor(event.location_id)}
                                        arcade={locations.find(location => location.id === event.location_id)}
                                    />
                                </li>
                            )
                        }
                    </ul>
                    : <p>No events at this arcade yet.</p>
            }
        </div>
    )
}

export default Events
