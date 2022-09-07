import { Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";

const Notification = ({ messages }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (Object.keys(messages).length > 0) {
      setShow(true);
    }
  }, [messages]);
  return (
    <Snackbar
      open={show}
      autoHideDuration={6000}
      message={Object.keys(messages)
        .map((key) => messages[key])
        .join("\n")}
      onClose={() => setShow(false)}
    />
  );
};
export default Notification;
