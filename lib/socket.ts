import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(
  "http://localhost:4000"
);
