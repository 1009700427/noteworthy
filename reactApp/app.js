/**
 * Created by siyuanxu on 2/11/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './src/Login/loginPage';
import SignUp from './src/SignUp/signUp';
import UserHome from './src/UserHome/userHome';
import TextEditor from './src/Components/TextEditor/textEditor';
import backgroundImage from "./src/img/login-background.jpg";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux';
import './app.less';

const router = (
    <div>
        <img id="background-img" src={backgroundImage} alt="background image"/>
        {/*<NavbarTop/>*/}
        <div className="container-fluid">
            <Provider store={ store }>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={LoginPage}/>
                        <Route path="/sign-up" exact component={SignUp}/>
                        <Route path="/user-home" exact component={UserHome}/>
                        <Route path="/text-editor" exact component={TextEditor}/>
                    </Switch>
                </BrowserRouter>
            </Provider>


            {/*<HashRouter history={history}>*/}
                {/*<div>*/}
                    {/**/}
                {/*</div>*/}
            {/*</HashRouter>*/}
        </div>
    </div>
);

ReactDOM.render(router, document.getElementById('root'));
