import React, { useState } from 'react';

import { Route, Switch, Redirect, useRouteMatch, NavLink, withRouter } from 'react-router-dom';
import Profile from './Profile'
import Security from './Security'
import './index.scss'


const Setting: React.FC = () => {

    let { path, url } = useRouteMatch();


    return (
        <>
            <div className='settings_nav'>
                <div className="settings_link">
                    <NavLink to={`${url}/profile`} aria-expanded="false" data-toggle="tab">
                        {/* <img src={im_logo} alt="" /> */}
                        Profile
                         </NavLink>
                </div>
                <div className="settings_link">
                    <NavLink to={`${url}/security`} aria-expanded="false" data-toggle="tab">
                        {/* <img src={im_logo} alt="" /> */}
                        Security
                         </NavLink>
                </div>
            </div>
            <div className="settings_content">
                <Switch>
                    <Route path={`${path}/profile`} component={Profile} />
                    <Route path={`${path}/security`} component={Security} />
                    <Redirect to={`${path}/profile`} />
                </Switch>
            </div>
        </>
    )
}

export default withRouter(Setting)