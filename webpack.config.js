const path=require('path')
const HtmlWebPackPlugin=require('html-webpack-plugin')
const htmlwebpackplugin= new HtmlWebPackPlugin({
    template:path.join(__dirname,"./src/index.html"),
    filename:"index.html"
})
module.exports={
    mode:"development",
    plugins:[
        htmlwebpackplugin
    ],
    module:{
        rules:[
            {
                test : /\.js|jsx$/,
                use : 'babel-loader',
                exclude : /node_modules/
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.ttf|woff|woff2|eot|svg$/,
                use:'url-loader'
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.(jpg|png|gif|bmp|jpeg)$/,
                use:'url-loader?13150&name=[hash:8]-[name].[ext]'
            }
        ]
    }

}
 