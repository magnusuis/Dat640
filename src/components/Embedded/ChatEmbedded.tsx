import "./ChatEmbedded.css";
import React from "react";
import ChatBox from "../ChatBox/ChatBox";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Config } from "../../types";

export default function ChatEmbedded(props: Config) {
  return (
    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="6">
          <div className="chat-widget-content">
            <ChatBox
              name={props.name || "Chatbot"}
              use_feedback={props.useFeedback || false}
              serverUrl={props.serverUrl}
              socketioPath={props.socketioPath}
            />
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
