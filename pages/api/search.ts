import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method !== "GET") {
			return res.status(405).end();
		}

		await serverAuth(req);

		const query = req.query;
		let { q: queryParam = "" } = query;

		if (typeof queryParam === "object") {
			queryParam = queryParam[0];
		}

		const movies = await prismadb.movie.findMany({
			where: {
				title: {
					contains: queryParam,
					mode: "insensitive"
				}
			}
		});

		return res.status(200).json(movies);
	} catch (error) {
		console.log(error);
		return res.status(500).end();
	}
}
