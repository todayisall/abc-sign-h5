import { http } from '@/utils/request';

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword() {
  return http.post(`/api/login`, {
    data: { name: '123' },
  });
}

/**
 * 用户登录
 * @returns
 * @param params
 */
export function login(params: any) {
  return http.post(`/api/user-service/auth/user/login`, { ...params });
}

/**
 * 用户注册
 * @returns
 */
export function register(params: any) {
  return http.post(`/api/user-service/auth/user/signup`, {
    ...params,
  });
}

/**
 * 获取用户信息
 * @returns
 * @param params
 */
export function getUserInfo() {
  return http.get(`/api/user-service/auth/info/current`);
}

/**
 * 将文本翻译为手语视频
 */
export function translate(params: any) {
  return http.get(`/api/user-service/api/v1/course/text/convert`, {
    params: { ...params },
  });
}

/**
 * 获取课程列表
 */
export function getCourseList(params: any) {
  return http.get(`/api/user-service/api/v1/course/study/list`, {
    params: params,
  });
}

/**
 * 获取课程详情
 */
export function getCourseDetail(id: string) {
  return http.get(`/api/user-service/api/v1/course/study/one/${id}`);
}

/**
 * 获取测验列表
 */
export function getTestList(params: any) {
  return http.get(`/api/user-service/api/v1/course/test/list`, {
    params: params,
  });
}

/**
 * 获取测验详情
 */
export function getTestDetail(id: string) {
  return http.get(`/api/user-service/api/v1/course/test/one/${id}`);
}
