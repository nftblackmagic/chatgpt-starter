import { useChatGpt } from "@/hook/useChatGpt";
import { Button, TextField } from "@mui/material";
import React from "react";

const promptId = "cld9piv9j049zi7ehio0g5979";

export const ChatContainer = () => {
  const [pendingMessage, setPendingMessage] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { data, isLoading, isError } = useChatGpt(message, promptId);
  return (
    <div id="chat-container">
      <a
        href="https://github.com/nftblackmagic/chatgpt-starter"
        target="_blank"
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
