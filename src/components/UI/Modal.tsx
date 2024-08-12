import React, { ReactNode } from "react"



interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode,
    onClose: (result: any) => void;
    isOpen?: boolean
}





export const Modal: React.FC<IModalProps> = ({ children, onClose, isOpen, ...attr }) => {
    const { className, ...restAttr } = attr

    return (
        <div onClick={onClose} className="w-full z-40 h-screen absolute top-0 left-0 bg-white bg-opacity-80 flex items-center justify-center">
            <div onClick={e => e.stopPropagation()} className={`${className}`}  {...restAttr}>{children}</div>
        </div>
    )
}