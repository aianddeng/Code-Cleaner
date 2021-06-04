import Head from 'next/head'
import axios from 'axios'
import useTaskQuery from '@hook/useTaskQuery'
import TaskTable from '@comp/TaskTable'
import { useEffect, useState } from 'react'

const Tasks = ({ initialData }) => {
  const [query, dispatchQuery] = useTaskQuery()
  const [firstPage, setFirstPage] = useState(true)

  useEffect(
    () => () => {
      setFirstPage(false)
    },
    [query]
  )

  return (
    <>
      <Head>
        <title>Task List - Fatcoupon</title>
      </Head>
      <TaskTable
        {...query}
        firstPage={firstPage}
        initialData={initialData}
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
