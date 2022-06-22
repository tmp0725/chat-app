import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RiSendPlane2Fill } from "react-icons/ri";
import { Button } from "@mantine/core";
import { socket } from "../lib/socket";
import { AiFillDelete } from "react-icons/ai";
import { PrivateMessageSender } from "../types";
import { day, month, year } from "../date/date";

export default function PrivateRoom(props: {
  username: string;
  roomNumber: string;
}): JSX.Element {
  const [privateMessage, setPrivateMessage] = useState<string>("");
  const [privateMessageList, setPrivateMessageList] = useState<any>([]);
  const [showAllDeleteButton, setShowAllDeleteButton] =
    useState<boolean>(false);

  const { username, roomNumber } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPrivateMessage(e.target.value);
  };

  const handleClick = (): void => {
    const minute: number = new Date(Date.now()).getMinutes();
    if (privateMessage !== "") {
      const privateMessageSender: PrivateMessageSender = {
        username: username,
        roomNumber: roomNumber,
        message: privateMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          (minute < 10 ? "0" + minute : minute),
      };
      setPrivateMessage("");
      setPrivateMessageList([...privateMessageList, privateMessageSender]);
      socket.emit("send-private-message", privateMessageSender);
    }
  };

  const handleDelete = (i: number): void => {
    const newPrivateMessageList: string[] = [...privateMessageList].filter(
      (message: string, length: number) => i !== length
    );
    setPrivateMessageList(newPrivateMessageList);
  };

  socket.on(
    "return-send-private-message",
    (privateMessageSender: PrivateMessageSender) => {
      setPrivateMessageList([...privateMessageList, privateMessageSender]);
    }
  );

  return (
    <>
      <Toaster />
      <div className="h-full">
        <div className="py-5 px-2 border border-solid rounded">
          <div>
            name : <span className="text-pink-600">{username}</span> さん
          </div>
          <div>
            room number : <span className="text-pink-600"> {roomNumber}</span>
          </div>
        </div>
        <div className="m-5 text-center">
          {year}/{month}/{day}
        </div>
        {privateMessageList.length === 0 && (
          <div className="text-center m-5">Send a message 🚀</div>
        )}
        {privateMessageList.map(
          (
            privateMessage: { username: string; message: string; time: string },
            i: number
          ) => (
            <div key={i}>
              {username === privateMessage.username ? (
                <div className="my-5">
                  <span className="mx-2">{privateMessage.username}</span>
                  <span className=" bg-slate-300 p-1 px-3 rounded-xl">
                    {privateMessage.message}

                    <span className="absolute px-4">
                      {showAllDeleteButton === true ? (
                        <Button
                          color="red"
                          radius="xl"
                          size="xs"
                          className="h-6"
                          onClick={() => handleDelete(i)}
                        >
                          <AiFillDelete size={15} />
                        </Button>
                      ) : (
                        ""
                      )}
                    </span>
                  </span>

                  <span
                    className={
                      showAllDeleteButton === true
                        ? "ml-14 mt-2 text-xs"
                        : "ml-2 mt-2 text-xs"
                    }
                  >
                    {privateMessage.time}
                  </span>
                </div>
              ) : (
                <div className="my-5">
                  <span className="m-1 flex justify-end">
                    <span className="mr-5 mt-2 text-xs">
                      {privateMessage.time}
                    </span>
                    <span className="bg-slate-300 p-1 px-3 rounded-xl">
                      {privateMessage.message}
                    </span>
                    <span className="mx-2 relative top-1">
                      {privateMessage.username}
                    </span>
                  </span>
                </div>
              )}
            </div>
          )
        )}
      </div>

      <div className="sticky bottom-0 text-center">
        <input
          placeholder="Send message"
          onChange={handleChange}
          value={privateMessage}
          className="message-input"
        />
        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          onClick={handleClick}
        >
          <RiSendPlane2Fill className="mr-1" /> Send
        </Button>
        <Button
          color="red"
          size="xs"
          className="absolute h-9"
          onClick={() => setShowAllDeleteButton(!showAllDeleteButton)}
        >
          <AiFillDelete size={15} />
        </Button>
      </div>
    </>
  );
}
