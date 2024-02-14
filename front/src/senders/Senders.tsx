import { useState } from "react";
import { useSenders } from "./useSenders";
import { isErrorResponse } from "../models/responses";

export const Senders = () => {
  const [securedMessage, setSecuredMessage] = useState("");
  const [securedMiddlewareMessage, setSecuredMiddlewareMessage] = useState("");
  const { sendSecured, sendSecuredMiddleware } = useSenders();

  const handleSecured = async () => {
    setSecuredMessage("Loading....");
    const response = await sendSecured();
    if (isErrorResponse(response)) {
      setSecuredMessage(response.error);
      return;
    }

    setSecuredMessage(response.message);
  };

  const handleSecuredMiddleware = async () => {
    setSecuredMiddlewareMessage("Loading....");
    const response = await sendSecuredMiddleware();
    if (isErrorResponse(response)) {
      setSecuredMiddlewareMessage(response.error);
      return;
    }

    setSecuredMiddlewareMessage(response.message);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ display: "flex" }}>
        <button onClick={handleSecured}>Secured endpoint</button>
        <div>{securedMessage}</div>
      </div>
      <div style={{ display: "flex" }}>
        <button onClick={handleSecuredMiddleware}>
          Secured-middleware endpoint
        </button>
        <div>{securedMiddlewareMessage}</div>
      </div>
    </div>
  );
};
