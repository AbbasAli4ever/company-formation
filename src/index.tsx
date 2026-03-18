import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";

import { CompanyFormation } from "./screens/CompanyFormation";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <div className="relative bg-[#efefef]">
      <CompanyFormation />
    </div>
  </StrictMode>
);
