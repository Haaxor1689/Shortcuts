import { css } from '@emotion/core';

import { Box, BoxProps } from 'Components/Styled';

import styled from 'Theme';

type Props = {
	ellipsis?: boolean;
};

const Typography = styled(Box)<BoxProps & Props>`
	${p =>
		p.ellipsis &&
		css`
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		`}
`.withComponent('p');

export default Typography;
