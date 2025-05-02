"use client";

function SearchBar() {
    return (
        <div className="w-full max-w-md">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-400 dark:text-gray-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search files and folders..."
                    onKeyDown={(e) =>
                        e.key === "Enter" && console.log(e.target.value)
                    }
                    className="bg-transparent outline-none w-full py-1 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm"
                />
            </div>
        </div>
    );
}

export default SearchBar;
