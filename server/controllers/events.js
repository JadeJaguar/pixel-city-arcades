import { pool } from '../config/database.js'

const getEvents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY date ASC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getEventById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        if (Number.isNaN(id)) {
            return res.status(404).json({ error: 'Event not found' })
        }

        const results = await pool.query('SELECT * FROM events WHERE id = $1', [id])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }

        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getEventsByLocation = async (req, res) => {
    try {
        const locationId = parseInt(req.params.id)

        if (Number.isNaN(locationId)) {
            return res.status(404).json({ error: 'Location not found' })
        }

        // check the location first, so a wrong id gives 404 and not an empty list
        const location = await pool.query('SELECT id FROM locations WHERE id = $1', [locationId])

        if (location.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' })
        }

        const results = await pool.query('SELECT * FROM events WHERE location_id = $1 ORDER BY date ASC', [locationId])
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default {
    getEvents,
    getEventById,
    getEventsByLocation
}
