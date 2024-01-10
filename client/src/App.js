import { BrowserRouter, Navigate,Routes,Route } from "react-router-dom";
import Homepage from "scenes/homePage/Homepage";
import Loginpage from "scenes/loginPage/Loginpage";
import Profilepage from "scenes/profilePage/Profilepage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import Navbar from "scenes/navbar/Navbar";

function App() {
  const mode=useSelector((state)=>state.mode);
  const theme=useMemo(()=>createTheme(themeSettings(mode),[mode]))
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route
              path="/home"
              element={isAuth ? <Homepage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <Profilepage /> : <Navigate to="/" />}
            />
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
