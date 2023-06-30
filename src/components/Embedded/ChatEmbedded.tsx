import "./ChatEmbedded.css";
import React from "react";
import ChatBox from "../ChatBox/ChatBox";
import { Config } from "../../types";

export default function ChatEmbedded(props: Config) {
  return (
    <ChatBox
      name={props.name || "Chatbot"}
      use_feedback={props.useFeedback || false}
      serverUrl={props.serverUrl}
      socketioPath={props.socketioPath}
    />
  );
}
