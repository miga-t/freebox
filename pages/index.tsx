import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navber from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false
			}
		};
	}

	return {
		props: {}
	};
}

export default function Home() {
	const { data: movies = [] } = useMovieList();
	const { data: favorites = [] } = useFavorites();
	const { isOpen, closeModal } = useInfoModal();
	return (
		<>
			<InfoModal visible={isOpen} onClose={closeModal} />
			<Navber />
			<Billboard />
			<div className="pb-40">
				<MovieList title="Trending now" data={movies} />
				<MovieList title="Favorites" data={favorites} />
			</div>
		</>
	);
}
