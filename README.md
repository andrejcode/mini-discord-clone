# Mini Discord Clone

Mini Discord Clone is a real-time chat app like Discord, built with React and WebSocket for instant messaging with friends.

## React application

The application contains WebSocket socket.io object via `src/libs/socket.js`, which is imported inside `App.jsx`.

## WebSocket server

The WebSocket server uses [socket.io](https://socket.io). The main server file is located in the root directory, `server.cjs`. Additional supporting modules are placed inside the `server` folder.

### Supported events

- `connect` - emitted to the client when WebSocket connection is established with the server.
- `session` - emitted when session is initialized after connecting to the server.
- `channels` - returns list of channels along with contained messages in each channel.
- `message:channel` - emitted to all clients in the `<channel>` when the user sends a message to that channel. The event is also emitted to the sender.
- `users` - returns list of users (both online and offline).
- `user:join` - emitted to all clients in the `welcome` channel when the user joins the server.
- `user:disconnect` - emitted to all clients when the user disconnects (WebSocket connection closed).
- `disconnect` - emitted to the client when WebSocket connection is closed.

- `user:leave` - client should emit this event when user explicitly leaves the server.
- `message:channel:send` - client should emit this event when user sends a message to a specific channel.

### WebSocket server state

User list, sessions and messages are stored in memory. When the WebSocket server is restarted, all data is lost.

### Running the server

After installing dependencies with `npm install`, use the following command to start the WebSocket server:

```sh
npm run server
```

Alternatively, you can invoke Node.js directly with the given server file:

```sh
node server.cjs
```

React + Vite dev server must be running separately:

```sh
npm run dev
```
