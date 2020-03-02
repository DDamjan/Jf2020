import React, { Component } from 'react'
import {connect} from 'react-redux';
import * as userActions from '../common/actions/userActions';

class AccountVerification extends Component {

    componentDidMount(){
        this.props.verify(this.props.match.params.token)
    }

    render() {
        return (
            <div>
{               this.props.message
}            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        message: state.verifyMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        verify: token => (dispatch(userActions.verifyAccount(token)))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountVerification);
