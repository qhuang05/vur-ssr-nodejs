const server = require('express')()
const Vue = require('vue')
const fs = require('fs')
const path = require('path')
const vueRenderer = require('vue-server-renderer').createRenderer({
	template: fs.readFileSync(path.join(__dirname, './template.html'), 'utf-8')
})

// 将创建vue实例分离到外部文件
const createApp = require('./src/entry-server.js')
server.get('*', async (req,res)=>{
	res.status(200);
  	res.setHeader('Content-Type', 'text/html;charset=utf-8;')

	let app = await createApp({url: req.url})
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