/**
 * Created by siyuanxu on 2/19/18.
 */
import React, { Component } from 'react';
import './welcome.less';
export default class Welcome extends Component {
    render() {
        return(
            <div>
                <div id="welcome">
                    <h2>Welcome &nbsp;to&nbsp; Noteworthy!</h2>
                </div>
                <div className="vl"></div>
            </div>
        );
    }
}