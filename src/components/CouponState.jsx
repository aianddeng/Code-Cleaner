import { Tag } from 'antd'
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'

const CouponState = ({
  allLength,
  validLength,
  invalidLength,
  waitingLength = allLength - validLength - invalidLength,
  promotype = 'all',
  autoDeactive = false,
}) => (
  <div className="flex flex-wrap flex-grow">
    {validLength ? (
      <Tag icon={<CheckCircleOutlined />} color="success" className="mb-2">
        Valid: {validLength}
      </Tag>
    ) : null}
    {invalidLength ? (
      <Tag icon={<CloseCircleOutlined />} color="error" className="mb-2">
        Invalid: {invalidLength}
      </Tag>
    ) : null}
    {waitingLength ? (
      <Tag icon={<ClockCircleOutlined />} color="warning" className="mb-2">
        Waiting: {waitingLength}
      </Tag>
    ) : null}
    <Tag color="default" className="mb-2">
      {promotype
        .split('')
        .map((el, index) => (!index ? el.toUpperCase() : el))
        .join('')}
    </Tag>
    {autoDeactive ? (
      <Tag color="default" className="mb-2">
        Auto Deactive
      </Tag>
    ) : null}
  </div>
)

export default CouponState

{
  /* <span>
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
    </span> */
}
