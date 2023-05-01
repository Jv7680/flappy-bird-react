import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes/routes";
import PlayScreen from './components/screens/PlayScreen';

import "./App.css";
import "./assets/fonts/flappy-bird-font.ttf";
import "./assets/fonts/VT323-Regular.ttf";

function App() {
  return (
    <div className="App" style={{ overflow: "hidden" }}>
      {/* <Test></Test> */}
      {/* <PlayScreen></PlayScreen> */}
      <Routes>
        {ROUTES.map((item, index) => {
          return (
            <Route
              path={item.route}
              element={item.screen}
              key={index}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
