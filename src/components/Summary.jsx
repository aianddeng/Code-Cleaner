import { Timeline, Button, Steps } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Step } = Steps

const Summary = ({ state, validLength, invalidLength, allLength, jobLogs }) => {
  const [stateList] = useState([
    {
      title: 'Wait / Delayed',
    },
    {
      title: 'Active',
    },
    {
      title: 'Completed / Failed',
    },
  ])

  const [logs] = useState([
    {
      label: '2021-04-01 09:00:20',
      color: 'green',
      content: 'Create a new job and push to task list',
    },
    {
      label: '2021-04-02 12:30:49',
      dot: <ClockCircleOutlined />,
      content: 'Load all coupon from the fatcoupon api',
    },
    {
      label: '2021-04-09 19:02:10',
      content: 'Open browser and load extension',
    },
    {
      label: '2021-04-01 09:00:20',
      content: 'Create new page and excute process',
    },
  ])

  return (
    <div className="space-y-8">
      {console.log(jobLogs)}
      <Steps
        // labelPlacement='vertical'
        current={stateList.findIndex((el) =>
          new RegExp(state, 'i').test(el.title)
        )}
      >
        {stateList.slice().map((el) => (
          <Step {...el} />
        ))}
      </Steps>

      <Timeline
        pending={
          ['completed', 'failed'].includes(state) ? false : 'Recording...'
        }
        mode="alternate"
      >
        {logs.slice().map((el) => (
          <Timeline.Item {...el}>{el.content}</Timeline.Item>
        ))}
      </Timeline>

      <div className="flex space-x-2">
        <Button className="flex-auto" type="primary">
          Remove All Invalid Coupon
        </Button>
        <Button className="flex-auto" disabled={state !== 'failed'}>
          Retry Task
        </Button>
        <Button className="flex-auto" disabled={state === 'active'} danger>
          Remove Task
        </Button>
      </div>
    </div>
  )
}

export default Summary
