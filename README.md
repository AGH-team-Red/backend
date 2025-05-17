## Backend of Quelldata app

### Requirements

- local postgresql server
- node.js 18+

## Getting Started

Start up your postgresql local server and fill out the env file based on [example](.env.example).

Migrate and seed your database

```bash
npx prisma migrate reset

npm run seed
```

Start the server

```bash
npm install # install the dependencies

npm run dev # start the development server
```

The app should work on localhost on the port you specified in the env (we recommend :3005).

You are good to go with working on backend/frontend
