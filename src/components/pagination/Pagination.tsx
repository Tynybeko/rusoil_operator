

import { returnPaginationRange } from '../../utils';

const Pagination = ({ totalPage, page, limit, siblings, onPageChange }: { totalPage: number, page: number, limit: number, siblings: number, onPageChange: (value: number) => void }) => {
    let array = returnPaginationRange(totalPage, page, limit, siblings);
    return (
        <>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{page}</span> to <span className="font-medium">{limit}</span> of{' '}
                            <span className="font-medium">{totalPage * limit}</span> results
                        </p>
                    </div>
                    <div>
                        <ul className='isolate inline-flex -space-x-px rounded-md shadow-sm '>
                            <button
                                onClick={() => page > 1 ? onPageChange(page - 1) : null}
                                className="hover:text-primary-500 relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="rotate-180 feather feather-chevron-right" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                            {array.map((value: any) => (
                                <li key={value} className={`${page == value ? 'bg-gray-400 text-white' : ''} cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-300 focus:z-20 focus:outline-offset-0`} onClick={() => onPageChange(value)}>{value}</li>
                            ))}
                            <button
                                onClick={() => page < totalPage ? onPageChange(page + 1) : null}
                                className="hover:text-primary-500 relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <svg className="feather feather-chevron-right" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                        </ul>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Pagination

// export default function Pagination() {
//     return (
//         <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
//             <div className="flex flex-1 justify-between sm:hidden">
//                 <a
//                     href="#"
//                     className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                     Previous
//                 </a>
//                 <a
//                     href="#"
//                     className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                     Next
//                 </a>
//             </div>
//             <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//                 <div>
//                     <p className="text-sm text-gray-700">
//                         Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
//                         <span className="font-medium">97</span> results
//                     </p>
//                 </div>
//                 <div>
//                     <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
//                         <a
//                             href="#"
//                             className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//                         >
//                             <span className="sr-only">Previous</span>
//                             <button className="hover:text-primary-500">
//                                 <svg className="rotate-180 feather feather-chevron-right" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6" /></svg>
//                             </button>
//                             {/* <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" /> */}
//                         </a>
//                         {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
//                         <a
//                             href="#"
//                             aria-current="page"
//                             className="relative z-10 inline-flex items-center bg-primary-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                         >
//                             1
//                         </a>
//                         <a
//                             href="#"
//                             className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//                         >
//                             2
//                         </a>
//                         <a
//                             href="#"
//                             className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
//                         >
//                             3
//                         </a>
//                         <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
//                             ...
//                         </span>
//                         <a
//                             href="#"
//                             className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
//                         >
//                             8
//                         </a>
//                         <a
//                             href="#"
//                             className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//                         >
//                             9
//                         </a>
//                         <a
//                             href="#"
//                             className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//                         >
//                             10
//                         </a>
//                         <a
//                             href="#"
//                             className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//                         >
//                             <span className="sr-only">Next</span>
//                             {/* <ChevronRightIcon aria-hidden="true" className="h-5 w-5" /> */}
//                             <button className="hover:text-primary-500">
//                                 <svg className="feather feather-chevron-right" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6" /></svg>

//                             </button>
//                         </a>
//                     </nav>
//                 </div>
//             </div>
//         </div>
//     )
// }
