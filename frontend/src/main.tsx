import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "../src/Redux/store.ts"; // Import your Redux store

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          {" "}
          {/* Wrap your app with the Redux provider */}
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
