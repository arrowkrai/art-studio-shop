# Art Studio Shop

## Installation & Set Up

1. Install Dependencies

```sh
npm install
cd frontend
npm install
```

2. Create a .env file in the root

```
NODE_ENV = development
PORT = 5000
MONGO_URI = private mongodb uri
JWT_SECRET = private string
PAYPAL_CLIENT_ID = private paypal client id
```

3. Start the development server

```sh
npm run client
npm run server
```

## Building for Production

1. Generate a production build

```sh
cd frontend
npm run build
```
