import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

function App() {
  return (
    <div className='h-full bg-gradient-to-r from-gray-300 to-[#80D0C7]'>
      <div className='container mx-auto px-2 h-full'>

        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/">
            <Register />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
