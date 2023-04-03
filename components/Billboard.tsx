import useBillboard from "@/hooks/useBillboard";

import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";
import { useCallback } from "react";

const Billboard = () => {
	const { openModal } = useInfoModal();
	const { data } = useBillboard();

	const handleOpenModal = useCallback(() => {
		openModal(data?.id);
	}, [openModal, data?.id]);
	return (
		<div className="relative h-[56.25vw]">
			<video
				className="w-full h-[56.25vw] object-cover brightness-[60%]"
				autoPlay
				muted
				poster={data?.thumbnailUrl}
				src={data?.videoUrl}
			></video>
			<div className="absolute top-[30%]  ml-8 md:ml-16">
				<p className="text-white text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mt-4 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
					{data?.genre === "Tom and Jerry"
						? data?.title.slice(25)
						: data?.title}
				</p>
				<p className="text-white/75 text-[8px] md:text-lg lg:text-2xl mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl hidden md:block">
					{data?.description}
				</p>
				<div className="flex flex-row items-center mt-5 md:mt-6 gap-3">
					<PlayButton movieId={data?.id} />
					<button
						onClick={handleOpenModal}
						className="bg-white text-white bg-opacity-40 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs md:text-base lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
					>
						<AiOutlineInfoCircle className="mr-1" />
						More Info
					</button>
				</div>
			</div>
		</div>
	);
};
export default Billboard;
