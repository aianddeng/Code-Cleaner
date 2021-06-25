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
  deactived = false,
}) => (
  <div className="flex flex-col md:flex-row flex-wrap">
    {validLength ? (
      <Tag icon={<CheckCircleOutlined />} color="success" className="my-1">
        Valid: {validLength}
      </Tag>
    ) : null}
    {invalidLength ? (
      <Tag icon={<CloseCircleOutlined />} color="error" className="my-1">
        Invalid: {invalidLength}
      </Tag>
    ) : null}
    {waitingLength ? (
      <Tag icon={<ClockCircleOutlined />} color="warning" className="my-1">
        Waiting: {waitingLength}
      </Tag>
    ) : null}
    <Tag color="default" className="my-1">
      {promotype
        .split('')
        .map((el, index) => (!index ? el.toUpperCase() : el))
        .join('')}
    </Tag>
    {autoDeactive ? (
      <Tag color="default" className="my-1">
        Auto Deactive
      </Tag>
    ) : null}
    {deactived ? (
      <Tag color="processing" className="my-1">
        Deactived
      </Tag>
    ) : null}
  </div>
)

export default CouponState
