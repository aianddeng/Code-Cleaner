import { useState } from 'react'

const usePageSize = (index = 1, size = 10) => {
  const [pageSize, dispatchPageSize] = useState({ index, size })

  return {
    index: pageSize.index,
    size: pageSize.size,
    dispatchPageSize,
  }
}

export default usePageSize
