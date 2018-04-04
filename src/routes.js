import React from 'react';
import {Switch, Route} from 'react-router-dom';

// UNIVERSAL COMPONENTS
import Homepage from './components/Homepage';
import Processing from './components/Processing';

// PATIENT COMPONENTS
import Patients from './components/patients/Patients';
import Visits from './components/patients/Visits';
import Medications from './components/patients/Medications';

// PROVIDER COMPONENTS
import Providers from './components/providers/Providers';
import MedicationsAdd from './components/providers/MedicationsAdd';
import MedicationsUpdate from './components/providers/MedicationsUpdate';
import VisitsAdd from './components/providers/VisitsAdd';
import VisitsUpdate from './components/providers/VisitsUpdate';
import ProviderInbox from './components/providers/Inbox';
import SendMessage from './components/providers/SendMessage';

export default (
  <Switch>
    <Route component={Homepage} exact path="/" />
    <Route component={Processing} path="/processing" />

    <Route component={Patients} exact path="/patients" />
    <Route
      component={() => (
        <div>
          <Patients />
          <Visits />
        </div>
      )}
      path="/patients/visits"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <Medications />
        </div>
      )}
      path="/patients/medications"
    />

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
    <Route
      component={() => (
        <div>
          <Providers />
          <VisitsAdd />
        </div>
      )}
      path="/providers/visits/add"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <VisitsUpdate />
        </div>
      )}
      path="/providers/visits/update"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <ProviderInbox />
        </div>
      )}
      exact
      path="/providers/messages"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <SendMessage />
        </div>
      )}
      path="/providers/messages/send"
    />
  </Switch>
);
