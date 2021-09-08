import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CreateItem from './components/item/CreateItem';
import EditItem from './components/item/EditItem';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path={'/create'} exact component={CreateItem} />
          <Route path={'/'} exact component={Home} />
          <Route path={'/edit/:id'} exact component={EditItem} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
