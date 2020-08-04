import React from 'react';
import './css/App.css';
import logo from './img/logo.jpg'
import Footer from './components/footer'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Reg from './components/reg'
import Login from './components/login'


class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      tit:[],//导航栏
      index:0,//判断下标保持高亮
      l:false,//弹出登录注册
      r:false,
      nikiname:null,
    }
  }
  componentDidMount(){
    React.axios.get('http://localhost:3000/api/types').then(res=>{
      this.setState({
          tit:this.state.tit.concat(res.data.res)
      })
      }).catch(err=>{
          console.log(err)
      })
      sessionStorage.titid=0
  }
  componentWillReceiveProps(){
    //根据详情页改变高亮
    setTimeout(()=>{
      if(Number(sessionStorage.titid) || Number(sessionStorage.titid)===0){
        this.setState({
          index:Number(sessionStorage.titid)
        })
      }
    },200)
  }
  changeIndex(n){
    sessionStorage.titid=n
    this.setState({
      index:Number(sessionStorage.titid)
    })
  }
  // 登录
  login(n){
    document.getElementsByClassName('box')[0].classList.remove('lea')
    if(n===false){
      this.setState({
        l:n
      })
      if(sessionStorage.nikiname){
        this.setState({
          nikiname:sessionStorage.nikiname
        })
      }
    }else{
      this.setState({
        l:true
      })
      document.getElementById('body').style.overflow='hidden'
    }
  }
  // 注册
  reg(n){
    document.getElementsByClassName('box')[1].classList.remove('lea')
    if(n===false){
      this.setState({
        r:n
      })
    }else{
      this.setState({
        r:true
      })
      document.getElementById('body').style.overflow='hidden'
    }
  }
  exit(){
    sessionStorage.removeItem('nikiname')
    this.setState({
      nikiname:null
    })
  }
  render (){
    return (
      <div className='App'>
        <div className='title'>
            <div className='heart'>
                <div className='logo'>
                    <img src={logo} alt=''/> 悦读 FM
                </div>
                <ul>
                    {
                        this.state.tit.map((item,index)=>
                            <li key={index}><Link className={this.state.index === index?'red':''} to={'/app/index/'+item.id} onClick={()=>this.changeIndex(index)}>{item.type}</Link></li>
                        )
                    }
                </ul>
                <div className='login'>
                    <input />
                    <div className={this.state.nikiname===null?'':'hide'}>
                        <span onClick={this.login.bind(this)}>登录</span>
                        <Login open1={this.state.l}  clo={this.login.bind(this)}/>
                        <span onClick={this.reg.bind(this)}>注册</span>
                        <Reg open2={this.state.r} clo={this.reg.bind(this)} />
                    </div>
                    <div className={this.state.nikiname!==null?'':'hide'}>
                      <span style={{color:'skyblue'}}>{this.state.nikiname}</span>
                      <span onClick={this.exit.bind(this)}>退出</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='content'>
          <div className='heart'>
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
      )
  }
}

export default App;
