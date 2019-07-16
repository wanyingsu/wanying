import React,{Component} from 'react'
import {BrowserRouter,Switch,Route,} from 'react-router-dom'

import Admin from './gages/admin/admin'
import Login from './gages/login/login'



export default class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                     
                    <Route path='/login' component={Login}/>
                    <Route path="/" component={Admin}/>
                </Switch>
            </BrowserRouter>
            
        )
        
    }
}