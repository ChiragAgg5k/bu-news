'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { News } from '../types';
import { getDatabase, onValue, ref } from 'firebase/database';
import firebase_app from '@/firebase/config';
import NavBar from '../components/NavBar';
import Image from 'next/image';
import Link from 'next/link';

function dateInMillisecondsToDateString(date: number) {
	const d = new Date(date);
	const month = d.toLocaleString('default', {
		month: 'long',
	});
	const day = d.getDate();
	const year = d.getFullYear();
	return `${month} ${day}, ${year}`;
}

const AutoLink = (props: { text: string }) => {
	const delimiter =
		/((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;

	return (
		<p className="whitespace-pre-line lg:mr-4">
			{props.text.split(delimiter).map((word: string, index: number) => {
				const match = word.match(delimiter);
				if (match) {
					const url = match[0];
					return (
						<Link
							key={index}
							target="_blank"
							className="inline-block text-sky-600 hover:underline"
							href={url.startsWith('http') ? url : `http://${url}`}
						>
							{url}
						</Link>
					);
				}
				return word;
			})}
		</p>
	);
};

export default function NewsPage() {
	const searchParams = useSearchParams();
	const id = searchParams.get('id');

	const [news, setNews] = useState<News | undefined>(undefined);

	useEffect(() => {
		const db = getDatabase(firebase_app);
		const uploadRef = ref(db, `uploads/`);

		onValue(uploadRef, (snapshot) => {
			const data = snapshot.val();

			if (data === null || id === null || data[id] === undefined) {
				setNews({
					id: '404',
					newsHeading: '404: News not found',
					newsDescription: 'The news you are looking for does not exist. Please check the URL and try again.',
					authorized: false,
					category: '404',
					dateInMilliseconds: Date.now(),
					mImageUrl: '/404.svg',
					username: '404',
					promoted: false,
				});
				return;
			}

			setNews(data[id]);
		});
	}, [id]);

	return (
		<div>
			<NavBar />
			<div className="m-4">
				{news === undefined ? (
					<p>Loading...</p>
				) : (
					<div>
						<h2 className="my-8 text-2xl font-bold">{news.newsHeading}</h2>
						<div className="flex flex-col-reverse lg:flex-row lg:items-start">
							<AutoLink text={news.newsDescription} />
							<Image
								src={news.mImageUrl}
								alt="News Image"
								priority={true}
								className="mx-auto mb-8 w-full max-w-sm object-contain"
								width={500}
								height={500}
							/>
						</div>
						<p className="mt-6 text-lg font-medium">{news.username ? news.username : 'Anonymous'}</p>
						<p className="mb-6 text-base">{dateInMillisecondsToDateString(news.dateInMilliseconds)}</p>
					</div>
				)}
			</div>
		</div>
	);
}
