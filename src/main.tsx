import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthProvider } from "./contexts/auth/AuthContext.tsx";
import App from "./App.tsx";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Create a client for the react-query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <AuthProvider>
        <App />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
