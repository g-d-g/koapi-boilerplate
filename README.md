# koapi-boilerplate
A Koapi boilerplate

## Contains

- [x] [Koapi](https://github.com/koapi/koapi)
- [x] [Knex](http://knexjs.org/)
- [x] [Bookshelf](http://bookshelfjs.org/)
- [x] [Babel](https://babeljs.io/)
- [x] [Apidoc](http://apidocjs.com/)
- [x] [Nodemon](http://nodemon.io/)
- [x] [Istanbul](https://github.com/gotwarlost/istanbul)
- [x] [Mochajs](https://mochajs.org/)
- [x] [Shouldjs](http://shouldjs.github.io/)

## Run dev server

### Start server
```bash
npm start
```
### Start Services (Built-in: Scheduler & Queue)
```bash
npm run service
```
### Watch file-changes and auto restart server(Dev-mode)
```bash
npm run watch server
```
### Watch file-changes and auto restart services(Dev-mode)
```bash
npm run watch service
```

### Build production

```bash
npm run build
```

### Generate apidoc

```bash
npm run build doc
```

## Test

```bash
# For unit testing
npm test

# For code coverage testing
npm run test coverage
```

## Database maintenance
```bash
# migrate latest
npm run migrate

# Rollback db changes
npm run migrate rollback
```

### migrate & seed
```bash
npm run migrate setup
```
### rollback & migrate & seed
```bash
npm run migrate reset
```
