# Data History Platform - Integration with LP Historical Data APIs

This project aims to integrate LP Historical Data to allow users to maximalize the historical APIs offer at [Liveperson Developers](https://developers.liveperson.com/). 

## Getting Started

First, make sure you have Node installed on your computer. For installation, you can visit [Node JS](https://nodejs.org/en/download/) for the download. Then run
```
npm install --save
```
to install all of the out-of-the-box dependencies that this application is built on. 

Run `npm start` for a dev server to spin up the angular app. Navigate to `http://localhost:4200/`. Run `npm run serve` to start up the application (both angular and nestjs builds). The app will automatically reload if you change any of the source files. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Description

Customer service data is essential to how companies are able to analyze and improve upon how they are interacting with their customers. Even though LivePerson offers historical APIs out of the box to be able to retrieve all of the accumulated data per chat, it is difficult to map the data out from the structured content.

This is where the data visualization tool comes in handy. To be able to visualize LP data allows for brands to follow a storyline and even track keywords so that they can offer their customers a better experience.

The project primarily visualizes MCS data over set periods of time, maps a hierarchy of skills that messages are sourcing through, and agent conversation-mcs storylines.

## Overview

### Integrations

- [x] Login Domain API
- [x] Messaging Interaction History API
- [x] Engagement History API
- [x] Agents API
- [x] Skills API
- [x] Agent Groups API

### Features

- [x] JWT + LP Auth2 Login
- [x] Agent MCS Progression per conversation Visualization
- [x] Skills Usage Visualization
- [x] Average Agent MCS-to-chat-count Metrics Visualization
- [x] Chronology of chatMCS Visualization
- [x] Full EngHist Querying Mechanism
- [x] Full MsgIntHist Querying Mechanism
- [ ] Transcript Visualization
- [ ] Structured Data Visualization
- [ ] Structured Data Download Buttons

### Solution

* Track MCS outliers per period of sales
* Track sources from where customers primarily interact and/or if rises and dips varies across times, products, etc.
* General Data analytics for improvement on bot dialogs

## Additional Documentation

For additional documentation, refer to the LivePerson developer tools:

- [Engagement History](https://developers.liveperson.com/engagement-history-api-overview.html)
- [Messaging Interaction History](https://developers.liveperson.com/messaging-interactions-api-overview.html)
- [Users](https://developers.liveperson.com/users-api-overview.html)
- [Profiles](https://developers.liveperson.com/profiles-api-overview.html)
- [Skills](https://developers.liveperson.com/skills-api-overview.html)

Be sure also to visit each the Overview, Methods, Appendix and Engagment Attributes (respectively) for the full-fledged reference.

