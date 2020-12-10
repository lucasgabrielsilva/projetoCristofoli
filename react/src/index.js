import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Monitor from './pages/monitor';
import Teste1 from './pages/teste1';
import Analyze from './pages/analyze';
import Compare from './pages/compare';
import SendData from './pages/sendData';

import './index.css';

window.onload = () => {
    ReactDOM.render(
        <HashRouter basename="/">
            <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/monitor" component={Monitor} exact />
                <Route path="/teste1" component={Teste1} exact />
                <Route path="/analise" component={Analyze} exact />
                <Route path="/compare" component={Compare} exact />
                <Route path="/sendData" component={SendData} exact />
            </Switch>
        </HashRouter>,
        document.getElementById('root'),
    );
};
