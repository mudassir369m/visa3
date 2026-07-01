import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";
import LenisProvider from "@/components/layout/LenisProvider";
import CustomCursor from "@/components/layout/CustomCursor";

createRoot(document.getElementById("root")!).render(
  <LenisProvider>
    <CustomCursor />
    <App />
  </LenisProvider>
);