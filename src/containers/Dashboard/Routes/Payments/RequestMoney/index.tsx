import React from 'react';
import { Route, Switch, Redirect, useRouteMatch, NavLink, withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import IncomingPaymentRequest from '../../../Components/IncomingPaymentRequests';
import OutgoingPaymentRequest from '../../../Components/OutgoingPaymentRequest';
import PaymentRequestForm from '../../../Components/PaymentRequestForm';
import './index.scss';

const RequestMoney = (): JSX.Element => {
  const { path, url } = useRouteMatch();
  return (
    <Fade bottom duration={1000} distance="50px">
      <section className="request_money_section">
        <div className="requests_tab">
          <NavLink to={`${url}/incoming`} aria-expanded="false" data-toggle="tab">
            Incoming
          </NavLink>
          <NavLink to={`${url}/outgoing`} aria-expanded="false" data-toggle="tab">
            Your Requests
          </NavLink>
          <NavLink to={`${url}/new`} aria-expanded="false" data-toggle="tab">
            New Request
          </NavLink>
        </div>
        <Switch>
          <Route path={`${path}/incoming`} component={IncomingPaymentRequest} exact />
          <Route path={`${path}/outgoing`} component={OutgoingPaymentRequest} />
          <Route path={`${path}/new`} component={PaymentRequestForm} />
          <Redirect to={`${path}/incoming`} />
        </Switch>
      </section>
    </Fade>
  );
};

export default withRouter(RequestMoney);
