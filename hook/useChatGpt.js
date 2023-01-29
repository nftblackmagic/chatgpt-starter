import React, { useEffect } from "react";

export const useChatGpt = (message, promptId, chatHistory) => {
  // Send user meesage to api, meesage and prompt in body
  // then update state value with response
  //   console.log("Hook api call", message, promptId);
  const [data, setData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [history, setHistory] = React.useState(chatHistory);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          promptId,
          chatHistory,
        }),
      }).then((res) => res.json());
      if (response.reply) {
        console.log("Hook api call response", response.reply);
        setData(response.reply);
        setHistory(
          history +
            "User: " +
            message +
            "\n" +
            "Agent: " +
            response.reply +
            "\n"
        );
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsError(false);
    if (message) {
      fetchData();
    }
  }, [message]);

  return {
    data,
    isLoading,
    isError,
    history,
  };
};
