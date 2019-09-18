import React, { Component } from 'react'
import '../../css/subcss/MovieItem.scss'
// 导入组件
import { Rate } from 'antd';
export default class MovieItem extends Component {
    render() {
        const urlBase="https://images.weserv.nl/?url="+`${this.props.images.small.replace('http://','')}`+""
        return (
            <div className="box">
                <img  src={urlBase} alt=""/>
                <h4>电影名称:{this.props.title}</h4>
                <h4>上映年份:{this.props.year}</h4>
                <h4>电影类型:{this.props.genres.join('，')}</h4>
                <Rate allowHalf defaultValue={this.props.rating.average/2} />
            </div>
        )
    }
}
