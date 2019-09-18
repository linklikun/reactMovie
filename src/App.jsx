import React, { Component } from 'react'
import {HashRouter , Route, Link } from 'react-router-dom'
// 引入ant-sign
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider  } = Layout;
import 'antd/dist/antd.css'
// 引入App.scss
import './css/App.scss'
import Home from './compoent/Home/Home.jsx';
import Movie from './compoent/Movie/Movie.jsx';
import About from './compoent/About/About.jsx';
export default class App extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log(window.location.hash.split('/')[1]);
        
    }
    render() {
        return (
    <HashRouter >
        <Layout className="layout" style={{height:'100%'}  }>\
            <Header>
                <div className="logo" >
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[window.location.hash.split('/')[1]]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="home"><Link to='/home'>首页</Link></Menu.Item>
                    <Menu.Item key="movie"><Link to='/movie/in_theaters/1'>电影</Link></Menu.Item>
                    <Menu.Item key="about"><Link to='/about'>关于</Link></Menu.Item>
                
                </Menu>
            </Header>
            <Content >
                <div style={{ background: '#fff', padding: 0, minHeight: 280 ,height:'100%'}}>
                    <Route path='/home' component={Home} ></Route>
                    <Route path='/movie' component={Movie}></Route>
                    <Route path='/about' component={About}></Route>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Movie Design ©2019 Created by linklikun
            </Footer>
        </Layout>
    </HashRouter >

        )
    }
}
