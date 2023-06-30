import "./ChatWidget.css";
import { useState, MouseEvent } from "react";
import ChatBox from "../ChatBox/ChatBox";
import { MDBIcon } from "mdb-react-ui-kit";
import { Config } from "../../types";

export default function ChatWidget(props: Config) {
  const [isChatBoxOpen, setIsChatBoxOpen] = useState<boolean>(false);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    setIsChatBoxOpen(isChatBoxOpen ? false : true);
  }

  return (
    <div className="chat-widget-container">
      <div className="chat-widget-icon">
        <a href="#!" onClick={handleClick} className="text-muted">
          <MDBIcon fas icon="robot" />
        </a>
      </div>
      <div className="chat-widget-box">
        {isChatBoxOpen && (
          <ChatBox
            name={props.name || "Chatbot"}
            use_feedback={props.useFeedback || false}
            serverUrl={props.serverUrl}
            socketioPath={props.socketioPath}
          />
        )}
      </div>
    </div>
  );
}
