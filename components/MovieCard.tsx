import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";
import useInfoModal from "@/hooks/useInfoModal";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useCallback } from "react";
import PlayButton from "./PlayButton";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface MovieCardProps {
	data: Record<string, any>;
}
const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
	const router = useRouter();
	const { openModal } = useInfoModal();

	const handleOpenModal = useCallback(() => {
		openModal(data?.id);
	}, [openModal, data?.id]);

	return (
		<div className="group bg-zinc-900 col-span-1 relative max-w-xs aspect-[16/9] ">
			<img
				className="cursor-pointer object-over transition duration shawdow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 aspect-[16/9]"
				src={data.thumbnailUrl}
				alt="Thumbnail"
			/>
			<div className="flex flex-row items-center mt-3 md:mt-4 gap-3 sm:invisible absolute bottom-[10%] left-[5%]">
				<PlayButton movieId={data?.id} />
				<button
					onClick={handleOpenModal}
					className="bg-white text-white bg-opacity-40 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
				>
					<AiOutlineInfoCircle className="mr-1" />
					<div className="text-[8px] font-bold">More Info</div>
				</button>
			</div>
			<div
				className="
        opacity-0
        absolute
        top-0
        transition
        duration-100
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100
      "
			>
				<img
					className="cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-t-md
          
					aspect-[16/9]"
					src={data.thumbnailUrl}
					alt="Thumbnail"
				/>
				<div
					className="z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md"
				>
					<div className="flex flex-row items-center gap-3">
						<div
							className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex  justify-center items-center transition hover:bg-neutral-300 group"
							onClick={() => {
								router.push(`/watch/${data?.id}`);
							}}
						>
							<BsFillPlayFill
								size={30}
								className="animate-pulse text-red-600 transition duration-200"
							/>
						</div>
						<FavoriteButton movieId={data?.id} />
						<div
							onClick={() => openModal(data?.id)}
							className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
						>
							<ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
						</div>
					</div>

					<p className="text-white text-lg xl:text-xl font-semibold mt-4">
						{data.genre === "Tom and Jerry"
							? data.title.slice(25)
							: data.title}
					</p>
					<p className="text-green-400 font-semibold mt-4">
						New <span className="text-white ">2023</span>
					</p>

					<div className="flex flex-row mt-4 gap-2 items-center">
						<p className="text-white text-[10px] lg:text-sm">
							{data.duration}
						</p>
					</div>
					<div className="flex flex-row mt-4 gap-2 items-center">
						<p className="text-white text-[10px] lg:text-sm">
							{data.genre}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
