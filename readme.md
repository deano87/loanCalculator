# Student loan returns calculator

### Video Preview

<iframe width="560" height="315" src="https://www.youtube.com/embed/43Dp8ZtQv8o" frameborder="0" allowfullscreen></iframe>


### Moving Parts

- Client application
- Admin application
- Backend API

Each service runs in its own container, all of which are managed by Docker Compose

### Setup

1. Make sure Docker and Docker Compose are installed on your OS
2. Run
    docker-compose build
    docker-compose up

3. On first run migrate & seed the DB by running
    docker exec -it lumen-php bash
    cd .. && php artisan migrate && php artisan db:seed

4. Access Ports:
  - Client App: 8081
  - Admin App: 8082
  - Backend API: 9086
  - MySQL: 3306

### What is missing

Due to time limitations, no authentication was added to the admin panel (or the backend)
Also, no input validation was added to the admin panel, nor UnitTesting.

Side note: I am actively refactoring the code, as most of it was rushed.
