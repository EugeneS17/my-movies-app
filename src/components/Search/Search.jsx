import { Input } from 'antd'

export default function Search({ query, onSearch }) {
  return <Input placeholder="Type to search..." value={query} onChange={(e) => onSearch(e.target.value)} />
}
