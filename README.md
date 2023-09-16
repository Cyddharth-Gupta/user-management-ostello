# Minimal User Management using Express.js and PostgreSQL

## Getting Started

Here is what you need to get it up and running:

## Pre-requisite

1. A running PostgreSQL Server
2. An empty DB on the PostgreSQL
3. `node` and `npm` installed
4. Postman or cURL (for testing the API)
5. A free `8080` PORT (you may change the port in `server.js`)
    

## Installation

1. Clone the repo
    

``` bash
git clone https://github.com/Cyddharth-Gupta/user-management-ostello.git
cd user-management-ostello.git

 ```

1. Install the dependencies
    

``` bash
npm install

 ```

## Configuration

You will have to update some values in `config/db.config.js`

| key | description |
| --- | --- |
| HOST | your host address on which postgreSQL is installed. Most probably `localhost` |
| USER | Username of the postgreSQL User (default: `admin`) |
| PASSWORD | Password to the PostgreSQL User. You might have to set this via `\password username` command of PostgreSQL Shell |
| DB | The DB Name of the empty DB you created in the second step of Pre-requisites |

## Let's Go

You are now ready to start the API Server. Run the following command from the root of the repository:

``` bash
npm start

 ```

## Demo

Here is a test run with output:

> Remember to set `Content-Type` to `application/json` for requests with body 
  

### Test Route

#### Request

``` bash
curl --location --request GET 'https://user-management-ostello-1fe42ef9dda9.herokuapp.com/'

 ```

#### Response

``` json
{
    "message": "Welcome to Login System",
    "developer": {
        "name": "Siddharth Gupta",
        "alias": "cyddharth"
    }
}

 ```

### Get All Users

#### Request

``` bash
curl --location --request POST 'https://user-management-ostello-1fe42ef9dda9.herokuapp.com/api/users/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "siddharth",
    "email": "siddharth@gmail.com",
    "password": "Test@1"
}'

 ```

#### Response

``` json
{
    "message": "Signup Successful!",
    "data": {
        "id": 4,
        "username": "siddharth",
        "email": "siddharth@gmail.com",
        "updatedAt": "2023-09-16T06:10:38.273Z",
        "createdAt": "2023-09-16T06:10:38.273Z"
    }
}

 ```

### Get User by Id

#### Request

``` bash
curl --location --request POST 'https://user-management-ostello-1fe42ef9dda9.herokuapp.com/api/users/3' \
--header 'Content-Type: application/json' \
--data-raw '{
}'

 ```

#### Response

``` json
{
    {
        "id": 3,
        "username": "siddharth",
        "email": "siddharth@gmail.com",
        "updatedAt": "2023-09-16T06:10:38.273Z",
        "createdAt": "2023-09-16T06:10:38.273Z"
    }
}

 ```

### Login (this needs to be done before deleting yourself)

#### Request

``` bash
curl --location --request POST 'https://user-management-ostello-1fe42ef9dda9.herokuapp.com/api/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "siddharth",
    "password": "Test@1"
}'

 ```

#### Response

``` json
{
    "message": "Login Successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzdGF5eWFiIiwiZW1haWwiOiJjc3RheXlhYkBnbWFpbC5jb20iLCJpYXQiOjE2MTk0MDcwMTl9.AdPWIFeT0W89lUO85e9jyqJRqxV9ac7mJ4sdqmvPWQA"
}

 ```

### Edit User details

``` bash
curl --location --request PUT 'https://user-management-ostello-1fe42ef9dda9.herokuapp.com/api/users/8' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9zdGVsbG8iLCJlbWFpbCI6Im9zdGVsbG9AZ21haWwiLCJpYXQiOjE2OTQ4NTU4MDJ9.JnflRm3u40whQfKvHxEu4UeLmZ7kFUf3Z-QFbd29OC4' \
--data-raw '{
    "username": "ostellooooo",
    "email":"ostello@gmail",
    "password":"ostello1"
}'

 ```

#### Response

``` json
{
    "message": "User updated successfully",
    "user": {
        "id": 8,
        "username": "ostellooooo",
        "email": "ostello@gmail",
        "createdAt": "2023-09-16T09:22:55.472Z",
        "updatedAt": "2023-09-16T09:23:33.416Z"
    }
}

 ```

### Delete user (this verifies if the user trying to delete is itself, if not it will return an error)

``` bash
curl --location --request DELETE 'https://user-management-ostello-1fe42ef9dda9.herokuapp.com/api/users/7' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9zdGVsbG8iLCJlbWFpbCI6Im9zdGVsbG9AZ21haWwiLCJpYXQiOjE2OTQ4NTYxNDF9.TBhL9UOdQwAfnRhl5aN4pI4sqWrcaZKTMO1dAtrG2R8' \
--data ''

 ```

#### Response

No response for successful deletion

### Change Password

> This route is for when user is already logged in and want to update their password. 
  

#### Request

``` bash
curl --location --request POST 'https://user-management-ostello-1fe42ef9dda9.herokuapp.com/api/users/changepassword' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzdGF5eWFiIiwiZW1haWwiOiJjc3RheXlhYkBnbWFpbC5jb20iLCJpYXQiOjE2MTk0MDcwMTl9.AdPWIFeT0W89lUO85e9jyqJRqxV9ac7mJ4sdqmvPWQA' \
--data-raw '{
    "oldpassword": "Test@1",
    "newpassword": "Test@2"
}'

 ```

#### Response

``` json
{
    "message": "Password Updated Successfully!"
}

 ```

### Password Verification

> This route is for when user is logged in but want to change some sensitive information such as Email Address so we require re-authentication 
  

#### Request

``` bash
curl --location --request POST 'https://user-management-ostello-1fe42ef9dda9.herokuapp.com/api/users/verifypassword' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzdGF5eWFiIiwiZW1haWwiOiJjc3RheXlhYkBnbWFpbC5jb20iLCJpYXQiOjE2MTk0MDcwMTl9.AdPWIFeT0W89lUO85e9jyqJRqxV9ac7mJ4sdqmvPWQA' \
--data-raw '{
    "password": "Test@2"
}'

 ```

#### Response

``` json
{
    "message": "Password Verification Successful!"
}

 ```