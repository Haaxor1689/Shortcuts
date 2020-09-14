import React from 'react';
import { Global, css } from '@emotion/core';

import { theme } from '.';

export const FocusStyle = css`
	transition: box-shadow 0.2s ease-in-out;
	box-shadow: 0 0 6px 1px ${theme.colors.primary};
	outline: none;
`;

export const InvertFocusStyle = css`
	box-shadow: 0 0 6px 1px white;
	outline: none;
`;

const GlobalStyles = () => (
	<Global
		styles={css`
			body {
				margin: 0;
				font-family: 'Drive', 'Roboto', -apple-system, BlinkMacSystemFont,
					'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
					'Helvetica Neue', sans-serif;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				color: ${theme.colors.onLight};
			}

			* {
				font-family: 'Drive', 'Roboto', -apple-system, BlinkMacSystemFont,
					'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
					'Helvetica Neue', sans-serif;
			}

			*:focus {
				${FocusStyle}
			}

			p {
				padding: 0;
				margin: ${theme.space[2]}px 0;
			}

			button {
				appearance: none;
				border: none;
				background: none;
				padding: ${theme.space[2]}px ${theme.space[3]}px;
				color: unset;
				cursor: pointer;
			}

			[data-reach-dialog-overlay] {
				z-index: 999;
			}

			[data-reach-dialog-content] {
				background-color: unset;

				:focus {
					box-shadow: none;
				}
			}
		`}
	/>
);

export default GlobalStyles;
