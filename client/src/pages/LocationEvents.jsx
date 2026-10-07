import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import Event from '../components/Event'
import dates from '../data/dates'
import { getArcadeColor } from '../data/mapConfig'
import '../css/LocationEvents.css'

const LocationEvents = () => {
    const { id } = useParams()

    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        // if the user moves to another arcade before this one loads, ignore the old answer
        let ignore = false

        setStatus('loading')

        ;(async () => {
            try {
                const [locationData, eventsData] = await Promise.all([
                    LocationsAPI.getLocationById(id),
                    EventsAPI.getEventsByLocation(id)
                ])

                if (ignore) return

                setLocation(locationData)
                setEvents(dates.sortUpcomingFirst(eventsData))
                setStatus('ready')
            }
            catch (error) {
                if (ignore) return

                if (error.status !== 404) console.error(error)
                setStatus(error.status === 404 ? 'not-found' : 'error')
            }
        }) ()

        return () => { ignore = true }
    }, [id])

    if (status === 'loading') {
        return <p className='page-message'>Loading the arcade...</p>
    }

    if (status !== 'ready') {
        return (
            <div className='page-message'>
                <h2>{status === 'not-found' ? 'Arcade not found' : 'Something went wrong'}</h2>
                <p>
                    {
                        status === 'not-found'
                            ? 'There is no arcade at this address.'
                            : 'We could not load this arcade. Please try again later.'
                    }
                </p>
                <Link to='/' className='text-link'>Back to the map</Link>
            </div>
        )
    }

    const color = getArcadeColor(location.id)

    return (
        <div className='location-events' style={{ '--arcade': color }}>
            <Link to='/' className='text-link'>Back to the map</Link>

            <header>
                <div className='location-image'>
                    <img src={location.image} alt='' />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p className='location-specialty'>{location.specialty}</p>
                    <p className='location-address'>{location.address}</p>
                    <p>{location.description}</p>
                </div>
            </header>

            <section>
                <h3 className='section-title'>Events at this arcade</h3>

                {
                    events.length > 0
                        ? <ul className='event-list'>
                            {
                                events.map(event =>
                                    <li key={event.id}>
                                        <Event event={event} color={color} />
                                    </li>
                                )
                            }
                        </ul>
                        : <p>No events at this arcade yet.</p>
                }
            </section>
        </div>
    )
}

export default LocationEvents
