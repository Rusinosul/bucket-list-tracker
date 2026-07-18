import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "./index.css";
import App from "./App.jsx";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);