import request from './request'

const getAllEvents = () => request('/api/events')

const getEventById = (id) => request(`/api/events/${id}`)

const getEventsByLocation = (locationId) => request(`/api/locations/${locationId}/events`)

export default {
    getAllEvents,
    getEventById,
    getEventsByLocation
}
