import request from './request'

const getAllLocations = () => request('/api/locations')

const getLocationById = (id) => request(`/api/locations/${id}`)

export default {
    getAllLocations,
    getLocationById
}
