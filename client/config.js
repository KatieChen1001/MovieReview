/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://tpz1k05t.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // 获取所有的电影列表信息
        movieList: `${host}/weapp/movie`,

        // 获取点击的电影详细信息
        movieDetail: `${host}/weapp/movie/`,

        // 获取某一部被选中电影的所有评论
        comment: `${host}/weapp/comment/`,

        // 添加评论
        addComment: `${host}/weapp/comment`,

        // 获得电影详情
        commentDetail: `${host}/weapp/comment/detail/`,

        // 添加至我的收藏
        addToFav: `${host}/weapp/fav`,

        // 获得用户收藏的影评列表和用户发表的列表
        getList: `${host}/weapp/mine`
    }
};

module.exports = config;
