import Link from "next/link";
import { Button } from "@mantine/core";
import { useState } from "react";
import { AiFillDelete, AiFillHome } from "react-icons/ai";
import { RiSendPlane2Fill } from "react-icons/ri";
import { socket } from "../lib/socket";
import { OpenChatData } from "../types";
import { year, month, day } from "../date/date";

export default function OpenChat(): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<any>([]);
  const [showAllDeleteButton, setShowAllDeleteButton] =
    useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value.trim());
  };

  const handleSendMessage = (): void => {
    const minute: number = new Date(Date.now()).getMinutes();

    if (message !== "") {
      const openChatData: OpenChatData = {
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          (minute < 10 ? "0" + minute : minute),
      };
      socket.emit("open-Chat-Data", openChatData);
      setMessage("");
    } else {
      return;
    }
  };

  const handleDelete = (i: number): void => {
    const newMessageList: string[] = [...messageList].filter(
      (message: number, length: number) => i !== length
    );
    setMessageList(newMessageList);
  };

  socket.on("return-Open-Chat-Data", (data: string) => {
    console.log(data);
    setMessageList([...messageList, data]);
  });

  return (
    <>
      <div className="h-full bg-slate-200">
        <header className="flex p-5 text-lg pl-3 font-black text-center bg-slate-400">
          <Link href="/">
            <div className="cursor-pointer text-left">
              <AiFillHome />
            </div>
          </Link>

          <div className="m-auto">Open chat room</div>
        </header>
        <div className="m-5 text-center">
          {year}/{month}/{day}
        </div>
        {messageList.length === 0 && (
          <div className="text-center m-5">Send a message 🚀</div>
        )}

        {messageList.map(
          (openChatData: { message: string; time: string }, i: number) => (
            <div key={i} className="mt-2">
              <span className="bg-slate-300 ml-2 px-2">
                名無し : {openChatData.message}{" "}
              </span>

              <div className="text-right relative bottom-6 mr-2">
                <div
                  className={
                    showAllDeleteButton === true
                      ? "delete-button-position"
                      : "hidden"
                  }
                >
                  <Button
                    color="red"
                    radius="xl"
                    size="xs"
                    className="h-5"
                    onClick={() => handleDelete(i)}
                  >
                    <AiFillDelete size={15} />
                  </Button>
                </div>
                {openChatData.time}
              </div>
            </div>
          )
        )}
      </div>
      <div className="sticky bottom-0 text-center">
        <input
          placeholder="Send message"
          onChange={handleChange}
          value={message}
          className="message-input"
        />
        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          onClick={handleSendMessage}
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
