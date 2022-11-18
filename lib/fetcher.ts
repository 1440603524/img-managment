import stringifyUrl from '@lib/stringifyUrl'
import { message } from 'antd'

export interface IConfig extends RequestInit {
  method?: 'GET' | 'POST'
  headers?: any
}

export default function fetcher<T = any>(
  url: string,
  data?: any,
  host?: string,
  config: IConfig = {
    method: 'GET',
    headers: {},
  }
): Promise<T> {
  let baseUrl = `${host || process.env.API_HOST}${url}`
  if (typeof window === 'undefined' && process.env.ENV !== 'pro') {
    baseUrl = baseUrl.replace(/^https/, 'http')
  }

  const configHerders = config.headers || {}
  const headers = {
    'Content-Type': 'application/json',
    ...configHerders,
  }

  const baseConfig: IConfig = {
    ...config,
    mode: 'cors',
    headers,
  }

  const requestData = data || {}

  switch (baseConfig.method) {
    case 'GET':
      baseUrl = stringifyUrl({ url: baseUrl, query: requestData })
      break
    case 'POST':
      baseConfig.body = JSON.stringify(requestData)
      break
    default:
      break
  }

  return fetch(baseUrl, baseConfig)
    .then(async (r) => {
      if (r.status === 401) {
        message.error({
          content: '登陆失效，请重新登录',
          duration: 1,
          onClose: () => {
            location.href = '/login'
          },
        })
      }
      return await r.json()
    })
    .catch((error) => {
      console.error('请求错误: ', error, baseUrl, requestData)
      return {}
    })
}
