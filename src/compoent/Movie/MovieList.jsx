import React, { Component } from 'react'
//导入ant组件 
import { Spin, Alert, Pagination  } from 'antd';
// 导入fetchjsonP
import fetchJsonp from 'fetch-jsonp';
// 导入item
import MovieItem from './MovieItem.jsx';
//导入样式 
import '../../css/subcss/MovieList.scss'
export default class MovieList extends Component {
    constructor(props){
        super(props)
        this.state={
            movie:[],//电影列表
            nowPage:parseInt(props.match.params.page) || 1,//当前展示第几页的数据，默认第一页
            pageSize:16,//每条页面显示多少数据
            total:0,//当前电影分类下，总共多少条数据
            isLoading:true,
            movieType:props.match.params.type //保存获取电影的类型
        }
        this.renderList=this.renderList.bind(this)
        this.loadMovieListByTypeAndPage=this.loadMovieListByTypeAndPage.bind(this)
        this.pageChange=this.pageChange.bind(this)
    }
    componentWillUpdate(prevProps){

        if(prevProps.match.params.type != this.state.movieType){
            this.setState({
                isLoading: true,
                nowPage: parseInt(prevProps.match.params.page) || 1,
                movieType: prevProps.match.params.type
            },function(){
                this.loadMovieListByTypeAndPage()
            })
        }

    }
    componentDidMount(){
        this.loadMovieListByTypeAndPage()
    }
    render() {
        return (
            <div style={{height:'100%'}}>
                {this.renderList()}
            </div>
        )
    }
    loadMovieListByTypeAndPage(){
        // 默认的fetch收到浏览器跨域的限制改用fetchjsonp
        // fetch('https://douban.uieee.com/v2/movie/in_theaters')
        // .then((res)=>{
        //     return res.json
        // }).then((data)=>{
        //     console.log(data)
        // })
        // console.log(this.state.movieType);
        // console.log(this.state.nowPage);
        const pageSize = this.state.pageSize
        const address = this.state.movieType
        const start=this.state.pageSize*(this.state.nowPage-1)
        const url="http://api.douban.com/v2/movie/"+`${this.state.movieType}`+"?apikey=0df993c66c0c636e29ecbb5344252a4a&start="+`${start}`+"&count="+`${pageSize}`+""
        fetchJsonp(url)
        .then(res=>res.json())
        .then((data)=>{
            // console.log(data);
            this.setState({
                isLoading:false,
                movie:data.subjects,
                total:data.total
            })
        })

        
    }
    pageChange(page){
        // console.log(page+'----'+pageSize);
        // 第一种不适合
        // window.location.href='/#/movie/'+this.state.movieType+'/'+page
        // window.location.reload()
        // 第二种
        // this.props.history.push('/movie/'+this.state.movieType+'/'+page)
        // 第三种
        this.setState({
            nowPage:page
        },function(){
            this.props.history.push('/movie/'+this.state.movieType+'/'+page)
            this.loadMovieListByTypeAndPage()
        })
    }
    renderList(){
        if(this.state.isLoading){
            return (
            <Spin tip="Loading..." >
                <Alert
                message="正在请求电影列表"
                description="精彩内容，马上呈现！"
                type="info"
                />
            </Spin>
            )
        }else{
            return (
                <div >
                    <div className="movieList">
                        {this.state.movie.map((item)=>{
                            return (
                                <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>
                            )
                        })}
                        
                    </div>
                    <div className="pageCode">
                        <Pagination defaultCurrent={this.state.nowPage} total={this.state.total} pageSize={this.state.pageSize} onChange={this.pageChange}/>
                    </div>
                </div>
            )
           
        }
    
    }
}
