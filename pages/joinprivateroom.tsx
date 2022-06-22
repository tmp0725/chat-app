import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "@mantine/core";
import { AiFillHome } from "react-icons/ai";
import { socket } from "../lib/socket";
import PrivateRoom from "./privateroom";

export default function JoinPrivateRoom(): JSX.Element {
  const [username, setUserName] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [showPrivateRoom, setShowPrivateRoom] = useState<boolean>(false);

  const joinPrivateChat = (username: string, roomNumber: string): void => {
    if (username !== "" && roomNumber.length >= 5) {
      setShowPrivateRoom(true);
      socket.emit("join-private-room", roomNumber);
      toast.success(`Successfully entered the room.\n Welcome ${username} !`);
    } else {
      alert("Please confirm your entry.");
      return;
    }
  };

  return (
    <>
      <header className="flex p-5 text-lg pl-3 font-black text-center bg-slate-400">
        <Link href="/">
          <div className="cursor-pointer text-left">
            <AiFillHome />
          </div>
        </Link>
        <div className="m-auto">Private chat room</div>
      </header>

      {!showPrivateRoom ? (
        <div className="flex justify-center items-center h-3/4 relative top-20">
          <div className=" h-80 w-96 bg-slate-600 rounded-md">
            <div className="text-center text-lg font-black text-white m-9">
              Certification
            </div>

            <div className="text-center">
              <div className="mb-5">
                <input
                  placeholder="name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserName(e.target.value)
                  }
                  value={username}
                  className="w-60 pl-2 pr-2 py-1"
                />
                {username.length < 1 && (
                  <div className="text-red-600 text-sm">
                    *Please enter at least 1 characters.
                  </div>
                )}
              </div>
              <input
                placeholder="room number"
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRoomNumber(e.target.value)
                }
                value={roomNumber}
                className="w-60 pl-2 pr-2 py-1"
              />
              {roomNumber.length < 5 && (
                <div className="text-red-600 text-sm mr-7">
                  *Please enter 5 digits or more.
                </div>
              )}
            </div>

            <div className="text-center relative top-7">
              <Button
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
                onClick={() => joinPrivateChat(username, roomNumber)}
              >
                Join Private Chat
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <PrivateRoom username={username} roomNumber={roomNumber} />
      )}
    </>
  );
}
