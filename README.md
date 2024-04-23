# Swiftly Challenge

## Project Overview

ReactJS+Vite project that shows in an understandable way the data of the Characters of the Star Wars movies and a search bar where you can filter by character name, homeworld or species.

For this we use the Star Wars API - https://swapi.dev/documentation#intro

_Requirements:_
Develop a webpage that presents a grid of character profile cards sourced from the Star Wars API.
● Utilize the Star Wars API resources:
● People: https://swapi.dev/documentation#people
● Planets: https://swapi.dev/documentation#planets
● Species: https://swapi.dev/documentation#species
● Implement search functionality allowing users to search for characters by name, homeworld, or species using the search API for each resource.
● Ensure the profile card displays the person’s name, homeworld name, and species name.
● At the top of the profile page, include a search bar. Render a grid of profile cards that match the reflected search. If there are no results, show a message stating there are no results.
● Support both the person’s name, homeworld name, and species as searchable criteria. Show the results for a person’s name first, then homeworld, then species.

## Project Details

In order to carry out this project, scalability and backend independence were the main considerations.
Due to the fact that the search bar requirements use the search API for _each resource_ , having to force the execution of all the API resources in the search, a more custom and complex fetching system was implemented, since this forces us to make Planet and Species requests to obtain the Characters IDs.

The most user friendly solution with this API (which does not let you search by ID [nor has ID]) and has little information, would be to create an initial RootQuery that provides most of the Characters (using its pagination) with their Planets and Species.
This avoids several problems and more fluidity, since all the data is in the local cache.

Implementations details:

Due to the required implementation, a proprietary cache system was implemented to avoid unnecessary requests.
This exponentially increases the fluidity and efficiency of the project.
Providers were not used to reduce latency and due to time issues.

## Installation Instructions

Run `yarn install` to install dependencies

Run `yarn dev` to start the app

Happy coding!

To create the build use `yarn build`

After the build, you can run `yarn preview` to preview the app in the browser

## Usage Guide

After installing and running the app, you can now use the app to search for your favorite Characters.

The default URL is: http://localhost:5173/

When you enter the URL you will be able to see the list of Characters, you can use paging to scroll through the list.
You can also use the search engine to find the Character, you can filter by person's name, homeworld name, and species name. They will be displayed in that order.

## Interesting implementations - Aggregates

- Caching
- Pagination
- Error handling
- Skeletons
- Nice UI

### Implementations I would have liked to perform

- Add more unit tests, 80% coverage would be good
- Lazy loading para componentes - Dividir código
- Add E2E test - Playwright
- Implement libraries such as ReactQuery to increase productivity and scalability
