import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import dates from '../data/dates'
import '../css/Event.css'

// color is the neon color of the arcade. arcade is optional: pass it to show the arcade name.
const Event = ({ event, color, arcade }) => {

    const [now, setNow] = useState(Date.now())

    const startTime = new Date(event.date).getTime()
    const ended = dates.hasEnded(event.date, now)

    useEffect(() => {
        // a past event never changes, so it needs no timer
        if (startTime <= Date.now()) return

        const timer = setInterval(() => setNow(Date.now()), 1000)

        return () => clearInterval(timer)
    }, [startTime])

    return (
        <article
            className={`event-information${ended ? ' event-ended' : ''}`}
            style={{ '--arcade': color }}
        >
            <img className='event-poster' src={event.image} alt='' />

            <div className='event-text'>
                <p className='event-category'>{event.category}</p>
                <h3>{event.title}</h3>

                <dl className='event-facts'>
                    <div>
                        <dt>When</dt>
                        <dd>{dates.formatDate(event.date)}</dd>
                    </div>
                    <div>
                        <dt>Game</dt>
                        <dd>{event.game}</dd>
                    </div>
                    {
                        arcade &&
                        <div>
                            <dt>Where</dt>
                            <dd><Link to={`/locations/${arcade.id}`}>{arcade.name}</Link></dd>
                        </div>
                    }
                </dl>

                <p className='event-description'>{event.description}</p>

                {
                    ended
                        ? <p className='event-countdown event-countdown-ended'>This event has ended</p>
                        : <p className='event-countdown'>
                            <span>Starts in</span> {dates.formatRemainingTime(startTime - now)}
                        </p>
                }
            </div>
        </article>
    )
}

export default Event
