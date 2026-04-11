import React from "react";
import ReactDOM from "react-dom/client";
import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";
import App from "./App";
import "./index.css";

function FrameApp() {
  React.useEffect(() => {
    Streamlit.setComponentReady();
  }, []);
  return <App />;
}

const ConnectedApp = withStreamlitConnection(FrameApp);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConnectedApp />
  </React.StrictMode>
);
