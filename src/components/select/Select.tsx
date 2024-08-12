import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { IOption, IWork } from '../../types'


interface SelectProps<T> {
    onChange: (result: IOption<T> | null) => void;
    defaultValue?: IOption<T>,
    options: IOption<T>[]
}

export default function Select<T>({ defaultValue, onChange, options }: SelectProps<T>) {
    const selectRef = useRef<HTMLDivElement | null>(null)
    const [open, setOpen] = useState(false)
    const [changed, setChanged] = useState<null | IOption<T>>(defaultValue ?? null)
    const handleChange = (item: IOption<T> | null) => {
        onChange(item)
        setChanged(item)
        setOpen(false)
    }
    useEffect(() => {
        if (!selectRef.current) return
        const handleClose = (e: MouseEvent) => {
            e.stopPropagation()
            if (selectRef.current && !selectRef.current?.contains(e.target as Node)) setOpen(false)
        }
        if (selectRef.current) {
            document.addEventListener('click', handleClose)
        }
        return () => document.removeEventListener('click', handleClose)
    }, []);
    return (
        <div ref={selectRef}>
            <div className="relative mt-2">
                <button onClick={() => setOpen(true)} type="button" className="cursor-pointer relative w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                    {
                        changed ?
                            <>
                                <span className="flex items-center">
                                    <span className="ml-1 block truncate">{changed.title}</span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </>
                            :
                            <>
                                <span className="flex items-center">
                                    <span className="ml-2 block truncate">Не выбрано</span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </>
                    }
                </button>
                <ul className={`${!open ? 'hidden' : ''} absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`} tabIndex={-1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                    {/* {
                        defaultValue ? <li onClick={() => handleChange(defaultValue)} className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900" id="listbox-option-0" role="option">
                            <div className="flex items-center">
                                <span className="ml-1 block truncate font-normal">{defaultValue.title}</span>
                            </div>
                            {
                                !changed && <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            }
                        </li> :
                            <li onClick={() => handleChange(null)} className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900" id="listbox-option-0" role="option">
                                <div className="flex items-center">
                                    <span className="ml-1 block truncate font-normal">Не выбрано</span>
                                </div>
                                {
                                    !changed && <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                }
                            </li>
                    } */}
                    {
                        options.map(item => (
                            <li onClick={() => handleChange(item)} className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900" id="listbox-option-0" role="option">
                                <div className="flex items-center">
                                    <span className="ml-1 block truncate font-normal">{item.title}</span>
                                </div>
                                {
                                    (changed && changed.value == item.value) && <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                }

                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>

    )
}
