import React, { useCallback, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import useMovie from "@/hooks/useMovie";

const Watch = () => {
	const router = useRouter();
	const { movieId } = router.query;

	const { data } = useMovie(movieId as string);

	return (
		<div className="h-screen w-screen bg-black">
			<nav className="fixed w-full p-2 z-10 flex flex-row items-center gap-3 bg-black bg-opacity-30 text-sm md:text-base lg:text-lg">
				<ArrowLeftIcon
					onClick={() => router.push("/")}
					className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition text-sm "
				/>
				<p className="text-white  font-bold">
					<span className="font-light">Watching:</span> {data?.title}
				</p>
			</nav>

			<video
				className="h-full w-full"
				autoPlay
				controls
				controlsList="nodownload"
				onContextMenu={(e) => {
					e.preventDefault();
				}}
				src={data?.videoUrl}
			></video>
		</div>
	);
};

export default Watch;
