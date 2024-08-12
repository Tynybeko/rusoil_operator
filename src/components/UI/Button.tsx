import React, { ReactNode } from "react"



interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'some';
    children?: ReactNode
}





export const Button: React.FC<IButtonProps> = ({ variant = 'primary', children, ...attr }) => {
    const { className, ...restAttr } = attr
    const getButtonClass = (variant: string) => {
        switch (variant) {
            case 'primary':
                return 'bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg text-sm';
            case 'secondary':
                return 'bg-secondary-500 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-lg text-sm';
            case 'danger':
                return 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm';
            case 'outline':
                return 'bg-white border-primary-300 border-2  hover:border-transparent hover:text-white hover:bg-primary-500 text-primary-700 font-bold py-1 px-3 rounded-lg text-sm';
            default:
                return 'inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0';
        }
    };
    return (
        <button className={`${getButtonClass(variant)} disabled:bg-gray-500 ${className}`}  {...restAttr}>{children}</button>
    )
}