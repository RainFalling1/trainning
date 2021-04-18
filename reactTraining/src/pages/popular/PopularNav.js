/**
 * popular顶部六个路由
 */
import {Link} from "react-router-dom";
import React from 'react';

const typeList = [
    {
        label: 'All',
        type: "all",
    },
    {
        label: 'Javascript',
        type: '+language:javascript',
    },
    {
        label: 'Ruby',
        type: '+language:Ruby',
    },
    {
        label: 'Java',
        type: '+language:Java',
    },
    {
        label: 'CSS',
        type: '+language:CSS',
    },
];

export default class PopularNav extends React.Component{

    constructor(props) {
        super(props);
        this.callback = this.props.callback;
        this.state = {
            index:0
        }
    }

    render() {
        const {callback} = this;
        return (
            // eslint-disable-next-line react/jsx-filename-extension
            <div style={{
                flexDirection: 'row',
                alignItems: 'center',
                display: 'flex',
                listStyle: 'none',
                fontWeight: 'bold',
            }}
            >
                {
                    typeList.map((i, index) => {
                        const navStr = `/popular?type=${i.label}`;
                        return(
                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                            <a onClick={() => {
                                this.setState({
                                    index
                                })
                                // eslint-disable-next-line no-unused-expressions
                                callback && callback(i.type)
                            }}
                               key={index}
                            >
                                <Link
                                    style={{margin: '10px 10px', textDecoration: 'none', fontSize: '16px'}}
                                    to={navStr}
                                    className={this.state.index === index ? 'topNavBtnSelect' : 'topNavBtn'}
                                >
                                    {i.label}
                                </Link>
                            </a>

                        )
                    } )
                }

            </div>
        );
    }
}

