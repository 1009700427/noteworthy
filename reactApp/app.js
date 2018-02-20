/**
 * Created by siyuanxu on 2/11/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './src/Login/loginPage';
import SignUp from './src/SignUp/signUp';
import backgroundImage from "./src/img/login-background.jpg";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './app.less';

const router = (
    <div>
        <img id="background-img" src={backgroundImage} alt="background image"/>
        {/*<NavbarTop/>*/}
        <div className="container-fluid">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={LoginPage}/>
                    <Route path="/sign-up" exact component={SignUp}/>
                </Switch>
            </BrowserRouter>



            {/*<HashRouter history={history}>*/}
                {/*<div>*/}
                    {/**/}
                {/*</div>*/}
            {/*</HashRouter>*/}
        </div>
    </div>
);

ReactDOM.render(router, document.getElementById('root'));
