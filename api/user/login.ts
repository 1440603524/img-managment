import fetcher from '@lib/fetcher'

export const fetchUserLogin = (params: unknown) => {
  return fetcher('/user/login', params, process.env.API_HOST, {
    method: 'POST',
  })
}
