# code-academy_final-asignment

> by Žilvinas Kančys

## Project setup

### .env file:

Key           | Value
------------- | ---------
DB_PASSWORD   | Database user password
DB_DB         | Database inside the cluster
DB_CLUSTER    | Cluster in which database resides   
DB_PARAMS     | Database parameters    
SERVER_PORT   | Server port 
SECRET        | Secret for JWT generation

## Routes

Method | Route      | Body                                       | Description
------ | ---------- | ------------------------------------------ | ------------------
POST   | /register  | username, password, age, email.            | Registers new user.
POST   | /login     | username, password.                        | Logins existing user (returns token)
GET    | /users     | token.                                     | Gets all users.
GET    | /users/:id | token.                                     | Gets single user by _id.
DELETE | /users     | token, idToDelete.                         | Deletes user (archives it).
PUT    | /users     | token, ?username, ?password, ?age, ?email. | Modifies existing user.
