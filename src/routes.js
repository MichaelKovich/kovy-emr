import React from 'react';
import {Switch, Route} from 'react-router-dom';

// UNIVERSAL COMPONENTS
import Homepage from './components/Homepage';
import Processing from './components/Processing';

// PATIENT COMPONENTS
import Patients from './components/patients/Patients';

// PROVIDER COMPONENTS
import Providers from './components/providers/Providers';
import MedicationsAdd from './components/providers/MedicationsAdd';
import MedicationsUpdate from './components/providers/MedicationsUpdate';

export default (
  <Switch>
    <Route component={Homepage} exact path="/" />
    <Route component={Processing} path="/processing" />

    <Route component={Patients} path="/patients" />

    <Route component={Providers} exact path="/providers" />
    <Route
      component={() => (
        <div>
          <Providers />
          <MedicationsAdd />
        </div>
      )}
      path="/providers/medications/add"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <MedicationsUpdate />
        </div>
      )}
      path="/providers/medications/update"
    />
  </Switch>
);
