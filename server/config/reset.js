import { pool } from './database.js'
import locationData from '../data/locations.js'
import eventData from '../data/events.js'

const createTables = async () => {
    // events points to locations, so drop events first and create it last
    const createTablesQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            address VARCHAR(200),
            description TEXT,
            specialty VARCHAR(100),
            image VARCHAR(255)
        );

        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            date TIMESTAMP NOT NULL,
            game VARCHAR(100),
            category VARCHAR(50),
            description TEXT,
            image VARCHAR(255),
            location_id INTEGER REFERENCES locations(id)
        );
    `

    await pool.query(createTablesQuery)
    console.log('🎉 locations and events tables created successfully')
}

const seedLocationsTable = async () => {
    const insertQuery = {
        text: 'INSERT INTO locations (name, address, description, specialty, image) VALUES ($1, $2, $3, $4, $5)'
    }

    // insert one at a time, so the ids follow the order in the data file
    for (const location of locationData) {
        const values = [
            location.name,
            location.address,
            location.description,
            location.specialty,
            location.image
        ]

        await pool.query(insertQuery, values)
        console.log(`✅ ${location.name} added successfully`)
    }
}

const seedEventsTable = async () => {
    const insertQuery = {
        text: 'INSERT INTO events (title, date, game, category, description, image, location_id) VALUES ($1, $2, $3, $4, $5, $6, $7)'
    }

    for (const event of eventData) {
        const values = [
            event.title,
            event.date,
            event.game,
            event.category,
            event.description,
            event.image,
            event.location_id
        ]

        await pool.query(insertQuery, values)
        console.log(`✅ ${event.title} added successfully`)
    }
}

const reset = async () => {
    try {
        await createTables()
        await seedLocationsTable()
        await seedEventsTable()
    }
    catch (error) {
        console.error('⚠️ error resetting the database', error)
        process.exitCode = 1
    }
    finally {
        await pool.end()
    }
}

reset()
