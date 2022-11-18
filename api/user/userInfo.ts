import fetcher from '@lib/fetcher'

export const fetchUserInfo = () => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/user/info', null, process.env.API_HOST, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
