import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import CityMap, { countText } from '../components/CityMap'
import dates from '../data/dates'
import { getArcadeColor } from '../data/mapConfig'
import '../css/Locations.css'

const Locations = () => {

    const [locations, setLocations] = useState([])
    const [upcomingCounts, setUpcomingCounts] = useState({})
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        (async () => {
            try {
                const [locationsData, eventsData] = await Promise.all([
                    LocationsAPI.getAllLocations(),
                    EventsAPI.getAllEvents()
                ])

                // count the upcoming events of each arcade, for the map labels
                const counts = {}
                eventsData.forEach(event => {
                    if (!dates.hasEnded(event.date)) {
                        counts[event.location_id] = (counts[event.location_id] ?? 0) + 1
                    }
                })

                setLocations(locationsData)
                setUpcomingCounts(counts)
                setStatus('ready')
            }
            catch (error) {
                console.error(error)
                setStatus('error')
            }
        }) ()
    }, [])

    return (
        <div className='available-locations'>
            <p className='tagline'>Pick an arcade to see what is happening there.</p>

            {status === 'loading' && <p className='page-message'>Loading the city map...</p>}
            {status === 'error' && <p className='page-message'>We could not load the arcades. Please try again later.</p>}

            {
                status === 'ready' &&
                <>
                    <CityMap locations={locations} upcomingCounts={upcomingCounts} />

                    {/* on small phones the map is hard to tap, so these cards show up instead */}
                    <ul className='arcade-cards'>
                        {
                            locations.map(location =>
                                <li key={location.id}>
                                    <Link
                                        to={`/locations/${location.id}`}
                                        className='arcade-card'
                                        style={{ '--arcade': getArcadeColor(location.id) }}
                                    >
                                        <img src={location.image} alt='' />
                                        <strong>{location.name}</strong>
                                        <span>{countText(upcomingCounts[location.id] ?? 0)}</span>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </>
            }

            <Link to='/events' className='button-link'>See all events</Link>
        </div>
    )
}

export default Locations
