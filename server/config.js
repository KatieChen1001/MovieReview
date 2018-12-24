const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxddfc1102b7e4a72c',

    // 微信小程序 App Secret
    appSecret: '',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'wxddfc1102b7e4a72c',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh',

    // 为解决登陆时出现 Error: 响应错误，{"code":-1,"error":"ERR_REQUEST_PARAM"}，而申请了腾讯云appID，Github guide：https://github.com/tencentyun/wafer2-quickstart/issues/13
  qcloudAppId: '1257643707',
  qcloudSecretId: 'AKIDJJ93vo5NFg0KmUwT7JPPQYIZwf5hNtL6',
  qcloudSecretKey: 'fNvOZnrurkUjgTCvY8YEsQD5qZRDwZ3N',
}

module.exports = CONF
