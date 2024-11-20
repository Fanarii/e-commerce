import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

const FormError = ({message}: {message: string | undefined}) => {
  if (!message || message === '') return

  return (
    <div className='flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-destructive text-sm mt-2'>
       <FaExclamationTriangle className='h-4 w-4'/>
       <p>{message}</p>
    </div>
  )
}

export default FormError
