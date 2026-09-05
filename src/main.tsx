import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/anton/400.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "./index.css";
import "./courtside.css";

createRoot(document.getElementById("root")!).render(<App />);
