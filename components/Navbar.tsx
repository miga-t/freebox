import NavbarItem from "@/components/NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";
import Link from "next/link";
import SearchModal from "./SearchModal";
import useSearchModal from "@/hooks/useSearchModal";
import useSearchResults from "@/hooks/useSearchResults";
import { useRouter } from "next/router";

const TOP_OFFSET = 90;

const Navber = () => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [showAccountMenu, setShowAccountMenu] = useState(false);
	const [showBackground, setShowBackground] = useState(false);
	const [showSearchList, setShowSearchList] = useState(false);
	const { isSearchOpen, openSearchModal, closeSearchModal } =
		useSearchModal();
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= TOP_OFFSET) {
				setShowBackground(true);
			} else {
				setShowBackground(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const toggleMobileMenu = useCallback(() => {
		setShowMobileMenu((current) => !current);
	}, []);
	const toggleAccountMenu = useCallback(() => {
		setShowAccountMenu((current) => !current);
	}, []);
	const toggleSearchList = useCallback(() => {
		setShowSearchList((current) => !current);
	}, []);

	return (
		<div className="w-full fixed z-40">
			<div
				className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
					showBackground ? "bg-zinc-900 bg-opacity-90" : ""
				}`}
			>
				<div>
					<Link
						href="/"
						className="text-green-500 font-bold text-xl md:text-2xl lg:text-3xl"
					>
						FreeBox
					</Link>
				</div>
				<div className="flex-row ml-5 gap-6 hidden md:flex text-base lg:text-lg xl:text-xl">
					<NavbarItem label="Home" active />
					<NavbarItem label="Shorts" />
					<NavbarItem label="Favorites" />
					<NavbarItem label="Popular" />
					<NavbarItem label="News" />
				</div>
				<div className="md:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
					<p className="text-white transition">Browse</p>
					<MobileMenu visible={showMobileMenu} />
					<BsChevronDown
						onClick={toggleMobileMenu}
						className={`text-white transition ${
							showMobileMenu ? "rotate-180" : "rotate-0"
						}`}
					/>
				</div>
				<div className="flex flex-row ml-auto gap-7 items-center">
					<div className="text-gray-200 hover:text-gray-400 cursor-pointer transition">
						<BsSearch onClick={openSearchModal} />
						<SearchModal
							visible={isSearchOpen}
							onClose={closeSearchModal}
						/>
					</div>

					<div
						onClick={toggleAccountMenu}
						className="flex flex-row items-center gap-2 cursor-pointer relative"
					>
						<div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden ">
							<img src="/images/kkrn_icon_user_8.png" alt="" />
						</div>
						<BsChevronDown
							className={`text-white transition ${
								showAccountMenu ? "rotate-180" : "rotate-0"
							}`}
						/>
						<AccountMenu visible={showAccountMenu} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navber;
