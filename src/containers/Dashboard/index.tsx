import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/actions"
import { Route, Switch, Redirect, useRouteMatch, NavLink, withRouter } from 'react-router-dom';
import './index.scss'
import Logo from '../../assets/images/alp.png'
import Notify from '../../assets/images/dashboard/bxs-bell.png'
import im_logo from '../../assets/images/dashboard/home.png'
import card_logo from '../../assets/images/dashboard/card.png'
import transact_logo from '../../assets/images/dashboard/transactions.png'
import settings from '../../assets/images/dashboard/set.png'
import utils_logo from '../../assets/images/dashboard/utitlity.png'

import Overview from './Routes/Overview';
import Cards from './Routes/Cards'
import Transactions from './Routes/Transactions'
import Utilities from './Routes/Utilities'
import Setting from './Routes/Setting'
import Loading from '../../components/Loading';
import { get_client_wallet } from '../../store/actions/wallet';


const Dashboard = (props: any) => {

    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.auth)
    const { processing } = useSelector((state: any) => state.wallet)

    useEffect(() => {
        const check = async () => {
            try {
                await dispatch(get_client_wallet());
            } catch (error) {
                console.log('error', error);
                throw error;
            }
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
        await dispatch(logout(user.email))
        props.history.push('/')
    }

    return (
        <section className='dashboard_main'>
            <div className='menu'>
                <div className="logo" onClick={() => {
                    props.history.push('/')
                }}>
                    <img src={Logo} alt="logo_image" />
                </div>
                <div className="sidenav">
                    <div className="sidenav_menu">
                        <div className="sidenav-list">
                            <NavLink to={`${url}/overview`}>
                                <img src={im_logo} alt="" />
                                Overview
                         </NavLink>
                            <NavLink to={`${url}/cards`}>
                                <img src={card_logo} alt="" />
                                Cards
                         </NavLink>
                            <NavLink to={`${url}/transactions`}>
                                <img src={transact_logo} alt="" />
                                Transactions
                         </NavLink>
                            <NavLink to={`${url}/utilities`}>
                                <img src={utils_logo} alt="" />
                                Utilities
                         </NavLink>
                            <NavLink to={`${url}/settings`}>
                                <img src={settings} alt="" />
                                Settings
                         </NavLink>
                            <a href="#" onClick={logOutHandler}>Log Out</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="dashboard_nav">
                    <div>
                        <img src={Notify} className='bell' />
                    </div>

                    <div className='profile_details'>
                        <img src="https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png" alt="" />
                        {user ? user.first_name : 'test'} {user ? user.last_name : 'test'}
                    </div>
                </div>
                <section>
                    <div className="container">
                        <div className="scroll">
                            <Switch>
                                <Route path={`${path}/overview`} component={Overview} />
                                <Route path={`${path}/cards`} component={Cards} />
                                <Route path={`${path}/transactions`} component={Transactions} />
                                <Route path={`${path}/utilities`} component={Utilities} />
                                <Route path={`${path}/settings`} component={Setting} />
                                <Redirect to="/" />
                            </Switch>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    )

}

export default withRouter(Dashboard)