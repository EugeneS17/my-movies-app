import { Pagination as PaginationUI } from 'antd'

export default function Pagination({ page, totalResults, onChangePage }) {
  return (
    <PaginationUI
      current={page}
      total={totalResults}
      pageSize={20}
      hideOnSinglePage
      onChange={onChangePage}
      showSizeChanger={false}
    />
  )
}
