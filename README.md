# WEB103 Project 3 - *Pixel City Arcades*

Submitted by: **Iman Zahid**

About this web app: **Pixel City is a made up retro neon city with four arcade halls. Pick an arcade on the city map to see its events: tournaments, parties, free play days, and classes. Each event shows a live countdown, and past events are clearly marked.**

Time spent: **7** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [x]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
  - [x] *Note: A non-visual list of links to different locations is insufficient.* 
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [x] An additional page shows all possible events
  - [x] Users can sort *or* filter events by location.
- [x] Events display a countdown showing the time remaining before that event
  - [x] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

The following **additional** features are implemented:

- [x] A layered city map: each arcade building is a real link placed on top of the map, and it grows, lifts, and glows on hover or keyboard focus while the rest of the map gets darker
- [x] Each building shows a label with the arcade name and its number of upcoming events
- [x] The All Events page has both a filter by arcade and a sort by date
- [x] A separate `locations` table, linked to `events` with a foreign key
- [x] Keyboard support with clear focus rings, and no grow or lift animation for users who prefer reduced motion
- [x] A phone layout: large picture cards for the four arcades show under the map on small screens
- [x] A clear "Arcade not found" page for a wrong location URL
- [x] All images converted to WebP to make the site load faster

## Video Walkthrough

