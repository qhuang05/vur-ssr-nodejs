// 使用html模板
// 模板文件中需要固定写<!--vue-ssr-outlet-->,否则编译会报错
const server = require('express')()
const Vue = require('vue')
const fs = require('fs')
const path = require('path')
const vueRenderer = require('vue-server-renderer').createRenderer({
	template: fs.readFileSync(path.join(__dirname, './template.html'), 'utf-8')
})

const createApp = (context)=>{
	return new Vue({
		data:{
			message: 'Hello, vue-ssr',
			url: context.url
		},
		template: `<div>
			<div>{{message}}</div>
			<div>您当前访问的路径是：{{url}}</div>
		</div>`
	})
}

server.get('*', (req,res)=>{
	res.status(200);
  	res.setHeader('Content-Type', 'text/html;charset=utf-8;')

	let app = createApp({url: req.url})
	let info = {
		title: '使用html页面模板做渲染',
	}
	vueRenderer.renderToString(app, info, (error,html)=>{
		res.end(html);
	})
})

server.listen(9000, ()=>{
	console.log('启动成功');
})