import { useChatGpt } from "@/hook/useChatGpt";
import { addMessage } from "@/utils/chatHistory";
import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { ChatHistoryFrame } from "./ChatHistoryFrame";

const promptId = "cld9piv9j049zi7ehio0g5979";

export const ChatContainer = () => {
  const [pendingMessage, setPendingMessage] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState([]);
  const { data, isLoading, history, isSuccess, isError } = useChatGpt(
    message,
    promptId,
    chatHistory
  );

  useEffect(() => {
    if (isSuccess || isError) {
      setMessage("");
    }
  }, [isSuccess, isError]);

  return (
    <div id="chat-container">
      <a
        href="https://github.com/nftblackmagic/chatgpt-starter"
        target="_blank"
        rel="noreferrer"
      >
        <h1>MOVIE to emoji</h1>
      </a>
      {chatHistory.length > 0 && (
        <ChatHistoryFrame chatHistory={chatHistory} isLoading={isLoading} />
      )}
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
          setChatHistory(addMessage(history || [], pendingMessage, "user"));
        }}
      >
        Send
      </Button>
    </div>
  );
};
