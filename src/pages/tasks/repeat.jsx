import useSWR from 'swr'
import axios from 'axios'
import Link from 'next/link'
import { useCallback } from 'react'

import { Button, Card } from 'antd'

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
      <h1 className="text-4xl">Repeat Task Page</h1>
      <div className="grid grid-rows-2 grid-cols-2 gap-2">
        {data.datas.slice().map((el) => (
          <Card
            type="inner"
            title={el.storeId}
            key={el.storeId}
            actions={[
              // <Button type="primary">Edit</Button>,
              <Button>Check Current Store Task List</Button>,
              <Button danger onClick={() => handleRemoveRepeatTask(el.key)}>
                Remove
              </Button>,
            ]}
            extra={<Link href="#">Read More</Link>}
          >
            <ul>
              {Object.keys(el)
                .slice()
                .map((elem, index) => (
                  <li key={index}>
                    {elem} : {el[elem]}
                  </li>
                ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  ) : (
    <div>loading...</div>
  )
}

export default RepeatSection
