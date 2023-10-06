import { createRouter, createWebHistory, Router } from 'vue-router';
import routes from './routes';

const getToken = () => {
  return localStorage.getItem('token');
};

const router: Router = createRouter({
  history: createWebHistory('/'),
  routes: routes,
});

router.beforeEach(async (_to, _from, next) => {
  // 如果不是登录页也不是注册页. 同时没有token, 则跳转到登录页
  if (!['login', 'register'].includes(_to.name as string) && !getToken()) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
