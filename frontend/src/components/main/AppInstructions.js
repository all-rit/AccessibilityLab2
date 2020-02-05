import React, {Component, Fragment} from 'react';

class AppInstructions extends Component {
    render() {

        return <Fragment>
            <p className="app__instructions" tabIndex={0}>Choose appropriate
            difficulty to begin game! Note: This activity requires headphones or speakers.</p>
        </Fragment>;
    }
}

export default AppInstructions;
