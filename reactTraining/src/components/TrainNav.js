import { Link } from 'react-router-dom';
import './TrainNav.css';
import React from "react";


export default class TrainNav extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectIndex:0,
        };
    }

    render() {
        return (
            <div>
                <nav>
                    <ul style={{
                        display: 'flex', flexDirection: 'row', marginTop: '20px', marginLeft: '30px',
                    }}
                    >
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                        <li style={{ listStyle: 'none' }} onClick={() => this.setState({selectIndex:0})}>
                            <Link to="/popular?type=all" style={{ textDecoration: 'none' }} className={this.state.selectIndex === 0 ? 'SelectNav' : 'UnselectNav'}>Popular</Link>
                            <div className="underline-bar" />
                        </li>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                        <li style={{ marginLeft: 10, listStyle: 'none' }} onClick={() => this.setState({selectIndex:1})}>
                            <Link to="/battle" style={{ textDecoration: 'none' }} className={this.state.selectIndex === 1 ? 'SelectNav' : 'UnselectNav'}>Battle</Link>
                            <div className="underline-bar" />
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
};

