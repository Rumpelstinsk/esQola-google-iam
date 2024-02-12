import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import { Login } from "./login";

function App() {
  return (
    <UserProvider>
      <div style={{ margin: "20px" }}>
        <Login />
      </div>
    </UserProvider>
  );
}

export default App;
