import { keyframes } from '@emotion/core';

import styled from 'Theme';

import { Box } from '.';

const SpinAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Spinner = styled(Box)`
	display: inline-block;
	align-self: center;
	margin: ${p => p.theme.space[3]}px;

	:after {
		content: ' ';
		display: block;
		width: 64px;
		height: 64px;
		margin: 8px;
		border-radius: 50%;
		border: 6px solid ${p => p.theme.colors.secondary};
		border-color: ${p => p.theme.colors.secondary} transparent
			${p => p.theme.colors.secondary} transparent;
		animation: ${SpinAnimation} 1.2s linear infinite;
	}
`;

export default Spinner;
