import React, { Component } from 'react'
import './Spinner.css'

export default class Spinner extends Component {
    render() {
        let classLable = `preloader-wrapper small active ${this.props.class? this.props.class : ''}`;
        return (
            <div className={classLable}>
                            <div className="spinner-layer spinner-white-only">
                                <div className="circle-clipper left">
                                <div className="circle"></div>
                                </div><div className="gap-patch">
                                <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                            </div>
                        </div>
        )
    }
}
