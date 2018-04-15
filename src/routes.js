import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

// UNIVERSAL COMPONENTS
import Homepage from './components/Homepage';
import Processing from './components/Processing';
import Inbox from './components/Inbox';
import Profile from './components/Profile';
import Footer from './components/subcomponents/Footer';
import NotFound from './components/NotFound';
import Blog from './components/Blog';
import SinglePost from './components/SinglePost';

// PATIENT COMPONENTS
import Patients from './components/patients/Patients';
import PatientDashboard from './components/patients/PatientDashboard';
import Visits from './components/patients/Visits';
import Medications from './components/patients/Medications';
import Billing from './components/patients/Billing';
import BillingHistory from './components/patients/BillingHistory';
import PatientSend from './components/patients/SendMessage';
import Genomics from './components/patients/Genomics';
import GenomicsReports from './components/patients/GenomicsReports';
import GenomicsAuthorization from './components/patients/GenomicsAuthorization';

// PROVIDER COMPONENTS
import Providers from './components/providers/Providers';
import ProviderDashboard from './components/providers/ProviderDashboard';
import MedicationsAdd from './components/providers/MedicationsAdd';
import MedicationsUpdate from './components/providers/MedicationsUpdate';
import VisitsAdd from './components/providers/VisitsAdd';
import VisitsUpdate from './components/providers/VisitsUpdate';
import SendMessage from './components/providers/SendMessage';
import BillingAdd from './components/providers/BillingAdd';
import BillingUpdate from './components/providers/BillingUpdate';
import CreatePost from './components/CreatePost';

export default (
  <Switch>
    <Route component={Homepage} exact path="/" />
    <Route component={Processing} path="/processing" />

    <Route
      component={() => (
        <div>
          <PatientDashboard />
        </div>
      )}
      exact
      path="/patients"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <Visits />
          <Footer />
        </div>
      )}
      path="/patients/visits"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <Medications />
          <Footer />
        </div>
      )}
      path="/patients/medications"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <Billing />
          <Footer />
        </div>
      )}
      exact
      path="/patients/billing"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <BillingHistory />
          <Footer />
        </div>
      )}
      path="/patients/billing/history"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <Inbox />
          <Footer />
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
          <Footer />
        </div>
      )}
      path="/patients/messages/send"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <Profile />
          <Footer />
        </div>
      )}
      path="/patients/profile"
    />
    <Route
      component={() => (
        <div>
          <Genomics />
        </div>
      )}
      exact
      path="/patients/genomics"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <GenomicsReports />
          <Footer />
        </div>
      )}
      path="/patients/genomics/reports"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <GenomicsAuthorization />
          <Footer />
        </div>
      )}
      path="/patients/genomics/authorization"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <Blog />
          <Footer />
        </div>
      )}
      exact
      path="/patients/blog"
    />
    <Route
      component={() => (
        <div>
          <Patients />
          <SinglePost />
          <Footer />
        </div>
      )}
      path="/patients/blog/:id"
    />

    <Route
      component={() => (
        <div>
          <ProviderDashboard />
        </div>
      )}
      exact
      path="/providers"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <MedicationsAdd />
          <Footer />
        </div>
      )}
      path="/providers/medications/add"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <MedicationsUpdate />
          <Footer />
        </div>
      )}
      path="/providers/medications/update"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <VisitsAdd />
          <Footer />
        </div>
      )}
      path="/providers/visits/add"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <VisitsUpdate />
          <Footer />
        </div>
      )}
      path="/providers/visits/update"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <Inbox />
          <Footer />
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
          <Footer />
        </div>
      )}
      path="/providers/messages/send"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <BillingAdd />
          <Footer />
        </div>
      )}
      path="/providers/billing/add"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <BillingUpdate />
          <Footer />
        </div>
      )}
      path="/providers/billing/update"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <Profile />
          <Footer />
        </div>
      )}
      path="/providers/profile"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <Blog />
          <Footer />
        </div>
      )}
      exact
      path="/providers/blog"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <CreatePost />
          <Footer />
        </div>
      )}
      exact
      path="/providers/blog/create"
    />
    <Route
      component={() => (
        <div>
          <Providers />
          <SinglePost />
          <Footer />
        </div>
      )}
      path="/providers/blog/:id"
    />

    <Route path="/404" component={NotFound} />
    <Redirect from="*" to="/404" />
  </Switch>
);
