
import { Search } from 'lucide-react';

export const SearchSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center animate-pulse mt-6">
            <div className="p-4 bg-yellow-400 rounded-full animate-spin shadow-md">
                <Search className="text-[#4B2E1E] w-6 h-6" />
            </div>
            <p className="mt-4 text-[#4B2E1E] font-semibold">Finding a partner...</p>
        </div>
    );
};
