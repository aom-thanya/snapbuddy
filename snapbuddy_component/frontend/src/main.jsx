import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";
import App from "./App";
import "./index.css";

function FrameApp() {
  useEffect(() => {
    const setHeight = () => Streamlit.setFrameHeight(820);
    const timeout = setTimeout(setHeight, 100);
    window.addEventListener("load", setHeight);
    window.addEventListener("resize", setHeight);
    const observer = new MutationObserver(setHeight);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    Streamlit.setComponentReady();
    setHeight();
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("load", setHeight);
      window.removeEventListener("resize", setHeight);
      observer.disconnect();
    };
  }, []);

  return <App />;
}

const ConnectedApp = withStreamlitConnection(FrameApp);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConnectedApp />
  </React.StrictMode>
);
