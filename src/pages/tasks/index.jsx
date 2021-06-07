import Head from 'next/head'
import axios from 'axios'
import { useState } from 'react'
import useTaskQuery from '@hook/useTaskQuery'

import TaskTable from '@comp/TaskTable'

const Tasks = ({ initialData: serverSideInitialData }) => {
  const [query, dispatchQuery] = useTaskQuery()
  const [initialData, setInitialData] = useState(serverSideInitialData)

  return (
    <>
      <Head>
        <title>Task List - Fatcoupon</title>
      </Head>
      <TaskTable
        {...query}
        initialData={initialData}
        setInitialData={setInitialData}
        dispatchQuery={dispatchQuery}
      />
    </>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { data } = await axios.get('/api/tasks', {
    params: query,
  })

  return {
    props: {
      initialData: data,
    },
  }
}

export default Tasks
