import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import { Login } from "./login";
import { Senders } from "./senders";

function App() {
  return (
    <UserProvider>
      <div style={{ margin: "20px" }}>
        <Login />
        <Senders />
      </div>
    </UserProvider>
  );
}

export default App;
