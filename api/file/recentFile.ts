import fetcher from '@lib/fetcher'

export const fetchGetRecentFile = () => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/file/recent', {}, process.env.API_HOST, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
