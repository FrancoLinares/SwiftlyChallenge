# Swiftly Challenge

## Project Overview

ReactJS+Vite project that shows in an understandable way the data of the Characters of the Star Wars movies and a search bar where you can filter by character name, homeworld or species.

For this we use the Star Wars API - https://swapi.dev/documentation#intro

_Requirements:_
Develop a webpage that presents a grid of character profile cards sourced from the Star Wars API.

- Utilize the Star Wars API resources:
- People: https://swapi.dev/documentation#people
- Planets: https://swapi.dev/documentation#planets
- Species: https://swapi.dev/documentation#species
- Implement search functionality allowing users to search for characters by name, homeworld, or species using the search API for each resource.
- Ensure the profile card displays the person’s name, homeworld name, and species name.
- At the top of the profile page, include a search bar. Render a grid of profile cards that match the reflected search. If there are no results, show a message stating there are no results.
- Support both the person’s name, homeworld name, and species as searchable criteria. Show the results for a person’s name first, then homeworld, then species.

## Project Details

Scalability:

- Create hooks for each resource, this way it is much simpler to implement each resource in other components.
- Clear separation of each component, in which responsibilities are well defined.
- Separation in files/folders for each functionality, I think it is important to separate the constants/strings because it allows to modify only once the content applied in other components. Also the content is grouped and it would be simpler to implement internationalization.
- Separating the functions that communicate with the server helps understanding and maintainability.
- Caching

Maintainability:

- Separating tests into folders helps organize the project, giving predictability and aiding maintainability.
- The creation of custom hooks helps to isolate logic and state, by separating the logic from the component you can quickly understand the code and increases maintainability, as it simplifies the search and gives context to those who read the code.
- Adding JSDocs and comments within the code helps to understand the code and increases cooperation between co-workers. I am a believer that code should be self-descriptive, but I see great value in comments for complex functions or very long blocks of code.

## Installation Instructions

Run `yarn install` to install dependencies

Run `yarn dev` to start the app

Happy coding!

To create the build use `yarn build`

After the build, you can run `yarn preview` to preview the app in the browser

## URL of the deployed project

https://FrancoLinares.github.io/SwiftlyChallenge

## Usage Guide

After installing and running the app, you can now use the app to search for your favorite Characters.

The default URL is: http://localhost:5173/

When you enter the URL you will be able to see the list of Characters, you can use paging to scroll through the list.
You can also use the search engine to find the Character, you can filter by person's name, homeworld name, and species name. They will be displayed in that order.

## Interesting implementations - Aggregates

- Caching
- TanStack Query
- Pagination
- Error handling
- Skeletons
- Nice UI
- 100% Typescript coverage

### Implementations I would have liked to perform

- Add more unit tests, 80% coverage would be good
- Lazy loading para componentes - Code Splitting
- Add E2E test - Playwright
