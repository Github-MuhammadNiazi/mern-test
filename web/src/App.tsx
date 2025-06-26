import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Feed from './pages/Feed';
import './App.css'

function App() {
  const { jwt } = useAuth();

  if (!jwt) return <Login />;
  return <Feed />;
}

export default App
