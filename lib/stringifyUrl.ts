import qs from 'query-string'

function removeHash(input: string) {
  return input.split('#')[0]
}

export default function stringifyUrl(object: { url: string; query: any }) {
  const url = removeHash(object.url).split('?')[0] || ''
  const queryFromUrl = qs.extract(object.url)
  const parsedQueryFromUrl = qs.parse(queryFromUrl)
  const query = Object.assign(parsedQueryFromUrl, object.query)
  const queryString = qs.stringify(query)
  return `${url}?${queryString}`
}
