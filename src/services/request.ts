/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend, RequestInterceptor } from 'umi-request';
import { notification } from 'antd';
import { history } from 'umi';
import { nanoid } from 'nanoid'
const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

let hasNotified: string[] = []

/** 异常处理程序 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if (url && url.indexOf('/jtxt/auth/login') >= 0) {
      window.location.href = "http://eip.htsc.com.cn/neweip/wps/myportal/huatai2021/firstpage"
      return response
    }
    if (hasNotified.indexOf(url) < 0) {
      hasNotified.push(url)
      // notification.error({
      //   message: `请求错误 ${status}: ${url}`,
      //   // description: errorText,
      // });
    }
  } else if (error?.['request']?.['options']?.['cancelToken']) {
    // 手动取消请求
  } else if (!response) {
    // notification.error({
    //   description: '您的网络发生异常，无法连接服务器',
    //   message: '网络异常',
    // });
  }
  return response;
};

const timeout = 3 * 60 * 1000;
/** 配置request请求时的默认参数 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  timeout,
  prefix: ''
});


let hasNotifiedReLogin = false

let loggedOut = false


export default request;

export type ResultWrapper<T> = {
  code: number;
  message: string;
  data: T;
};

export type ListData<T> = {
  /**
   * @description 列表数据
   */
  list: T[];

  /**
   * @description 当前是第几页
   */
  current: number;

  /**
   * @description 分页大小
   */
  pageSize: number;

  /**
   * @description 记录条数
   */
  total: number;

  /**
   * @description 页数
   */
  pages: number;
};
