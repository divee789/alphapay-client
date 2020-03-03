import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/actions"
import { Route, Switch, Redirect, useRouteMatch, NavLink, withRouter } from 'react-router-dom';

import './index.scss'

import Overview from './Routes/Overview';
import Courses from './Routes/Courses'
import Setting from './Routes/Setting'
import Loading from '../../components/Loading';


const Dashboard = (props: any) => {

    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.auth)
    const { processing } = useSelector((state: any) => state.course)
    useEffect(() => {
        const check = async () => {
            // try {
            //     await dispatch(get_level_courses(user.level));
            // } catch (error) {
            //     // if refresh token has expired, dispatch LOGOUT THINGS
            //     console.log('error', error);
            //     throw error;
            // }
        };
        check()
    }, [dispatch]);
    let { path, url } = useRouteMatch();

    if (processing) {
        return (
            <Loading />
        )
    }

    const logOutHandler = async e => {
        e.preventDefault()
        await dispatch(logout())
        props.history.push('/')
    }

    return (
        <section className='dashboard_main'>
            <div className='menu'>
                <div className="sidenav">
                    <div className="sidenav_menu">
                        <div className='user_info'>

                            <p className="greet_user">
                                Hello {' '}
                                <span className="username">{user.matriculation_number}</span>
                            </p>
                            <p className='date'>{new Date().toLocaleString()}</p>

                        </div>
                        <div className="sidenav-list">
                            <NavLink to={`${url}/overview`}>
                                Overview
                         </NavLink>
                            <NavLink to={`${url}/courses`}>
                                Courses
                         </NavLink>
                            <NavLink to={`${url}/levels`}>
                                Register courses
                         </NavLink>
                            <NavLink to={`${url}/department`}>
                                Department
                         </NavLink>
                            <NavLink to={`${url}/settings`}>
                                Settings
                         </NavLink>
                            <a href="#" onClick={logOutHandler}>Log Out</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main">
                <Switch>
                    <Route path={`${path}/overview`} component={Overview} />
                    <Route path={`${path}/courses`} component={Courses} />
                    <Route path={`${path}/settings`} component={Setting} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </section>
    )

}

export default withRouter(Dashboard)