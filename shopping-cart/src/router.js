/**
 * 路由
 */

import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './pages/products/products';

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={IndexPage} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;
