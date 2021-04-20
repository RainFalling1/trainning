import React, { lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import {HashRouter as Router, Route} from 'react-router-dom'
// eslint-disable-next-line import/no-unresolved
import Popular from "@/pages/popular/Popular";
// import Test from "../test";
import BattleResult from "../battle/BattleResult";
import TrainNav from "../../components/TrainNav";
// 懒加载
// const IconTest = lazy(() => import("../battle/IconTest"));
const Battle = lazy(() => import("../battle/Battle"));

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            // eslint-disable-next-line react/no-unused-state
            linkKey: 0
        }
    }


    render() {
        return (
            <Router>
                <div>
                    <TrainNav />
                    <Route path="/popular" exact component={Popular} />
                    <Route path="/popular/:type" exact component={Popular} />
                    <Suspense fallback={<div style={{textAlign:"center"}}>Loading...</div>}>
                        <Route path="/battle" exact component={Battle} />
                    </Suspense>
                    <Route path="/battle/:name" exact component={BattleResult} />
                </div>

            </Router>
        );
    }
}

export default hot(App);
