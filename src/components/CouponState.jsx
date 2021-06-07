import { Progress } from 'antd'

const CouponState = ({ allLength, validLength, invalidLength, promotype }) => (
  <ul className="m-0 p-0 list-none">
    <li>All: {allLength}</li>
    <li className="text-blue-500">Valid: {validLength || '-'}</li>
    <li className="text-red-500">Invalid: {invalidLength || '-'}</li>
    <li className="text-gray-500">Promotype: {promotype || 'all'}</li>
    <li>
      <Progress
        size="small"
        showInfo={false}
        percent={((validLength + invalidLength) / allLength) * 100}
        status="exception"
        strokeColor="rgba(239, 68, 68)"
        success={{
          percent: (validLength / allLength) * 100,
          strokeColor: 'rgba(59, 130, 246)',
        }}
      />
    </li>
  </ul>
)

export default CouponState
