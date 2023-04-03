import React from "react";

import { isEmpty } from "lodash";
import MovieCard from "@/components/MovieCard";

interface MovieListProps {
	data: Record<string, any>[];
	title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
	if (isEmpty(data)) {
		return null;
	}
	return (
		<div className="px-4 md:px-12 mt-4 space-y-8">
			<div>
				<p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
					{title}
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-3 xl:grid-cols-4">
					{data.map((movie) => (
						<MovieCard data={movie} key={movie.id}></MovieCard>
					))}
				</div>
			</div>
		</div>
	);
};

export default MovieList;
