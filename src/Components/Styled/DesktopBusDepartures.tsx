/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC, Fragment, useEffect, useState } from 'react';
import { MdDirectionsBus } from 'react-icons/md';

import { Theme } from 'Theme';

import Typography from './Typography';

import { Flex } from '.';

type Props = {
	title: string;
	href: string;
};

const DesktopBusDepartures: FC<Props> = ({ title, href }) => {
	// Bus
	const [bus, setBus] = useState<Element[]>();
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`https://cors-anywhere.herokuapp.com/https://idos.idnes.cz/idsjmk/spojeni/vysledky/${href}`,
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
	}, [href]);
	return (
		<Fragment>
			<Flex bg="secondary" color="onDark" p={3} alignItems="center">
				<MdDirectionsBus size={18} />
				<Typography fontSize={22} fontWeight="bold" ml={2}>
					{title}
				</Typography>
			</Flex>
			{bus && (
				<Flex
					alignSelf="center"
					dangerouslySetInnerHTML={{
						__html: bus.map(el => el.outerHTML).join(''),
					}}
					css={(theme: Theme) => css`
						.box.connection * {
							color: ${theme.colors.onLight};
							text-decoration: none;
						}

						.box.connection {
							margin: ${theme.space[4]}px;
						}

						.delay-bubble {
							color: ${theme.colors.primary} !important;
						}

						ul.stations {
							padding-left: 0;
						}

						li.item.active {
							display: flex;

							* {
								margin: 0;
							}
						}

						.station {
							padding-left: ${theme.space[2]}px;
						}

						.connection-head,
						.line-right-part,
						.trtype,
						.specs,
						input,
						.reset.total,
						.connection-expand {
							display: none;
						}
					`}
				/>
			)}
		</Fragment>
	);
};

export default DesktopBusDepartures;
