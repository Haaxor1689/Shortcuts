/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FC, useEffect, useState } from 'react';
import { ThemeProvider } from 'emotion-theming';

import { Flex, Grid } from 'Components/Styled';

import { theme, Theme } from 'Theme';

import useDeviceDetect from 'Hooks/useDeviceDetect';

const App: FC = () => {
	const [day, setDay] = useState(0);
	const isMobile = useDeviceDetect();

	// Swimming pool
	const [reservations, setReservations] = useState<Element[][]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				'https://cors-anywhere.herokuapp.com/https://mpsl.sportujemevbrne.cz/rezervace',
			);
			const text = await response.text();
			const el = document.createElement('div');
			el.innerHTML = text;
			const res = el.querySelector('.s-reservation .s-reservation__body');
			if (!res) {
				return;
			}

			const nodes = Array(...res.children)
				.reduce<Element[][]>((prev, node) => {
					const last = prev.length > 0 ? prev[prev.length - 1] : [];
					const head = prev.slice(0, -1);
					return node.tagName === 'H3'
						? [...head, last, [node]]
						: [...head, [...last, node]];
				}, [])
				.slice(1)
				.map(d => d.slice(0, -6));

			res && setReservations(nodes);
		};
		fetchData();
	}, []);

	// Bus
	const [bus, setBus] = useState<Element[]>();
	useEffect(() => {
		const fetchData = isMobile
			? async () => {
					const response = await fetch(
						'https://cors-anywhere.herokuapp.com/https://t.idos.idnes.cz/vlakyautobusymhdvse/spojeni/?fromT=Malinovsk%C3%A9ho+n%C3%A1m%C4%9Bst%C3%AD&fromH=Malinovsk%C3%A9ho+n%C3%A1m%C4%9Bst%C3%AD%25302003%251417%25%2549.195544999999996%2516.61378125%25false%25&fromP=&fromMP=false&toT=Sportovn%C3%AD&toH=Sportovn%C3%AD%25302003%252323%25%2549.2121205%2516.607163%25false%25&toP=&toMP=&arrdep=false&arrH=false&date=&dateH=&time=&timeH=&af=false&afShow=false&viaT=&viaH=&viaP=&viaMP=&trtypeH_0=on&trtype_150=on&trtype_151=on&trtype_152=on&trtype_153=on&trtype_156=on&trtype_2=on&trtype_3=on&trtype_4=on&trtype_5=on&trtype_6=on&trtype_9=on&trtypeids=&maxChange=4&minTime=-1&cmd=cmdSearch',
					);
					const text = await response.text();
					const el = document.createElement('div');
					el.innerHTML = text;
					const res = el.querySelectorAll('.panel-body');
					if (!res) {
						return;
					}
					setBus(Array(...res).slice(0, 3));
			  }
			: async () => {
					const response = await fetch(
						'https://cors-anywhere.herokuapp.com/https://idos.idnes.cz/idsjmk/spojeni/vysledky/?f=Malinovsk%C3%A9ho%20n%C3%A1m%C4%9Bst%C3%AD&fc=302003&t=Sportovn%C3%AD&tc=302003',
					);
					const text = await response.text();
					const el = document.createElement('div');
					el.innerHTML = text;
					const res = el.querySelectorAll('.box.connection.detail-box');
					if (!res) {
						return;
					}
					setBus(Array(...res));
			  };
		fetchData();
	}, [isMobile]);

	return (
		<ThemeProvider theme={theme}>
			<Flex flexDirection="column" alignItems="center">
				{bus && (
					<Flex
						dangerouslySetInnerHTML={{
							__html: bus.map(el => el.outerHTML).join(''),
						}}
						css={(theme: Theme) => css`
							.box.connection {
								margin: ${theme.space[4]}px;
							}

							.date-after {
								margin-left: 8px;
								font-size: 14px;
							}

							a.title,
							input,
							.reset.total,
							.connection-expand,
							ul.stations {
								display: none;
							}
						`}
					/>
				)}
				<Flex>
					<button onClick={() => setDay(d => Math.max(--d, 0))}>
						Prev day
					</button>
					<button
						onClick={() => setDay(d => Math.min(++d, reservations.length - 1))}
					>
						Next day
					</button>
				</Flex>
				{reservations && (
					<Grid
						gridTemplateRows="auto auto"
						gridAutoColumns="1fr"
						gridAutoRows={40}
						dangerouslySetInnerHTML={{
							__html: reservations[day]
								?.map(el =>
									el.tagName === 'H3' || el.tagName === 'H4'
										? el.outerHTML
										: el.innerHTML,
								)
								.join(''),
						}}
						css={css`
							h3,
							h4 {
								grid-column-start: 1;
								grid-column-end: 18;
							}

							div {
								display: flex;
								align-items: center;
								justify-content: center;
								padding: ${theme.space[2]}px;
								overflow: hidden;
								font-size: 14px !important;
								text-align: center;

								@media (max-width: 650px) {
									font-size: 9px !important;
									/* color: transparent !important;
									* {
										color: transparent !important;
									} */
								}
							}
						`}
					/>
				)}
			</Flex>
		</ThemeProvider>
	);
};

export default App;
