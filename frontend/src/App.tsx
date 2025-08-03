import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MySessions from "./pages/MySessions";
import SessionEditor from "./pages/SessionEditor";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/protectedRoutes";

const App = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-sessions"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MySessions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-session"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SessionEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-session/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SessionEditor />
              </ProtectedRoute>
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
