import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User, LayoutDashboard, PlusCircle } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async() => {
    await logout()
    navigate("/login")
  };

  return (
    <nav className="border-b bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary dark:text-white">
          DevHub
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <>
              <Link to="/upload">
                <Button variant="ghost" className="hidden md:flex gap-2">
                  <PlusCircle size={18} /> Upload Project
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-9 w-9 border">
                    <AvatarImage src={user.profilePicture} />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-slate-900 border dark:border-slate-800">
                  
                  <Link to={`/profile/${user._id}`}>
                    <DropdownMenuItem className="gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                      <User size={16} /> Profile
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem className="gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                    <LayoutDashboard size={16} /> My Projects
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleLogout} className="gap-2 cursor-pointer text-destructive">
                    <LogOut size={16} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>

              </DropdownMenu>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;