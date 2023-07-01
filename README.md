# RS-School [CRUD-API TASK](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## Prerequisites
1. Install [Node.js](https://nodejs.org/en/download/) version 18.x.x LTS   
2. Copy git repository: 
```
git clone https://github.com/nick-hard-worker/rs-school-CRUD-API
```
3. Go to folder `rs-school-CRUD-API`
4. Checkout to the development branch:
 ```
git checkout develop
``` 
5. Install all dependencies using `npm install`

---

## Prepare environment(optional)
Create `.env` file or rename `.env-example` file for set environments.

If you didn't it, the application will start at listening port **4000** 

## Run the app
There are 2 modes of running the application (development and production):
 - The **development** mode using `nodemon` - there is an `npm` script `start:dev`
 - The **production** mode builds TypeScript code to the directory `dist` and run it - there is an `npm` script `start:prod`

Check API by path [http://localhost:<your_port>/api/users](http://localhost:4000/api/users)

## Tests 

- You can manually test API using software such as Insomnia, Postman, etc
- You can run autotests (after starting the app) by `npm` script 
```
`npm test`
```
Autotest uses Jest library. 
