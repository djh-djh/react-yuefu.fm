import React from 'react'
import '../css/rightList.css'
import {Link} from 'react-router-dom'

class List extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            title:null
        }
    }
    componentDidMount(){
        this.getData(this.props.match.params.type)
    }
    componentWillReceiveProps(newProps){
        this.getData(newProps.match.params.type )
    }
    getData(n){
        React.axios.get('http://localhost:3000/api/articles/'+n+'/top10 ').then(res=>{
            // console.log(res.data.res)
            this.setState({
                data:res.data.res.articles,
                title:res.data.res.type
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div className='rightList'>
                <h4>{this.state.title}频道TOP10</h4>
                <ul>
                    {
                        this.state.data.map((item,index)=>{
                            return <li key={index}>
                                <p><Link to={'/app/detail/'+item.id}>{item.title}</Link></p>
                                <p>文:<span>{item.author}</span>主播:<span>{item.podcast}</span></p>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default List