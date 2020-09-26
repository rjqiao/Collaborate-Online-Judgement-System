# Collaborate-Online-Judgement-System by Rongjin Qiao


## Environment settings
Install `npm` and `redis`

Then run `redis` as service

## To start

Inside the project direction

If you are running on linux
```
sh ./launch_linux.sh
```
If you are running on Mac
```
sh ./launch.sh
```

The project will be running on localhost:3000

## To start code analysis service

Install `docker`

Run docker as service

Then
```
cd ./executor
docker build --rm -t rjqiao/coj-demo-1 .
mkdir tmp
python2 executor_utils.py
```

the code executor is running on localhost:5000

## Tech Details
### Frontend
The client is build on Angular and typescript.


### Backend
There are two backends.

#### Node server
The first one is Node server.

The Node server provides the frontend with data in JSON format.

##### RESTful API
There are several RESTFUL APIs.
1. `GET  /problems` returns all problems in a list.
2. `POST /problems` add a new problem to the database.
3. `GET  /problems/:id` returns problem with `id`.

##### non-RESTful API
1. `POST /build_and_run` receives Java, C++ and Python code from frontend client and run codes and returns result of codes.

##### Websocket Service for Synchronization
The Node server also provides a websocket service.

The websocket maintains receiving and posting updates from and to frontend browser.

When two or more clients are on, one of them update the code, it sends information containing updates to Node server by websocket, and Node server broadcast updates to all other clients.

## Previews

### Problem list and new problem
![Preview](./previews/ProblemList.png)

### Problem Details
![Preview](./previews/ProblemDetails.png)

### Execute Code
![Preview](./previews/Executing.png)


