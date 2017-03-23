# Student loan returns calculator

### Video Preview

[![Youtube](https://img.youtube.com/vi/43Dp8ZtQv8o/3.jpg)](https://www.youtube.com/watch?v=43Dp8ZtQv8o)

### Moving Parts

- Client application
- Admin application
- Backend API
- MySQL Database

### Technology used

- Each service runs in its own container
- Docker compose manages building/pulling the images and running the containers
- The client and admin applications were built using ReactJS ES6, Redux, and React-Bootstrap, compiled using WebPack
- Both applications are running on a nodeJS server
- The backend API was developed using Lumen (A stripped down version of Laravel 5.4)

### Setup

1. Make sure Docker and Docker Compose are installed on your OS
2. Run

        docker-compose build
        docker-compose up

3. Make sure the Lumen project has a dotenv file in place

4. On first run migrate & seed the DB by running

        docker exec -it lumen-php bash
        cd ..
        php artisan migrate
        php artisan db:seed

  \* Make sure docker client is pointing to the docker machine

5. Access Ports:
  - Client App: 8081
  - Admin App: 8082
  - Backend API: 9086
  - MySQL: 3306

<br>
### What is missing

Due to time limitations, no authentication was added to the admin panel (or the backend)
Also, no input validation was added to the admin panel, nor UnitTesting.

Side note: I am actively refactoring the code.
