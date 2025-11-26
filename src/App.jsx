import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
     const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";
   
  const [count, setCount] = useState(0)

  return (
    <>
       <div className={isDark ? "dark" : ""}>
      <Navbar 
        userId={userId}
        theme={theme}
        setTheme={setTheme}   // <---- REQUIRED
        isDark={isDark}
        auth={auth}
        showToast={showToast}
      />
    </div>
    </>
  )
}

export default App
