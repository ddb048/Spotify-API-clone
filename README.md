# Amplify

Amplify is a clone of Spotify

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

# Spotify Features
## Feature 1: Queue
* logged in users can ADD tracks to the queue, when added, they will appear at the bottom of the queue.
* logged in users can EDIT the order of the queue by dragging a track to the desired place in line.  The page will rerender and display the updated information
* logged in users can DELETE tracks from the queue.  When removed, the page will rerender displaying the changes.
* logged in users can VIEW the queue on the queue details page.
