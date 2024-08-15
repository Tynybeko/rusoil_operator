import React, { useId, useState } from 'react'


interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelStyle?: string;
    blockStyle?: string;
    text: string
    error?: string,
    succes?: string
    stateStyle?: string
}

export default function Input({ labelStyle = '', blockStyle = '', error, text, succes, stateStyle, ...attr }: IInputProps) {
    const id = useId()
    const { className, ...restAttr } = attr
    return (
        <div className={`w-full ${blockStyle}`}>
            <label htmlFor={id} className={`block mb-1 text-sm font-medium text-gray-900 dark:text-white ${labelStyle} `}>{text}</label>
            <input type="text" id={id} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className ?? ''}`} {...restAttr} />
            <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-green-500'} ${stateStyle}`}>{(error || succes)}</p>

        </div>
    )
}




export const InputPassword: React.FC<IInputProps> = ({ labelStyle = '', blockStyle = '', error, succes, text, ...attr }) => {
    const [isOpen, setOpen] = useState(false)
    const id = useId()
    return (
        <div className={`w-full  ${blockStyle}`}>
            <label htmlFor={id} className={`block mb-1 text-sm font-medium text-gray-900 dark:text-white ${labelStyle} `}>{text}</label>
            <div className='flex relative'>
                <input type={isOpen ? 'text' : 'password'} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pr-8 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...attr} />
                <img className='cursor-pointer absolute right-2 top-3.5' onClick={() => setOpen(prev => !prev)} src={`/svg/${isOpen ? 'eye.svg' : 'eye-slash.svg'}`} alt="" />
            </div>
            <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-green-500'}  `}>{(error || succes)}</p>
        </div>
    )
}