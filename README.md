# Initialization
Open `/init/` and enter email of the first administrator

# Run

## Development
Client:
```
yarn start
```
Server:
```
yarn dev
```

## Docker (DRAFT)
### Build
```
docker build . -t lms-server
```
### Run
```
docker run lms-server pm2 start npm -- start
```
TODO:
```
docker run -e "NODE_ENV=production" lms-server pm2 start npm -- start
```

# Road map

- [ ] Schedule
- [ ] Attendance
- [ ] Groups
- [ ] Tests

## Authentication and authorization
  Login
  Register
  Reset password
  Invites
  Roles/Actions

## Users managment
  Create
  Delete
  Edit

## Tests
  Manage
  Pass
  Results

## Event hub
  Notifications

## Attendance
  Report

## Schedule
List of the classes with time and date
  * Add/remove classes
  * Edit classes
  * Assign users

## Groups

## Home tasks

## Library

## Ticher plan
