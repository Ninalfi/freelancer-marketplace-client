import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { Moon, Sun, Menu, X } from "lucide-react";



const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const navLinks = (
    <>
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/allJobs" className="nav-link">All Jobs</NavLink>
      <NavLink to="/addJob" className="nav-link">Add a Job</NavLink>
      <NavLink to="/my-accepted-tasks" className="nav-link">My Accepted Tasks</NavLink>
    </>
  );



  return (
    <nav className="w-full shadow-md bg-white dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
       
        <Link to="/" className="text-2xl font-bold"><span className="text-blue-500 font-extrabold text-3xl">S</span><span className="text-blue-500">k<span className="text-white">i</span>ll</span>io</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full border dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Auth Section */}
          {!user ? (
            <div className="flex gap-4">
              <NavLink to="/login" className="btn-outline">Login</NavLink>
              <NavLink to="/register" className="btn-primary">Register</NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="relative group">
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full border cursor-pointer"
                />
                <span className="absolute hidden group-hover:block bg-black text-white text-sm px-2 py-1 rounded-md -bottom-10 left-1/2 transform -translate-x-1/2">
                  {user?.displayName}
                </span>
              </div>
            <button 
            className="btn-outline" 
            onClick={() => {
                logOut()
                .then(() => {
                    console.log("Logged out successfully");
                })
                .catch(err => console.error(err));
            }}
            >
        Logout
        </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 flex flex-col gap-3 md:hidden">

          {navLinks}

          {/* Theme Toggle (mobile) */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md border dark:border-gray-600"
          >
            {theme === "dark" ? "Switch to Light ☀️" : "Switch to Dark 🌙"}
          </button>

          {!user ? (
            <>
              <NavLink to="/login" className="btn-outline">Login</NavLink>
              <NavLink to="/register" className="btn-primary">Register</NavLink>
            </>
          ) : (
            <>
              <div className="flex gap-3 items-center">
                <img src={user?.photoURL} className="w-10 h-10 rounded-full border" />
                <p>{user?.displayName}</p>
              </div>
              <button className="btn-outline" onClick={logOut}>Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
