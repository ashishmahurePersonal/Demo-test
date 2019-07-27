import * as React from 'react';
import './App.css';
import PostsList from '../posts/components/PostsList';

const logo = require('./logo.png');

class App extends React.Component {
    render() {
        return (
            <div>
                <header className="header">
                    <img className="logo" src={logo} alt="Logo"/>
                    <h1>Show 10 most popular GitHub repositories from users in your city.</h1>
                </header>
                <PostsList/>
            </div>
        );
    }
}

export default App;
