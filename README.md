# Amplify

Amplify is a clone of Spotify

check out the live link at: https://amplifydb.onrender.com/

## Tech Stack

[<img src="https://user-images.githubusercontent.com/105324675/190725431-5033a82c-51ff-4a9a-b9ff-48ad606a2a5e.svg" width="75" height="75">](https://www.javascript.com/) [<img src="https://user-images.githubusercontent.com/105324675/190726531-63e5fa0c-5e9a-4e12-a4df-ac578bdfefb3.svg" width="75" height="75">](https://whatwg.org/) [<img src="https://user-images.githubusercontent.com/105324675/190727242-21af03e1-b793-4257-bdc5-14996fb8da63.svg" width="75" height="75">](https://www.css3.com/) [<img src="https://user-images.githubusercontent.com/105324675/190727472-da7d5a51-ef2e-4f71-b90c-333debd2d147.svg" width="75" height="75">](https://reactjs.org/) [<img src="https://user-images.githubusercontent.com/105324675/190727697-f61e28b7-1597-4be0-9dc4-dbc443790f86.svg" width="75" height="75">](https://redux.js.org/) [<img src="https://user-images.githubusercontent.com/105324675/190729715-5aeed1a2-0914-413e-ac4b-de23aa7ed802.svg" width="75" height="75">](https://nodejs.org/en) [<img src="https://user-images.githubusercontent.com/105324675/190729918-773ddf18-90d3-4d52-aa81-c02731d413bf.svg" width="75" height="75">](https://www.npmjs.com/)


## Database
[<img src="https://user-images.githubusercontent.com/105324675/190727354-8f322958-5b34-4c96-b052-358d06d0d9ef.svg" width="75" height="75">](https://www.postgresql.org)

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## MVP Feature List

# New account creation, log-in, log-out, and Guest/Demo login
* Users can sign up, login logout.
* Users can use a demo login to try the site

* logged in users are directed to the main page which displays their playlists,
Artists they've liked, albums they liked, songs they liked.

# Hosting on Render
![Cursor_and_Amplify](https://user-images.githubusercontent.com/106298312/205641584-f2fc2607-ecfb-4fb7-9dc6-5272632c4217.png)
![Cursor_and_Amplify-2](https://user-images.githubusercontent.com/106298312/205641615-2fadcd28-1859-43a8-a7eb-628bd8811a8f.png)

# Spotify Features
## Feature 1: Queue
* logged in users can ADD tracks to the queue, when added, they will appear at the bottom of the queue.
* logged in users can EDIT the order of the queue by dragging a track to the desired place in line.  The page will rerender and display the updated information
* logged in users can DELETE tracks from the queue.  When removed, the
 page will rerender displaying the changes.
* logged in users can VIEW the queue on the queue details page.
![Cursor_and_Amplify](https://user-images.githubusercontent.com/106298312/205641456-1cc7894a-64f9-44b6-81eb-c53f605a6feb.png)
![Cursor_and_Amplify](https://user-images.githubusercontent.com/106298312/205646407-b69464aa-f723-45cb-92d2-a2d76022f820.png)


# Future Plans

* I plan to add a search feature to better allow the traversal of the application as well as refactoring for speed in postGreSQL

