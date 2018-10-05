import React, { Component } from 'react'
import './App.css'
import { FormGroup, FormControl, InputGroup, Glyphicon, ProgressBar } from 'react-bootstrap'

//COMPONENTS
import Profile from './Profile'

const Cant = (props) => {
    let template = props.cant === 0 ? 
    <h2>No Developers Found</h2> :
    props.cant !== null ?
    <h2>Developers Found: {props.cant}</h2> : ''
    return template
}
const Progress = (props) => {
    let template = props.searching === true ? <ProgressBar active now={100} /> : ''
    return template
}   
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            devs: [],
            devsFound: null,
            searching: false,
            page: 1
        }
    }
    search(step) {
        if (this.state.query === '')
            return

        switch(step) { 
            case 'next': {
                let max = Math.ceil(this.state.devsFound / 30) > 34 ? 34 : Math.ceil(this.state.devsFound / 30)
                let next = this.state.page === max ? this.state.page : this.state.page + 1
                this.setState({page : next}) 
                break
            } 
            case 'previous': { 
                let previous = this.state.page === 1 ? 1 : this.state.page - 1
                this.setState({page : previous})
                break
            } 
            default: { 
                this.setState({page : 1})
                break
            }
        }

        this.setState({searching: true})
        const BASE_URL = 'https://api.github.com/search/users'
        const FETCH_URL = `${BASE_URL}?q=${this.state.query}&page=${this.state.page}`
        console.log(FETCH_URL)
        fetch(FETCH_URL, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(json => {
            const devs = json.items
            this.setState({ devs })
            this.setState({ devsFound: json.total_count })
            this.setState({searching: false})
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="App">
                            <div className="App-title">GitHub User Search</div>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl
                                        type="text"
                                        placeholder="Search for a Developer..."
                                        value={this.state.query}
                                        onChange={event => {this.setState({query: event.target.value})}}
                                        onKeyPress={event => {
                                            if (event.key === 'Enter') {
                                                this.search()
                                            }
                                        }}
                                    />
                                    <InputGroup.Addon onClick={() => this.search()}>
                                        <Glyphicon glyph="search"></Glyphicon>
                                    </InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>
                            <Progress 
                                searching= {this.state.searching}
                            />
                            <div className="row">
                                <div className="btn-group" role="group" aria-label="...">
                                    <button type="button" className="btn btn-default" onClick={() => this.search('previous')}><span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button>
                                    <button type="button" className="btn btn-default" onClick={() => this.search('next')}><span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
                                </div>  
                            </div>
                            <Cant 
                                cant={this.state.devsFound}
                            />
                            {
                                this.state.devs.map(profile => {
                                    return (<Profile 
                                        dev={profile}
                                        key={profile.id}
                                    />)
                                })
                            }
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default App