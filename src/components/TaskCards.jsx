import { Card, Button, Popconfirm } from 'antd'

import useTaskActions from '@hook/useTaskActions'

const TaskCards = ({ id, coupons }) => {
  const { checkLoading, handleDeactiveCode } = useTaskActions()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
      {coupons.slice().map((el) => (
        <Card
          className={[
            'cursor-pointer transition-all',
            !el.validStatus && 'border-gray-200',
            el.validStatus === 1 && 'border-blue-500',
            el.validStatus === -1 && 'border-red-500',
            el.validStatus !== -2 && 'hover:shadow-xl',
            el.validStatus === -2 &&
              'filter blur-sm shadow-md cursor-not-allowed select-none',
          ]}
          key={el.id}
          actions={
            el.validStatus === -2
              ? []
              : [
                  <Button>Manage</Button>,
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
                ]
          }
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
