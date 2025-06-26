## Schema Design

# Schema
Schema added to the file `db/SCHEMA.md`

# Indexing Strategy
- `follows`: Index on `{follower: 1}`
- `posts`: Compound index on `{author: 1, created: -1}` to enable efficient reverse-chronological queries
- `users`: Index on `_id` is default, so no need to add manually

## How to run API
1. `cd api`
2. `npm install` to install dependencies
3. Update env with valid secret value
4. `npm run build` to build the application
5. `npm run start` to start the application

## How to run UI
1. `cd web`
2. `npm install` to install dependencies
3. Update `.env` to direct valid api address
3. `npm run dev` to start the development server

## Test Commands
1. `cd api`
2. `npm install` to ensure all dependencies are installed
3. `npm run test` to execute the test suite

## Test Results
```
npm run test

> api@1.0.0 test
> jest

  console.log
    2025-06-26T02:17:01.973Z DELETE /posts/123 body={} params={} query={}

      at log (app.js:19:11)

  console.log
    2025-06-26T02:17:02.064Z DELETE /posts/123 body={} params={} query={}

      at log (app.js:19:11)

  console.log
    2025-06-26T02:17:02.080Z DELETE /posts/123 body={} params={} query={}

      at log (app.js:19:11)

 PASS  ./app.test.js
  RBAC DELETE /posts/:id
    √ allows admin to delete (187 ms)
    √ forbids normal user from deleting (15 ms)
    √ blocks missing/invalid token (12 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.504 s, estimated 2 s
Ran all test suites.
```

