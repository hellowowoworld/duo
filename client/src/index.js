import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { UserProvider } from "./UserContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Auth0Provider
    domain="dev-8bwwi7tb.us.auth0.com"
    clientId="w6DAIq95IP12nBTQlVmBmZaXa9QgfjNA"
    redirectUri={"http://localhost:3000/"}
  >
    <UserProvider>
      <App tab="home" />
    </UserProvider>
  </Auth0Provider>
);
