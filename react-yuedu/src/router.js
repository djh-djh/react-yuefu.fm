import React from 'react'
import {BrowserRouter,Route,Redirect} from 'react-router-dom'
import App from './App'
import Detail from './components/detail'
import List from './components/List'
import RightList from './components/rightList'

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Route path='/app/:i' render={()=>
                    <App>
                        <Route path='/app/index/:type' component={List} />
                        <Route path='/app/index/:type' component={RightList} />
                        <Route path='/app/detail/:id' component={Detail} />
                    </App>
                }></Route>
                {/* 从定向 */}
                <Route path='/' render={()=>
                    <Redirect to='/app/index/1' />
                }></Route>
            </BrowserRouter>
        )
    }
}
export default Router