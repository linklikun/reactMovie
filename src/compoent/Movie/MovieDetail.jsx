import React, { Component } from 'react'
// 导入组件
import { Button, Icon, Spin, Alert } from 'antd'
import fetchJsonp from 'fetch-jsonp'
// 导入样式
import '../../css/subcss/MovieDetail.scss'
export default class MovieDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            info:{},
            isLoading:true
        }
        this.goBackMovieList=this.goBackMovieList.bind(this)
        this.renderInfo=this.renderInfo.bind(this)
    }
    componentWillMount(){
        const url = 'https://api.douban.com/v2/movie/subject/'+this.props.match.params.id+'?apikey=0df993c66c0c636e29ecbb5344252a4a'
        fetchJsonp(url)
        .then((respose)=>{
            return respose.json()
        }).then((data)=>{
            console.log(data);
            this.setState({
                info:data,
                isLoading:false
            })
        })
    }
    goBackMovieList(){
        this.props.history.go(-1)
    }
    render() {
        return (
            <div>
                <Button  type="primary" onClick={this.goBackMovieList}>
                    <Icon type="left" />
                    Go back
                </Button>
                {this.renderInfo()}
            </div>
        )
    }
    renderInfo(){
        if(this.state.isLoading){
            return (
                <Spin tip="Loading..." >
                    <Alert
                    message="正在请求电影数据"
                    description="精彩内容，马上呈现！"
                    type="info"
                    />
                </Spin>
                )
        }else{
            return (
                <div className="movieInfo">
                    <h1>{this.state.info.title}</h1>
                    <img src={this.state.info.images.large} alt=""/>
                    <p>{this.state.info.summary}</p>
                </div>
            )

        }
    }
}
