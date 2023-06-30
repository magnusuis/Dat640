import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { Config } from "../types";

test("Renders widget", () => {
  const config: Config = {
    name: "Chatbot",
    serverUrl: "http://localhost:5000",
    useFeedback: false,
    useLogin: false,
    useWidget: true,
  };
  render(<App {...config} />);
});

test("Renders embedded", () => {
  const config: Config = {
    name: "Chatbot",
    serverUrl: "http://localhost:5000",
    useFeedback: false,
    useLogin: false,
    useWidget: false,
  };
  render(<App {...config} />);
});
