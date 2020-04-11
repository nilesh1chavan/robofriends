import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {

    componentDidMount(){
        this.props.onRequestRobots();
        // fetch('https://jsonplaceholder.typicode.com/users')
        // .then(response => response.json())
        // .then(users => this.setState({ robots: users }));
    }

    // onSearchChange = (event) => {
    //     this.setState({
    //         searchField: event.target.value
    //     })
    // }

    render() {
        //const { robots } = this.state;
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return isPending? 
                <h1>Loading...</h1>:
                (
                    <div className='tc'>
                        <h1 className='f2'>Robofriends</h1>
                        <SearchBox searchChange={onSearchChange} />
                        <Scroll>
                            <ErrorBoundry>
                                <CardList robots={ filteredRobots } />
                            </ErrorBoundry>
                        </Scroll>
                    </div>
                );       
    }
} 

//export default App;

export default connect(mapStateToProps, mapDispatchToProps)(App);