import {Route, Switch} from 'react-router-dom'
import Login from './component/Login'
import Home from './component/Home'
import NotFound from './component/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/ebank/login" component={Login} />
      <Route exact path="/" component={Home} />
      <NotFound />
    </Switch>
  </div>
)

export default App
