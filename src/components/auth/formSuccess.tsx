import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'

const FormSuccess = ({message}: {message: string | undefined}) => {
  if (!message || message === '') return

  return (
    <div className='flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-emerald-500 text-sm mt-2'>
       <FiCheckCircle className='h-4 w-4'/>
       <p>{message}</p>
    </div>
  )
}

export default FormSuccess
