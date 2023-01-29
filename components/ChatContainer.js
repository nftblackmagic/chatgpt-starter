import { useChatGpt } from "@/hook/useChatGpt";
import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";

const promptId = "cld9piv9j049zi7ehio0g5979";

export const ChatContainer = () => {
  const [pendingMessage, setPendingMessage] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState("");
  const { data, isLoading, history } = useChatGpt(
    message,
    promptId,
    chatHistory
  );

  useEffect(() => {
    if (history) {
      setChatHistory(history);
      console.log("Chat history", history);
    }
  }, [history]);

  return (
    <div id="chat-container">
      <a
        href="https://github.com/nftblackmagic/chatgpt-starter"
        target="_blank"
        rel="noreferrer"
      >
        <h1>MOVIE to emoji</h1>
      </a>
      <TextField
        type="text"
        onChange={(e) => {
          setPendingMessage(e.target.value);
        }}
      />
      <Button
        variant="outlined"
        onClick={() => {
          setMessage(pendingMessage);
        }}
      >
        Send
      </Button>
      <h2>{message}</h2>
      {isLoading ? <h2>Loading...</h2> : <h2>{data}</h2>}
    </div>
  );
};
