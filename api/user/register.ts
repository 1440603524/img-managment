import fetcher from '@lib/fetcher'

export const fetchRegister = (params: unknown) => {
  return fetcher('/user/register', params, process.env.API_HOST, {
    method: 'POST',
  })
}
