import React from 'react';
import {Switch, Route} from 'react-router-dom';

// UNIVERSAL COMPONENTS
import Homepage from './components/Homepage';
import Processing from './components/Processing';
import Inbox from './components/Inbox';
import Profile from './components/Profile';

// PATIENT COMPONENTS
import Patients from './components/patients/Patients';
import Visits from './components/patients/Visits';
import Medications from './components/patients/Medications';
import Billing from './components/patients/Billing';
import PatientSend from './components/patients/SendMessage';

// PROVIDER COMPONENTS
import Providers from './components/providers/Providers';
import MedicationsAdd from './components/providers/MedicationsAdd';
import MedicationsUpdate from './components/providers/MedicationsUpdate';
import VisitsAdd from './components/providers/VisitsAdd';
import VisitsUpdate from './components/providers/VisitsUpdate';
import SendMessage from './components/providers/SendMessage';
import BillingAdd from './components/providers/BillingAdd';
import BillingUpdate from './components/providers/BillingUpdate';

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
    <Route
      component={() => (
        <div>
          <Patients />
          <Billing />
        </div>
      )}
      path="/patients/billing"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <Inbox />
        </div>
      )}
      exact
      path="/patients/messages"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <PatientSend />
        </div>
      )}
      path="/patients/messages/send"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <Profile />
        </div>
      )}
      exact
      path="/patients/profile"
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
          <Inbox />
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
    <Route
      component={() => (
        <div>
          <Providers />
          <BillingAdd />
        </div>
      )}
      path="/providers/billing/add"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <BillingUpdate />
        </div>
      )}
      path="/providers/billing/update"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <Profile />
        </div>
      )}
      exact
      path="/providers/profile"
    />
  </Switch>
);
