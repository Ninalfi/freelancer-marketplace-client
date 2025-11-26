import { useEffect } from "react";
import './App.css'

function App() {

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);
  return (
    <>
     <Navbar />
      
    </>
  )
}

export default App
