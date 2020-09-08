import { css } from '@emotion/core';

import { Box, BoxProps } from 'components/styled';

import { offscreenStyle } from 'theme/accessibilityStyles';
import styled from 'theme/styled';

interface Props {
	ellipsis?: boolean;
}

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
