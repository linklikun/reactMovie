import React, { Component } from 'react'
// 布局组件
import { Layout, Menu } from 'antd';
const { Content, Sider } = Layout;
// 路由组件
import {Route, Link } from 'react-router-dom'
// 导入样式
import '../../css/subcss/Movie.scss'
import MovieList from './MovieList.jsx';
export default class Movie extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Layout style={{ height:'100%'}}>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={[window.location.hash.split('/')[2]]}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="in_theaters"><Link to="/movie/in_theaters/1">正在热映</Link> </Menu.Item>
                        <Menu.Item key="coming_soon"><Link to="/movie/coming_soon/1">即将上映</Link></Menu.Item>
                        <Menu.Item key="top250"><Link to="/movie/top250/1">TOP250</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 1px 0px' }}>

                    <Content
                    style={{
                        background: '#fff',
                        padding: 10,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                        <Route path="/movie/:type/:page" component={MovieList}></Route>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
