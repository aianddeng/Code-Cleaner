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
          logs.time = moment(logs.label).format('YYYY-MM-DD HH:mm:ss')
          logs.label = null
          return logs
        })
      )
  }, [data])

  return (
    <div className="space-y-6">
      <div className="max-w-xs flex space-y-2 flex-col md:flex-row md:space-x-2 md:space-y-0">
        <TaskActions data={data} showManage={false} />
      </div>
      <div className="bg-gray-800 rounded-sm pl-5 pt-5 h-96 w-full overflow-y-auto overflow-x-hidden">
        <Timeline
          reverse={true}
          className="text-white"
          pending={
            ['completed', 'failed', 'waiting'].includes(data.state)
              ? false
              : 'Recording...'
          }
          mode="left"
        >
          {logs.slice().map((el) => (
            <Timeline.Item {...el} key={el.time + el.content}>
              {el.time + ' | ' + el.content}
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  )
}

export default TaskSummary
