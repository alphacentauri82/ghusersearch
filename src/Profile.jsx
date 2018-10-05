import React, { Component}  from 'react'
import './App.css'

 class Profile extends Component {
    render() {
        let dev = {
            avatar_url: '',
            score: 0,
            html_url: '',
            login: ''
        }
        dev = this.props.dev !== undefined ? this.props.dev : dev
        
        return(
            <div className="col-sm-6">
                <div className="thumbnail">
                <img 
                    alt="Profile"
                    className="profile-img"
                    src={dev.avatar_url}
                />
                <div className="caption">
                    <h3>Name: {dev.login}</h3>
                    <p><a href={dev.html_url} target="_blank" className="btn btn-primary" role="button">Profile</a></p>
                </div>
                </div>
            </div>
        )
    }
 }
 export default Profile