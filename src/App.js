import React from 'react'; 
import './App.css';
import {BrowserRouter , Route , Switch ,Redirect} from 'react-router-dom';
import Mentor from './Mentors';
import Student from './Students';
import AssignMentor from './AssignMentor';
import Dashboard from './Dashboard';
import Home from './home';

function App() {
  return (
    <div>
      
    <BrowserRouter>
  
   
    <Switch>
     <Route path="/home" component={Home} />
     <Route path="/Mentor" component={Mentor} />
     <Route path="/Student" component={Student} />
     <Route path="/AssignMentor" component={AssignMentor} />
     <Route path="/Dashboard" component={Dashboard} />
  
     <Route exact path="/">
  
       <Redirect to="/dashboard" />
     </Route>
     </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
