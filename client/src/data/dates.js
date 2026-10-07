const formatDate = (date) =>
    new Date(date).toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    })

const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`

// turns milliseconds into text like "3 days, 4 hours, 12 minutes"
const formatRemainingTime = (milliseconds) => {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000))
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    // in the last hour, show seconds too
    if (days === 0 && hours === 0) {
        return `${plural(minutes, 'minute')}, ${plural(seconds, 'second')}`
    }

    const parts = []
    if (days > 0) parts.push(plural(days, 'day'))
    parts.push(plural(hours, 'hour'))
    parts.push(plural(minutes, 'minute'))

    return parts.join(', ')
}

const hasEnded = (date, now = Date.now()) => new Date(date).getTime() <= now

// upcoming events first (soonest on top), then past events (most recent on top)
const sortUpcomingFirst = (events, now = Date.now()) => {
    const time = (event) => new Date(event.date).getTime()
    const upcoming = events.filter(event => !hasEnded(event.date, now)).sort((a, b) => time(a) - time(b))
    const past = events.filter(event => hasEnded(event.date, now)).sort((a, b) => time(b) - time(a))

    return [...upcoming, ...past]
}

export default {
    formatDate,
    formatRemainingTime,
    hasEnded,
    sortUpcomingFirst
}
