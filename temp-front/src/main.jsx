import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Store/store.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-rowm73tleep1b83m.us.auth0.com"
      clientId="V9qMqWWdgyt6X30x5K154qKoOisZZlcg"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <App />
    </Auth0Provider>
  </Provider>
);
