import { useCallback, useEffect } from 'react'
import { Card, Button, Popconfirm } from 'antd'

import useTaskActions from '@hook/useTaskActions'

const TaskCards = ({ id, coupons }) => {
  const handleCopyText = useCallback((text) => {
    const input = document.createElement('input')
    input.value = text
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }, [])

  useEffect(() => {
    console.log('update')
  })

  const { checkLoading, handleDeactiveCode } = useTaskActions()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
      {coupons.slice().map((el) => (
        <Card
          style={
            el.validStatus === -2
              ? {
                  backgroundImage: `url('/deactivate.png')`,
                  backgroundSize: '10%',
                }
              : null
          }
          className={[
            'cursor-pointer transition-all hover:shadow-xl bg-no-repeat bg-right-top',
            !el.validStatus && 'border-gray-200',
            el.validStatus === 1 && 'border-blue-500',
            el.validStatus < 0 && 'border-red-500',
          ]}
          key={el.id}
          actions={[
            <Button onClick={() => handleCopyText(el.code)}>Copy</Button>,
            <Popconfirm
              title="Are you sure to deactive this code?"
              onConfirm={() => handleDeactiveCode(id, [el.id])}
              disabled={el.validStatus !== -1}
              okText="Yes"
              cancelText="No"
            >
              <Button
                danger
                loading={checkLoading(el.id)}
                disabled={el.validStatus !== -1}
              >
                Deactive
              </Button>
            </Popconfirm>,
          ]}
        >
          <Card.Meta
            title={el.code}
            description={
              <p className="whitespace-nowrap">
                {el.description ? el.description.trim() : 'FatCoupon Code'}
              </p>
            }
          />
        </Card>
      ))}
    </div>
  )
}

export default TaskCards
