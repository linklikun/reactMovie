# this is react project
![](https://i.imgur.com/hTm4HiC.png)
![](https://i.imgur.com/SMKKFrI.png)

## 初步完成电影页面构建  

### 1 使用antdesigin来构建整体页面框架，去掉不必要的提示  

1.1 熟悉antdesign的各类框架  
1.2 安装antdesign包  
1.3 按需导入组件，有时候需要重新为组建命名  
1.4 熟悉组件库的各类组件

### 2 获取豆瓣数据

2.1 豆瓣数据公开，但是有很多限制
2.2 采用react自带fetch请求数据
```
fetch(url)
.then(()=>{return res})
.then((data)=>{console.log(data)})
```

在fetch中第一次返回的是是一个response的异步结果而不是数据，需要将response return返回才会在下一个.then中获取到数据。  
直接使用fetch会出现跨域问题，因为豆瓣的域名和我们不同源，这时候使用fetchJsonp解决。  
2.2.1 安装fetchJsonp  
2.2.2 导入，直接使用  

```
fetchJsonp(url)
.then(res=>res.json())
.then((data)=>{
    console.log(data);
    this.setState({
        isLoading:false,
        movie:data.subjects,
        total:data.total
    })
})
```
2.3 拼接url时使用&{} es6语法  

``` 
const url="http://api.douban.com/v2/movie/"+`${this.state.movieType}`+"?apikey=0df993c66c0c636e29ecbb5344252a4a&start="+`${start}`+"&count="+`${pageSize}`+""
```

2.4 导入豆瓣数据是出现403错误、加载不出图片和限制次数  
2.4.1 豆瓣API有变化，需要在请求API的url后面跟一个apikey参数，电影列表API：<http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10>  
2.4.2 豆瓣API是有请求次数限制的”，这会引发图片在加载的时候出现403问题，视图表现为“图片加载不出来”，控制台表现为报错403。  
其实是豆瓣限制了图片的加载，我自己用了一个办法把图片缓存下来：
只要在请求到的图片链接前面加上<https://images.weserv.nl/?url=>即可（注：这是一个专门缓存图片的网址），可能会有点慢。  
_url:通过异步请求得到的图片链接，这个是我从豆瓣请求到的一个图片链接：<http://img3.doubanio.com/view/photo/s_ratio_poster/public/p511146807.jpg>

_u:提取<http://后面的部分>

用字符串拼接的方法将两个链接拼起来，就可以将图片加载出来。
