/**
 * Created by kalle on 18.09.2015.
 */
import React from 'react';

class App extends React.Component {
    constructor() {
        super();
    }

    componentWillMount(){
    }

     componentDidMount(){

    }


    render() {
        return (

            <div>
                test4
            </div>
        );
    }
}

React.render(<App/>,
    document.getElementById('container')
);