import stringifyUrl from '@lib/stringifyUrl'

export interface IConfig extends RequestInit {
  method?: 'GET' | 'POST'
  headers?: any
}

const fetchLogger = (data: Obj) => {
  console.info(`[fetcher][请求开始][${process.env.ENV}]`)
  console.log(new Date().toLocaleString('zh'), JSON.stringify(data, null, 2))
  console.info(`[fetcher][请求结束][${process.env.ENV}]`)
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
      // 为 application/json 的 post 请求，添加 URL 编码后的请求体 json 字符串请求头字段
      if (typeof window !== 'undefined') {
        if (baseConfig.headers['Content-Type'] === 'application/json') {
          baseConfig.headers['data-json-str'] = encodeURIComponent(
            JSON.stringify(requestData)
          )
        }
      }
      break
    default:
      break
  }

  if (typeof window === 'undefined' && process.env.ENV === 'test') {
    fetchLogger({ baseUrl, query: requestData, method: baseConfig.method })
  }

  return fetch(baseUrl, baseConfig)
    .then(async (r) => {
      return await r.json()
    })
    .catch((error) => {
      console.error('请求错误: ', error, baseUrl, requestData)
      return {}
    })
}
