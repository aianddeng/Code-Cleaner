import useSWR from 'swr'
import axios from 'axios'
import Link from 'next/link'
import { useCallback } from 'react'

import { Button, Card, Badge, Statistic } from 'antd'
import { FieldTimeOutlined } from '@ant-design/icons'

const RepeatSection = () => {
  const { data, error } = useSWR('/api/tasks/repeat', {
    refreshInterval: 1 * 1000,
  })

  const handleRemoveRepeatTask = useCallback(async (key) => {
    const { data } = await axios.delete('/api/tasks/repeat', {
      data: {
        key,
      },
    })

    console.log(data)
  })

  return data ? (
    <div>
      <h1>Repeat Task List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
        {data.datas.slice().map((el, index) => (
          <Card
            type="inner"
            title={el.storeName}
            key={el.storeId}
            actions={[
              <Button>
                <Link
                  href={{
                    pathname: '/tasks',
                    query: { storeId: el.storeId },
                  }}
                >
                  Check Store Tasks
                </Link>
              </Button>,
              <Button danger onClick={() => handleRemoveRepeatTask(el.key)}>
                Remove
              </Button>,
            ]}
            extra={<Badge status="processing" text={el.rule} />}
          >
            {!index ? (
              <Statistic.Countdown
                prefix={<FieldTimeOutlined />}
                title="Next"
                value={el.next}
                format="Dd HH:mm:ss"
              />
            ) : (
              <Statistic.Countdown
                prefix={<FieldTimeOutlined />}
                title="Next"
                value={el.next}
                format="Dd HH:mm"
              />
            )}
          </Card>
        ))}
      </div>
    </div>
  ) : (
    <div>loading...</div>
  )
}

export default RepeatSection
