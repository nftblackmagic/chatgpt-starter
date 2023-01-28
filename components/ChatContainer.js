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
      <h1>Chat Container</h1>
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
