import { Input } from 'antd'

export default function Search({ query, setQuery }) {
  return <Input placeholder="Type to search..." value={query} onChange={(e) => setQuery(e.target.value)} />
}
