import { useContext } from "react";
import { Link } from "react-router";
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

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    // Backend logout api call here later
    setUser(null);
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          DevHub
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
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
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="gap-2">
                    <User size={16} /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <LayoutDashboard size={16} /> My Projects
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive">
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