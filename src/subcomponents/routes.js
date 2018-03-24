import React from 'react';
import {Switch, Route} from 'react-router-dom';

// IMPORT COMPONENTS HERE
import Homepage from '../components/Homepage';
import Processing from '../components/Processing';
import Dashboard from '../components/Dashboard';

export default (
  <Switch>
    <Route component={Homepage} exact path="/" />
    <Route component={Processing} path="/processing" />
    <Route component={Dashboard} path="/dashboard" />
    {/* <Route path="/VIEW1" render={props => <COMPONENTname {...props} />} /> // Some placeholders with props
    <Route path="/VIEW2" render={props => <COMPONENTname {...props} />} />
    <Route path="/VIEW3" render={props => <COMPONENTname {...props} />} />
    <Route path="/VIEW4" render={props => <COMPONENTname {...props} />} />
    <Route path="/VIEW5" render={props => <COMPONENTname {...props} />} /> */}
  </Switch>
);
