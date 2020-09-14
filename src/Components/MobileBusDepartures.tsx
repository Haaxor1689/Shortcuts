/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC, Fragment, useEffect, useState } from 'react';
import { MdDirectionsBus } from 'react-icons/md';

import { Theme } from 'Theme';

import Typography from './Styled/Typography';
import Spinner from './Styled/Spinner';
import { Flex } from './Styled';

type Props = {
	title: string;
	href: string;
};

const MobileBusDepartures: FC<Props> = ({ title, href }) => {
	// Bus
	const [bus, setBus] = useState<Element[]>();
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`https://cors-anywhere.herokuapp.com/https://t.idos.idnes.cz/vlakyautobusymhdvse/spojeni/${href}`,
			);
			const text = await response.text();
			const el = document.createElement('div');
			el.innerHTML = text;
			const res = el.querySelectorAll('.panel-body');
			if (!res) {
				return;
			}
			setBus(Array(...res).slice(0, 3));
		};
		fetchData();
	}, [href]);
	return (
		<Fragment>
			<Flex bg="secondary" color="onDark" p={3} alignItems="center">
				<MdDirectionsBus size={18} />
				<Typography fontSize={22} fontWeight="bold" ml={2}>
					{title}
				</Typography>
			</Flex>
			{bus ? (
				<Flex
					flexDirection="column"
					dangerouslySetInnerHTML={{
						__html: bus.map(el => el.outerHTML).join(''),
					}}
					css={(theme: Theme) => css`
						.panel-body * {
							color: ${theme.colors.onLight};
							text-decoration: none;
						}

						.panel-body {
							margin-bottom: ${theme.space[3]}px;
						}

						.r-mg-1 {
							padding: ${theme.space[2]}px;
						}

						.train-row {
							background-color: ${theme.colors.surface};
						}

						.station-row,
						.delay-row,
						.linkdist-row,
						.shorten {
							margin-left: ${theme.space[2]}px;
						}

						.shorten {
							margin-top: 0;
						}

						.delay-row * {
							color: ${theme.colors.primary};
						}

						.wwwtt,
						.fixed-code.fx-gray,
						.nodelay {
							display: none;
						}
					`}
				/>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default MobileBusDepartures;
