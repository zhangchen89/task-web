import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  hash:true,
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'FormEngine',
  },
  routes: [
    {
      name: '任务列表',
      path: '/task',
      component: './Task',
    },
    {
      name: '拖拉拽生成表单(Form->JSON)',
      path: '/home',
      component: './Home',
    }, {
      name: '获取动态表单(JSON->Form)',
      path: '/render',
      component: './Render',
    },{
      path: '/',
      redirect: '/task',
    }, 
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //     name: ' CRUD 示例',
    //     path: '/table',
    //     component: './Table',
    // },
  ],
  proxy: {
    '/zeebe': {
      'target': 'http://zeebe.cn:9001/',
      'changeOrigin': true,
      // 'pathRewrite': { '^/zeebe' : '' },
    },
  },
  npmClient: 'pnpm',
});

