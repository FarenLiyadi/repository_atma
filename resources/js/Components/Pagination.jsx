import { Button } from "@material-tailwind/react";

export default function Pagination({
    onChange,
    prevBtn,
    nextBtn,
    isPrevDisabled,
    isNextDisabled,
    page = "not set",
    totalPage = "not set",
}) {
    return (
        <div className="flex justify-between w-full py-3">
            <div>
                <select
                    id="src_length"
                    className=" src_change appearance-none block min-w-14 max-w-24 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={onChange}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <p>
                Page {page} of {totalPage}
            </p>
            <div className="flex gap-2">
                <Button
                    onClick={prevBtn}
                    disabled={isPrevDisabled}
                    className={
                        isPrevDisabled ? "bg-deep-orange-300" : "bg-transparent"
                    }
                    id="prev_btn"
                    variant="outlined"
                    size="sm"
                >
                    Prev
                </Button>

                <Button
                    id="next_btn"
                    onClick={nextBtn}
                    disabled={isNextDisabled}
                    variant="outlined"
                    size="sm"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

// <div className="grid grid-flow-col gap-1">
//                 <button
//                     className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
//                     id="prev_btn"
//                     onClick={prevBtn}
//                     disabled={isPrevDisabled}
//                 >
//                     Prev
//                 </button>
//                 <button
//                     className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
//                     id="next_btn"
//                     onClick={nextBtn}
//                     disabled={isNextDisabled}
//                 >
//                     Next
//                 </button>
//             </div>
