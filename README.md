# RS School REST service with Docker

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker -  [Download & Install Docker] (https://docs.docker.com/engine/install/)

## Downloading

```
git clone https://github.com/Kkasya/rest-service -b docker
```

## Installing NPM modules

```
npm install
```

## Running application

```
docker compose up
```

## Testing

After application running open new terminal and enter:

To restart the app change some code like console.log in app.ts

```
console.log(Hi, guest!)
```

To restart the container add an error to app.ts

```
throw Error('Oop')

