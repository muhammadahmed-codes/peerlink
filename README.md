# PeerLink

## Motivation
An ambitious project, simplifying remote and distributive code execution on multiple platform to increase execution speed, cut cost in terms of time and resources, offering efficiency. A proof-of-concept or minimal viable project is currently under design and will be showcased once pre-requisite milestones are reached.

## Run as development build on Vite
Note: Same steps can be used for both aformentioned platforms.

1. Create a .env file in /api directory (located just oustide /src folder) and place these contents with your credentials.
```
API_PORT=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=
AUTH_ROUTE=
```

2. Run this command in /api directory as well as the root directory.
```bash
npm install --legacy-peer-deps 
```

3. Run this command in /api directory
```bash
npm start
```

4. Run this command in root directory
```bash
npm run dev
```

## Build as an electron app for MacOS/Windows
To be released soon.
