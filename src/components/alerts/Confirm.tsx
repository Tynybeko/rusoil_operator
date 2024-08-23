import { useState } from 'react'
import { Button, Modal } from '../UI'



interface ConfirmAlertProps {
    title?: string;
    desc: string;
    onCancel: (result: any) => void,
    onConfirm: (result: any) => void,
    btnText?: string,
    className?: string,
    icon?: boolean
}

export default function ConfirmAlert({ desc, title, onCancel, onConfirm, btnText, className = '', icon }: ConfirmAlertProps) {
    return (
        <Modal className={`border rounded-lg overflow-hidden ${className}`} onClose={onCancel}>
            <div className="flex min-h-full justify-center p-4 text-center flex-col max-w-[400px] items-center sm:p-0">
                <div className="bg-white px-4 pb-4 pt-2 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        {
                            !icon && <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-red-500 bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg className="feather feather-alert-triangle" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" /></svg>
                            </div>
                        }
                        <div className="mt-3 text-center sm:ml-4  sm:mt-0 sm:text-left">
                            <h3 className="text-base mb-4 !text-2xl  font-semibold leading-6 text-gray-900">
                                {title ?? 'Подтвердите свои действие'}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    {desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50  px-4 py-3 flex w-full justify-between sm:flex-row-reverse sm:px-6">
                    <Button onClick={onConfirm}>Подтвердить</Button>
                    <Button
                        variant='danger'
                        onClick={onCancel}>
                        {btnText ?? 'Отмена'}
                    </Button >
                </div>
            </div>
        </Modal>
    )
}
