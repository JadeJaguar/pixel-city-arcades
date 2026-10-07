import React from 'react'
import { Link } from 'react-router-dom'
import MAP_SPOTS from '../data/mapConfig'
import '../css/CityMap.css'

const countText = (count) => {
    if (count === 0) return 'No upcoming events'
    return `${count} upcoming ${count === 1 ? 'event' : 'events'}`
}

// the base map with the four buildings on top, each one a link to its arcade page
const CityMap = ({ locations, upcomingCounts }) => {
    return (
        <div className='city-map'>
            <img className='city-map-base' src='/images/city-map.webp' alt='' />

            {
                locations.filter(location => MAP_SPOTS[location.id]).map(location => {
                    const spot = MAP_SPOTS[location.id]
                    const count = upcomingCounts[location.id] ?? 0

                    return (
                        <Link
                            key={location.id}
                            to={`/locations/${location.id}`}
                            className='map-building'
                            aria-label={`${location.name}, ${countText(count)}`}
                            style={{
                                '--x': `${spot.left}%`,
                                '--y': `${spot.top}%`,
                                '--w': `${spot.width}%`,
                                '--base-y': `${spot.baseY}%`,
                                '--glow': spot.color
                            }}
                        >
                            <img src={location.image} alt='' />

                            <span className='map-label' aria-hidden='true'>
                                <strong>{location.name}</strong>
                                <span>{countText(count)}</span>
                            </span>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export { countText }
export default CityMap
