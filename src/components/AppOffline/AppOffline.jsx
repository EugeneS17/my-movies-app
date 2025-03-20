import { Alert } from 'antd'

export default function AppOffline() {
  return (
    <div className="container">
      <Alert
        message="No network connection"
        type="error"
        description="Please check your internet connection."
        showIcon
      />
    </div>
  )
}
