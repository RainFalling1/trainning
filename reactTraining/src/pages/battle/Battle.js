/**
 * battle页面
 */
import React from 'react';
import './CSS.css';
import {Link} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import {
    Row, Col, Button, Input, notification,Alert
} from 'antd';

// eslint-disable-next-line no-unused-vars

class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input1: "",
            input2: "",
            avatar1: "",
            avatar2: "",
            battleBtn: false,
        };
    }


    handleSubmit = async (index) => {
        // return
        await axios.get(`https://api.github.com/users/${index === 1 ? this.state.input1 : this.state.input2}`)
            .then((res) => {
                if (res?.data?.avatar_url) {
                    if (index===1){
                        this.setState({
                            avatar1: res.data.avatar_url
                        })
                    }else {
                        this.setState({
                            avatar2: res.data.avatar_url
                        })
                    }
                    if (this.state.avatar1 && this.state.avatar2){
                        this.setState({
                            battleBtn: true
                        })
                    }
                }
            })
            .catch((res) => {
                const {response} = res;
                notification.open({
                    type: "error",
                    message: '错误',
                    description: response.data.message,
                });
            });
    };

    render() {


        return (

            // eslint-disable-next-line react/jsx-filename-extension
            <div style={{textAlign: 'center', padding: '0 10%'}}>
                <div style={{backgroundColor: '#fff'}}>
                    <h1 style={{
                        textAlign: 'center',
                        fontSize: '35px',
                        fontWeight: 300,
                        marginBottom: '20px',
                        display: 'block',
                        paddingTop: '100px',
                    }}
                    >Instrutions
                    </h1>
                    <Row justify="center">
                        <Col xs={24} sm={24} md={8}>
                            <h3 style={{
                                fontSize: '28px', fontWeight: 300, margin: '10px', display: 'block',
                            }}
                            >Enter two Github users
                            </h3>
                            <svg
                                style={{
                                    stroke: 'currentColor',
                                    fill: 'currentColor',
                                    background: 'rgba(0, 0, 0, 0.08)',
                                    width: '220px',
                                    height: '220px',
                                    boxSizing: 'border-box',
                                }}
                                t="1573962927204"
                                className="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="3252"
                                width="128"
                                height="128"
                            >
                                <path
                                    d="M693.76 929.28h-550.4c-17.92 0-38.4-7.68-48.64-23.04-12.8-15.36-17.92-33.28-15.36-51.2l10.24-74.24c2.56-23.04 17.92-40.96 38.4-51.2 35.84-15.36 99.84-40.96 171.52-58.88-35.84-40.96-66.56-107.52-66.56-222.72 0-174.08 102.4-209.92 186.88-209.92s186.88 35.84 186.88 209.92c0 115.2-28.16 184.32-64 222.72 71.68 15.36 133.12 40.96 168.96 58.88 20.48 10.24 35.84 28.16 38.4 51.2l10.24 74.24c2.56 17.92-2.56 38.4-15.36 51.2-15.36 15.36-33.28 23.04-51.2 23.04z m-276.48-637.44c-94.72 0-135.68 48.64-135.68 158.72 0 140.8 46.08 194.56 87.04 215.04 10.24 5.12 15.36 15.36 12.8 28.16-2.56 10.24-10.24 20.48-20.48 20.48-89.6 12.8-179.2 48.64-215.04 64-5.12 2.56-7.68 5.12-7.68 10.24l-10.24 74.24c0 5.12 2.56 10.24 2.56 12.8 2.56 2.56 5.12 5.12 10.24 5.12h550.4c5.12 0 10.24-2.56 10.24-5.12 2.56-2.56 5.12-5.12 2.56-12.8l-10.24-74.24c0-5.12-2.56-10.24-7.68-10.24-33.28-15.36-122.88-51.2-212.48-64-10.24-2.56-20.48-10.24-20.48-20.48s2.56-23.04 12.8-28.16c56.32-28.16 84.48-102.4 84.48-215.04 2.56-110.08-38.4-158.72-133.12-158.72z"
                                    p-id="3253"/>
                                <path
                                    d="M883.2 801.28h-69.12c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6h69.12c5.12 0 10.24-2.56 10.24-5.12 2.56-2.56 5.12-5.12 2.56-12.8l-10.24-74.24c0-5.12-5.12-10.24-7.68-10.24-33.28-15.36-122.88-51.2-212.48-64-10.24-2.56-20.48-10.24-20.48-20.48s2.56-23.04 12.8-28.16c56.32-28.16 84.48-102.4 84.48-215.04 0-110.08-40.96-158.72-135.68-158.72-48.64 0-84.48 12.8-104.96 40.96-7.68 10.24-25.6 12.8-35.84 5.12-10.24-7.68-12.8-25.6-5.12-35.84 30.72-40.96 81.92-61.44 145.92-61.44 84.48 0 186.88 35.84 186.88 209.92 0 115.2-28.16 184.32-64 222.72 71.68 15.36 133.12 40.96 168.96 58.88 20.48 10.24 35.84 28.16 38.4 51.2l10.24 74.24c2.56 17.92-2.56 38.4-15.36 53.76s-30.72 20.48-48.64 20.48z"
                                    p-id="3254"/>
                            </svg>
                            {/* <span className={"fa icon-user"} style={{fontSize:29,color:"#ef8a33"}}/> */}
                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <h3 style={{fontSize: '28px', fontWeight: 300, margin: '10px', display: 'block'}}
                            >Battle
                            </h3>
                            <svg
                                style={{
                                    stroke: 'currentColor',
                                    fill: 'currentColor',
                                    background: 'rgba(0, 0, 0, 0.08)',
                                    width: '220px',
                                    height: '220px',
                                    boxSizing: 'border-box',
                                }}
                                t="1573962778824"
                                className="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="2454"
                                width="128"
                                height="128"
                            >
                                <path
                                    d="M819.746133 625.060978c23.1424-26.703644 34.144711-50.824533 25.656889-60.984889-5.870933-7.031467-20.024889-6.030222-38.252089 1.194667l-6.417067-30.503822c20.571022-25.7024 29.434311-48.571733 20.6848-59.483022-5.688889-7.088356-17.999644-7.941689-33.9968-3.731911l-16.896-80.236089c99.362133-117.805511 140.424533-215.881956 114.699378-241.607111S761.423644 165.057422 643.618133 264.419556l-80.236089-16.896c4.209778-15.997156 3.356444-28.307911-3.731911-33.9968-10.899911-8.749511-33.769244 0.113778-59.483022 20.6848l-30.503822-6.417067c7.224889-18.215822 8.226133-32.369778 1.194667-38.252089-10.160356-8.487822-34.269867 2.514489-60.984889 25.656889l-120.001422-25.258667-64.364089 64.364089 110.455467 57.048178c-9.4208 21.026133-11.457422 37.614933-3.6864 44.100267 9.102222 7.600356 29.3888-0.4096 52.713244-18.784711l26.953956 13.9264c-9.022578 22.971733-10.148978 41.107911-1.046756 48.412444 10.638222 8.533333 32.6656 0.295822 57.594311-19.205689l37.944889 19.592533c-1.115022 1.262933-2.230044 2.480356-3.345067 3.754667-71.076978 80.9984-134.883556 156.9792-181.4528 219.9552l-128.295822-14.802489-48.275911 48.275911 113.436444 64.386844c-15.519289 31.118222-19.672178 53.521067-8.851911 64.341333 10.820267 10.820267 33.223111 6.667378 64.341333-8.851911l64.386844 113.436444 48.275911-48.275911-14.802489-128.295822c62.987378-46.569244 138.9568-110.375822 219.9552-181.4528 1.274311-1.115022 2.491733-2.230044 3.754667-3.345067l19.592533 37.944889c-19.501511 24.928711-27.739022 46.956089-19.205689 57.594311 7.304533 9.102222 25.440711 7.975822 48.412444-1.046756l13.9264 26.953956c-18.375111 23.324444-26.385067 43.611022-18.784711 52.713244 6.485333 7.771022 23.085511 5.723022 44.100267-3.6864l57.048178 110.455467 64.364089-64.364089L819.746133 625.060978z"
                                    p-id="2455"/>
                            </svg>
                            {/* <span className={"fa icon-user"} style={{fontSize:29,color:"#ef8a33"}}/> */}

                        </Col>
                        <Col xs={24} sm={24} md={8}>
                            <h3 style={{fontSize: '28px', fontWeight: 300, margin: '10px', display: 'block'}}
                            >See the winner
                            </h3>
                            <svg
                                style={{
                                    stroke: 'currentColor',
                                    fill: 'currentColor',
                                    background: 'rgba(0, 0, 0, 0.08)',
                                    width: '220px',
                                    height: '220px',
                                    paddingTop: '20px',
                                    paddingBottom: '20px',
                                    boxSizing: 'border-box',
                                }}
                                t="1573962977925"
                                className="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="4526"
                                width="128"
                                height="128"
                            >
                                <path
                                    d="M975.7 188.4H868.9v-68c0-26.7-21.7-48.3-48.3-48.3H203.4c-26.7 0-48.3 21.7-48.3 48.3v68H48.3C21.7 188.4 0 210.1 0 236.8V328c0 48.4 17.9 94.6 50.5 130.2 33.4 36.5 78.3 57.3 126.4 58.8 1.9 0.1 3.7 0.1 5.6 0.1 5.2 0 10.5-0.2 15.7-0.7 14.7 27.7 32.9 53.6 54.4 77.1 47.7 52.1 107.8 88 173.8 104.6V893c0 1.3 0.1 2.6 0.3 3.9h-89.1c-15.2 0-27.5 12.3-27.5 27.5s12.3 27.5 27.5 27.5h348.9c15.2 0 27.5-12.3 27.5-27.5s-12.3-27.5-27.5-27.5h-89.1c0.2-1.3 0.3-2.5 0.3-3.9V698.4c14.1-3.5 28.1-7.8 41.8-13.1 44.4-17 84.4-42.3 118.9-75.2 28.7-27.3 52.2-58.7 70.3-93.5 2.4 0.2 4.8 0.3 7.3 0.4 1.9 0.1 3.8 0.1 5.7 0.1 47.7 0 92.6-18.2 127-51.5 35.8-34.7 55.4-81.2 55.4-131.1v-97.7c-0.1-26.7-21.8-48.4-48.4-48.4zM54.9 328v-84.7H155v99c0 41.1 6.7 81.5 19.6 119.6-66.3-4.1-119.7-63.3-119.7-133.9zM543 897h-62c0.2-1.3 0.3-2.5 0.3-3.9V707.4c4.5 0.4 9 0.7 13.5 0.9 5.8 0.3 11.6 0.4 17.4 0.4 10.2 0 20.4-0.4 30.5-1.3V893c0 1.4 0.1 2.7 0.3 4z m177.4-326.6c-29.2 27.9-63.1 49.3-100.6 63.6-16.9 6.5-34.2 11.3-51.8 14.6-1.8 0.1-3.5 0.4-5.2 0.9-21.4 3.6-43.3 5-65.5 3.9-12.5-0.6-24.8-2-37-4.1-0.9-0.2-1.9-0.4-2.9-0.5-62.5-11.7-119.8-43.6-164.4-92.3-53.5-58.5-83-134.6-83-214.2V127h604v224.6c0 42.1-8.5 82.8-25.2 121-16.1 37-39.1 69.8-68.4 97.8z m248.7-235.9c0 34.8-13.8 67.4-38.8 91.7-21.6 20.9-49.1 33.3-78.6 35.6 11.5-35.4 17.3-72.3 17.3-110.2V243.4h100.1v91.1z"
                                    fill="#f4ea2a" p-id="4527"/>
                            </svg>
                        </Col>
                    </Row>

                </div>
                <h1 style={{
                    textAlign: 'center',
                    fontSize: '35px',
                    fontWeight: 300,
                    marginBottom: '20px',
                    display: 'block',
                    paddingTop: '100px',
                }}>Players</h1>
                <Row type="flex" justify="center" align="center">
                    <Col md={12} sm={24}>
                        {this.state.avatar1 ? (
                            <div
                                style={{
                                    width: '348px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    background: '#DDDDDD',
                                    padding: '20px',
                                    margin: '30px auto',
                                }}>
                                <img
                                    src={this.state.avatar1}
                                    alt="user1"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                    }}/>
                                <span style={{margin: '0 40px'}}>{this.state.input1}</span>
                                <i
                                    className="fa fa-close"
                                    style={{fontSize: '24px', cursor: 'pointer',color:'red'}}
                                    onClick={() => this.setState({
                                        avatar1: "",
                                        battleBtn:false
                                    })}/>
                            </div>
                        ) : (
                            <div style={{margin: '20px auto'}}>
                                <Input
                                    type="text"
                                    style={{width: "220px", height: "36px"}}
                                    value={this.state.input1}
                                    onChange={(e) => this.setState({input1: e.target.value})}
                                    onKeyDown={(e) => {
                                        if (e.keyCode !== 13) return;
                                        this.handleSubmit(1);
                                    }}/>
                                <Button
                                    style={{width: "120px", height: '36px', marginLeft: "10px"}}
                                    disabled={!this.state.input1}
                                    type="primary"
                                    onClick={() => this.handleSubmit(1)}
                                    onSubmit={() => this.handleSubmit(1)}>
                                    submit
                                </Button>
                            </div>
                        )}
                    </Col>

                    <Col md={12} sm={24}>
                        {this.state.avatar2 ? (
                            <div
                                style={{
                                    width: '348px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    background: '#DDDDDD',
                                    padding: '20px',
                                    margin: '30px auto',
                                }}>
                                <img
                                    src={this.state.avatar2}
                                    alt="user1"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                    }}/>
                                <span style={{margin: '0 40px'}}>{this.state.input2}</span>
                                <i
                                    className="fa fa-close"
                                    style={{fontSize: '24px', cursor: 'pointer',color:'red'}}
                                    onClick={() => this.setState({
                                        avatar2: "",
                                        battleBtn:false
                                    })}/>
                            </div>
                        ) : (
                            <div style={{margin: '20px auto'}}>
                                <Input
                                    type="text"
                                    style={{width: "220px", height: "36px"}}
                                    value={this.state.input2}
                                    onChange={(e) => this.setState({input2: e.target.value})}
                                    onKeyDown={(e) => {
                                        if (e.keyCode !== 13) return;
                                        this.handleSubmit(2);
                                    }}/>
                                <Button
                                    style={{width: "120px", height: '36px', marginLeft: "10px"}}
                                    disabled={!this.state.input2}
                                    type="primary"
                                    onClick={() => this.handleSubmit(2)}
                                    onSubmit={() => this.handleSubmit(2)}>
                                    submit
                                </Button>
                            </div>
                        )}
                    </Col>

                    {this.state.battleBtn ? (
                            <Link
                                to={{
                                    pathname: `/battle/results?playerOne=${this.state.input1}&playerTwo=${this.state.input2}`,
                                    state: [this.state.input1, this.state.input2],
                                }}
                                style={{
                                    display: 'flex',
                                    flex: 1,
                                    background: '#ef8a33',
                                    color: '#fff',
                                    margin: '40px auto',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.25em',
                                    borderRadius: '3px',
                                    border: 'none',
                                    fontSize: '16px',
                                    justifyContent: 'center',
                                    alignitems: 'center',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    height:"36px",
                                    lineHeight:"36px",
                                    maxWidth: '180px',
                                }}
                            >Battle
                            </Link>
                        )
                        : <div />}
                </Row>


            </div>

        );
    }
}

export default Battle;
