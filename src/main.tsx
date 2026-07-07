import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource/barlow-condensed/700-italic.css";
import "@fontsource/barlow-condensed/800-italic.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
