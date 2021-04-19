import { useState } from 'react'

const usePageSize = (index = 1, size = 10) => {
  const [pageSize, setPageSize] = useState({ index, size })

  return {
    index: pageSize.index,
    size: pageSize.size,
    setPageSize,
  }
}

export default usePageSize
