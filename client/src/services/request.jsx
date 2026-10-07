// shared helper: get JSON from the API, or throw an error that keeps the status code
const request = async (url) => {
    const response = await fetch(url)

    if (!response.ok) {
        const error = new Error(`Request failed with status ${response.status}`)
        error.status = response.status
        throw error
    }

    return response.json()
}

export default request
