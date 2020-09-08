import styled, { CreateStyled } from '@emotion/styled/macro';

export const theme = {
	colors: {
		primary: '#7e57c2',
		primaryLight: '#b085f5',
		secondary: '#546e7a',
		onLight: '#eceff1',
		onDark: '#fff',
		surface: '#fff',
		background: '#fff',
		error: '#b00020',
	},
	breakpoints: ['40em', '52em', '64em', '76em'],
	space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

export type Theme = typeof theme;

export default styled as CreateStyled<Theme>;
