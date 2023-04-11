import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useState } from "react";
import { BsSearch } from "react-icons/bs";
import MovieCard from "@/components/MovieCard";
import axios from "axios";
import { isEmpty } from "lodash";

interface SearchModalProps {
	visible?: boolean;
	onClose: any;
}

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose }) => {
	const [isVisible, setIsVisible] = useState<boolean>(!!visible);

	const [searchPhrase, setSearchPhrase] = useState("");

	const [searchResults, setSearchResults] = useState<Record<string, any>[]>(
		[]
	);

	const handleKeyPress = async (searchQuery: string) => {
		try {
			const response = await axios.get("/api/search", {
				params: {
					q: searchQuery
				}
			});
			setSearchResults(response.data);
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const handleClose = useCallback(() => {
		onClose();
	}, [onClose]);

	if (!visible) {
		return null;
	}

	return (
		<div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center  overflow-x-hidden  fixed inset-0">
			<div className="z-60 relative w-[94%] h-[94%] mx-auto max-w-3xl bg-zinc-600 overflow-x-scroll">
				<div className="flex flex-row items-center space-x-2 w-[90%] m-2">
					<BsSearch />
					<input
						type="text"
						placeholder="Search movies"
						autoFocus
						className="block rounded-md p-3 text-sm text-slate-900 bg-neutral-100 appearance-none focus:outline-none focus:ring-0 w-full"
						onChange={(e: any) => {
							setSearchPhrase(e?.target?.value);
						}}
						onKeyDown={(e: any) => {
							RegExp("Enter").test(e.key) &&
								handleKeyPress(searchPhrase);
						}}
					></input>
				</div>

				<div
					onClick={() => {
						handleClose();
						setSearchResults([]);
						setSearchPhrase("");
					}}
					className="cursor-pointer absolute top-1 right-1 h-8 w-8 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
				>
					<XMarkIcon className="text-white w-6" />
				</div>
				<div className="flex items-center justify-center mt-8 ">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-1 ">
						{searchResults.map((movie) => (
							<MovieCard data={movie} key={movie.id}></MovieCard>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchModal;
