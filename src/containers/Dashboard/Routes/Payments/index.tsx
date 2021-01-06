import React from 'react';
import { Route, Switch, Redirect, useRouteMatch, NavLink, withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import SendMoney from './SendMoney';
import RequestMoney from './RequestMoney';
import './index.scss';

const Payments = (): JSX.Element => {
  const { path, url } = useRouteMatch();

  return (
    <>
      <Fade bottom duration={1000} distance="50px">
        <section className="payments_section">
          <div className="payments_tab">
            <NavLink to={`${url}/send_money`} aria-expanded="false" data-toggle="tab">
              Send Money
            </NavLink>
            <NavLink to={`${url}/request_money`} aria-expanded="false" data-toggle="tab">
              Request Money
            </NavLink>
            <NavLink to={`${url}/airtime_bills`} aria-expanded="false" data-toggle="tab">
              Airtime/Bills
            </NavLink>
          </div>
        </section>
      </Fade>
      <Switch>
        <Route path={`${path}/send_money`} component={SendMoney} />
        <Route path={`${path}/request_money`} component={RequestMoney} />
        <Route
          path={`${path}/airtime_bills`}
          render={() => (
            <Fade bottom duration={1000} distance="50px">
              <div className="card_content">
                <img src="https://i.ya-webdesign.com/images/payment-cards-png-6.png" alt="cards" />
                <p>This feature is still in development, please contact support for further assistance</p>
              </div>
            </Fade>
          )}
        />
        <Redirect to={`${path}/send_money`} />
      </Switch>
    </>
  );
};

export default withRouter(Payments);
