import fetcher from '@lib/fetcher'

export const fetchGetRecentProject = () => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/project/recent', {}, process.env.API_HOST, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
