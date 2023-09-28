export const routes = [
  {
    path: '/',
    redirect: '/communication',
    component: () => import('@/layout/basic/index.vue'),
    children: [
      {
        path: 'communication',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '交流',
          keepAlive: true,
        },
      },
      {
        path: 'contact',
        component: () => import('@/views/list/index.vue'),
        meta: {
          title: '联系人',
          keepAlive: true,
        },
      },
      {
        path: 'course',
        component: () => import('@/views/course/index.vue'),
        meta: {
          title: '课程',
          keepAlive: true,
        },
      },
      {
        path: 'mine',
        component: () => import('@/views/mine/index.vue'),
        meta: {
          title: '我的',
          keepAlive: true,
        },
      },
      {
        name: 'listDetails',
        path: '/details',
        component: () => import('@/views/list/details/index.vue'),
        meta: {
          title: 'list.details',
          border: false,
        },
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '',
      keepAlive: true,
    },
  },
  {
    name: 'words',
    path: '/words',
    component: () => import('@/views/course/Words.vue'),
    meta: {
      title: 'words',
      keepAlive: true,
    },
  },
  {
    name: 'wordsTest',
    path: '/wordsTest',
    component: () => import('@/views/course/WordTest.vue'),
    meta: {
      title: 'wordsTest',
      keepAlive: true,
    },
  },
  {
    name: 'phrase',
    path: '/phrase',
    component: () => import('@/views/course/phrase.vue'),
    meta: {
      title: 'phrase',
      keepAlive: true,
    },
  },
  {
    name: 'phraseTest',
    path: '/phraseTest',
    component: () => import('@/views/course/phraseTest.vue'),
    meta: {
      title: 'phraseTest',
      keepAlive: true,
    },
  },
  // 匹配不到重定向会主页
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: '/Home',
  },
];

export default routes;
