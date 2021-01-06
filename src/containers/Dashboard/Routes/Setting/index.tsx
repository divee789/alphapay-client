import React from 'react';
import { Route, Switch, Redirect, useRouteMatch, NavLink, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { logOut } from '../../../../store/actions';
import Profile from './Profile';
import Security from './Security';
import './index.scss';

const Setting: React.FC = () => {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();

  return (
    <>
      <Fade bottom duration={1000} distance="50px">
        <section className="settings_section">
          <div className="settings_tab">
            <NavLink to={`${url}/profile`} aria-expanded="false" data-toggle="tab">
              Profile
            </NavLink>
            <NavLink to={`${url}/security`} aria-expanded="false" data-toggle="tab">
              Security
            </NavLink>
            <NavLink
              to={`/coming-soon`}
              aria-expanded="false"
              data-toggle="tab"
              onClick={(e): void => {
                e.preventDefault();
                dispatch(logOut());
              }}
            >
              Log Out
            </NavLink>
          </div>
        </section>
      </Fade>
      <div className="settings_content">
        <Switch>
          <Route path={`${path}/profile`} component={Profile} />
          <Route path={`${path}/security`} component={Security} />
          <Redirect to={`${path}/profile`} />
        </Switch>
      </div>
    </>
  );
};

export default withRouter(Setting);
