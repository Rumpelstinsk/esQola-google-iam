import { useState } from "react";
import { useSenders } from "./useSenders";
import { isErrorResponse } from "../models/responses";

export const Senders = () => {
  const [securedMessage, setSecuredMessage] = useState("");
  const { sendSecured } = useSenders();

  const handleSecured = async () => {
    setSecuredMessage("Loading....");
    const response = await sendSecured();
    if (isErrorResponse(response)) {
      setSecuredMessage(response.error);
      return;
    }

    setSecuredMessage(response.message);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <button onClick={handleSecured}>Secured endpoint</button>
        <div>{securedMessage}</div>
      </div>
    </div>
  );
};
