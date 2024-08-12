import { useEffect, useRef, useState } from 'react'
import { Modal } from '../UI'


interface AllertProps {
    title?: string;
    desc: string;
    onClose: () => void,
    btnText?: string,
    voice?: boolean
    icon?: boolean
}

export default function Alert({ desc, title, onClose, btnText, voice, icon }: AllertProps) {
    const soundRef = useRef<HTMLAudioElement | null>(null)
    useEffect(() => {
        if (!voice) return
        if (soundRef.current) soundRef.current.play()
    }, [])
    return (
        <Modal className='border rounded-lg overflow-hidden' onClose={onClose}>
            <audio ref={soundRef} src='/sounds/succes.mp3'></audio>
            <div className="flex min-h-full justify-center p-4 text-center flex-col max-w-[350px] items-center sm:p-0">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        {
                            !icon && <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-primary-500 bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg className="feather feather-check" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                        }

                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                                {title ?? 'Уведомление'}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    {desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex w-full justify-between sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        data-autofocus
                        onClick={onClose}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                        {btnText ?? 'Ок'}
                    </button>
                </div>
            </div>
        </Modal>
    )
}
