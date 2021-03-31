import axios from 'axios'
import useSWR from 'swr'

import dynamic from 'next/dynamic'
const Table = dynamic(() => import('antd').then(antd => antd.Table), {
    ssr: false,
})

const fetcher = async url => {
    const { data } = await axios.get('http://localhost:3000/api' + url)
    return data
}

const Tasks = ({ data: initialData }) => {
    const { data } = useSWR('/tasks', fetcher, {
        initialData,
        refreshInterval: 10000,
    })

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        },
    ]

    return (
        <div>
            <h2>Tasks List</h2>
            <Table dataSource={data} columns={columns} rowKey="_id" />;
        </div>
    )
}

export const getServerSideProps = async () => {
    const data = await fetcher('/tasks')

    return {
        props: {
            data,
        },
    }
}

export default Tasks
