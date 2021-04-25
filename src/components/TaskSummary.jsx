import { Timeline } from 'antd'
import { useEffect, useState } from 'react'
import moment from 'moment'

import TaskActions from '@comp/TaskActions'

const TaskSummary = ({ data }) => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    data.jobLogs &&
      setLogs(
        data.jobLogs.logs.slice().map((el) => {
          const logs = JSON.parse(el)
          logs.label = moment(logs.label).format('YYYY-MM-DD HH:mm:ss')
          return logs
        })
      )
  }, [data])

  return (
    <div className="space-y-8">
      <div className="flex space-y-2 flex-col max-w-xs m-auto">
        <TaskActions data={data} showManage={false} />
      </div>
      <Timeline
        reverse={true}
        pending={
          ['completed', 'failed', 'waiting'].includes(data.state)
            ? false
            : 'Recording...'
        }
        mode="alternate"
      >
        {logs.slice().map((el) => (
          <Timeline.Item {...el} key={el.label + el.content}>
            {el.content}
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}

export default TaskSummary
