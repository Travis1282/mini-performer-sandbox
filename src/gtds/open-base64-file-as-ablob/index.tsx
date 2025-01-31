'use client'

import { useEffect } from 'react'

interface IOpenBase64File {
  base64Data: string
  fileType: string
}

export const OpenBase64FileAsABlob = ({
  base64Data,
  fileType,
}: IOpenBase64File) => {
  useEffect(() => {
    function redirectToBlobFile() {
      const binary = atob(base64Data.replace(/\s/g, ''))
      const len = binary.length
      const buffer = new ArrayBuffer(len)
      const view = new Uint8Array(buffer)
      for (let i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i)
      }
      const url = URL.createObjectURL(new Blob([view], { type: fileType }))
      window.location.href = url
    }
    redirectToBlobFile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
