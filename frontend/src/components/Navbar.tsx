import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      // 🔒 Call backend logout API
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
      // 🧹 Clear auth flag
      localStorage.removeItem("isLoggedIn");

      // ✅ Optional feedback
      toast({
        title: "Logged out",
        description: "You’ve been logged out successfully.",
      });

      // 🚪 Redirect to login
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Logout failed",
          description: error.response?.data?.message || "Something went wrong",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unexpected Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <nav className="bg-card border-b border-border shadow-wellness-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-lg sm:text-xl font-semibold text-foreground hidden xs:inline">
              WellnessSpace
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/dashboard">
              <Button
                variant={isActive("/dashboard") ? "default" : "ghost"}
                className="transition-colors duration-200 hidden sm:inline-flex"
                size="sm"
              >
                Dashboard
              </Button>
              <Button
                variant={isActive("/dashboard") ? "default" : "ghost"}
                className="transition-colors duration-200 sm:hidden"
                size="sm"
              >
                Home
              </Button>
            </Link>

            <Link to="/my-sessions">
              <Button
                variant={isActive("/my-sessions") ? "default" : "ghost"}
                className="transition-colors duration-200 hidden sm:inline-flex"
                size="sm"
              >
                My Sessions
              </Button>
              <Button
                variant={isActive("/my-sessions") ? "default" : "ghost"}
                className="transition-colors duration-200 sm:hidden"
                size="sm"
              >
                Mine
              </Button>
            </Link>

            <Link to="/create-session">
              <Button
                variant={isActive("/create-session") ? "default" : "ghost"}
                className="transition-colors duration-200 hidden sm:inline-flex"
                size="sm"
              >
                Create Session
              </Button>
              <Button
                variant={isActive("/create-session") ? "default" : "ghost"}
                className="transition-colors duration-200 sm:hidden"
                size="sm"
              >
                Create
              </Button>
            </Link>

            {/* 👇 LOGOUT BUTTON */}
            <Button
              variant="outline"
              className="transition-colors duration-200"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
