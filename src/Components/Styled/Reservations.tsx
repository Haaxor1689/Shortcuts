/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FC, Fragment, useEffect, useState } from 'react';
import { MdPool } from 'react-icons/md';

import { Theme } from 'Theme';

import { InvertFocusStyle } from 'Theme/GlobalStyles';

import Typography from './Typography';

import { Box, Flex, Grid } from '.';

type Props = {
	isMobile: boolean;
};

const Reservations: FC<Props> = ({ isMobile }) => {
	// Swimming pool
	const [day, setDay] = useState(0);
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
				.map(day => day.slice(0, -6));

			if (isMobile) {
				nodes.forEach(day =>
					day.forEach(elem => {
						elem.innerHTML = elem.innerHTML
							?.replace(/(\d+)-\d+/g, '$1')
							?.replace(/(?:(?:délka)|(?:šířka))\n.*(\d+)/g, '$1');
					}),
				);
			}

			res && setReservations(nodes);
		};
		fetchData();
	}, [isMobile]);

	return (
		<Fragment>
			<Flex bg="secondary" color="onDark" p={3} alignItems="center">
				<MdPool size={18} />
				<Typography fontSize={22} fontWeight="bold" ml={2}>
					Dráhy
				</Typography>
				<Box flexGrow={1} />
				<Typography
					as="button"
					fontWeight="bold"
					onClick={() => setDay(d => Math.max(--d, 0))}
					css={css`
						:focus {
							${InvertFocusStyle}
						}
					`}
				>
					{'<<'}
				</Typography>
				<Typography
					as="button"
					fontWeight="bold"
					onClick={() => setDay(d => Math.min(++d, reservations.length - 1))}
					css={css`
						:focus {
							${InvertFocusStyle}
						}
					`}
				>
					{'>>'}
				</Typography>
			</Flex>
			<Flex></Flex>
			{reservations && (
				<Grid
					gridTemplateRows="auto auto"
					gridAutoColumns="1fr"
					gridAutoRows={40}
					mx={[0, 3]}
					mb={3}
					dangerouslySetInnerHTML={{
						__html: reservations[day]
							?.map(el =>
								el.tagName === 'H3' || el.tagName === 'H4'
									? el.outerHTML
									: el.innerHTML,
							)
							.join(''),
					}}
					css={(theme: Theme) => css`
						h3 {
							justify-self: center;
							text-transform: capitalize;
							grid-column-start: 1;
							grid-column-end: 18;
							margin: ${theme.space[3]}px 0;
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
							}
						}

						h4 {
							display: none;
						}
					`}
				/>
			)}
		</Fragment>
	);
};

export default Reservations;
