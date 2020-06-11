module.exports = {
    // 相当于webpack-dev-server，对本地服务器进行配置 
    devServer: {
        proxy: {
            "/api": {
                target: "https://newapi.meishi.cc" ,
                changeOrigin: true, 
                ws: true,
                pathRewrite: {
                    "^/api": ''
                }
            },
			"/bpi": {
			    target: "https://api.meishi.cc" ,
			    changeOrigin: true, 
			    ws: true,
			    pathRewrite: {
			        "^/bpi": ''
			    }
			},
			// "/cpi": {
			//     target: "http://127.0.0.1:5000" ,
			//     changeOrigin: true, 
			//     ws: true,
			//     pathRewrite: {
			//         "^/cpi": ''
			//     }
			// }
        }
    }
}
