import useSWR from 'swr'
import axios from 'axios'
import Link from 'next/link'
import { useCallback } from 'react'

import { Button, Card } from 'antd'

const Multi = () => {
  const { data, error } = useSWR('/api/tasks/multi')

  const handleRemoveRepeatTask = useCallback(async (key) => {
    const { data } = await axios.delete('/api/tasks/multi', {
      data: {
        key,
      },
    })

    console.log(data)
  })

  return data ? (
    <div>
      <h1 className="text-4xl">Multi Task Page</h1>
      {data.datas.slice().map((el) => (
        <Card
          type="inner"
          title={el.name}
          key={el.name}
          actions={[
            <Button type="primary">Edit</Button>,
            <Button></Button>,
            <Button danger onClick={() => handleRemoveRepeatTask(el.key)}>
              Remove
            </Button>,
          ]}
          extra={<Link href="#">Read More</Link>}
        >
          <ul>
            {Object.keys(el)
              .slice()
              .map((elem) => (
                <li>
                  {elem} : {el[elem]}
                </li>
              ))}
          </ul>
        </Card>
      ))}
    </div>
  ) : (
    <div>loading...</div>
  )
}

export default Multi
