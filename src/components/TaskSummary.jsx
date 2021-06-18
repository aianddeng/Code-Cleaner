import { Timeline } from 'antd'
import { useEffect, useState } from 'react'
import moment from 'moment'

import TaskActions from '@comp/TaskActions'

function getTableScroll() {
  const bottomHeight = 24 + 70 + 2

  const topHeight = document
    .getElementsByClassName('topElement')[0]
    .getBoundingClientRect().bottom

  const height = `calc(100vh - ${topHeight}px - ${bottomHeight}px - 1.5rem * calc(1 - var(--tw-space-y-reverse)) - 1rem)`

  return window.innerHeight > 500 ? height : null
}

const TaskSummary = ({ data }) => {
  const [scrollY, setScrollY] = useState('')
  useEffect(() => {
    setScrollY(getTableScroll())
  }, [])

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
      <div className="max-w-xs flex space-y-2 flex-col md:flex-row md:space-x-2 md:space-y-0 topElement">
        <TaskActions data={data} showManage={false} />
      </div>
      <div
        style={{
          height: scrollY,
        }}
        className="bg-[#031527] dark:bg-[#1f1f1f] rounded-sm pl-5 pt-5 w-full overflow-y-auto overflow-x-hidden"
      >
        <Timeline
          reverse={true}
          pending={
            ['completed', 'failed', 'waiting'].includes(data.state)
              ? false
              : 'Recording...'
          }
          mode="left"
        >
          {logs.slice().map((el) => (
            <Timeline.Item {...el} key={el.time + el.content}>
              <>
                <span
                  style={{
                    color: '#fff6',
                  }}
                >
                  {el.time}
                </span>
                <span>{' | '}</span>
                <span
                  style={{
                    color: '#fff',
                  }}
                >
                  {el.content}
                </span>
              </>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  )
}

export default TaskSummary
