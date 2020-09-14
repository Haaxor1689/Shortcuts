import React, { FC } from 'react';
import { ThemeProvider } from 'emotion-theming';

import { Flex } from 'Components/Styled';
import Reservations from 'Components/Styled/Reservations';
import MobileBusDepartures from 'Components/Styled/MobileBusDepartures';
import DesktopBusDepartures from 'Components/Styled/DesktopBusDepartures';

import { theme } from 'Theme';

import useDeviceDetect from 'Hooks/useDeviceDetect';

import GlobalStyles from 'Theme/GlobalStyles';

const DesktopThereHref =
	'?f=Malinovsk%C3%A9ho%20n%C3%A1m%C4%9Bst%C3%AD&fc=302003&t=Sportovn%C3%AD&tc=302003';
const MobileThereHref =
	'?fromT=Malinovsk%C3%A9ho+n%C3%A1m%C4%9Bst%C3%AD&fromH=Malinovsk%C3%A9ho+n%C3%A1m%C4%9Bst%C3%AD%25302003%251417%25%2549.195544999999996%2516.61378125%25false%25&fromP=&fromMP=false&toT=Sportovn%C3%AD&toH=Sportovn%C3%AD%25302003%252323%25%2549.2121205%2516.607163%25false%25&toP=&toMP=&arrdep=false&arrH=false&date=&dateH=&time=&timeH=&af=false&afShow=false&viaT=&viaH=&viaP=&viaMP=&trtypeH_0=on&trtype_150=on&trtype_151=on&trtype_152=on&trtype_153=on&trtype_156=on&trtype_2=on&trtype_3=on&trtype_4=on&trtype_5=on&trtype_6=on&trtype_9=on&trtypeids=&maxChange=4&minTime=-1&cmd=cmdSearch';

const DesktopBackHref =
	'?f=Reissigova&fc=302003&t=Malinovského%20náměstí&tc=302003';
const MobileBackHref =
	'?fromT=Reissigova&fromH=Reissigova%25302003%252105%25%2549.21625399999999%2516.60403266666667%25false%25&fromP=&fromMP=false&toT=Malinovského+náměstí&toH=Malinovského+náměstí%25302003%251417%25%2549.195545%2516.61378125%25%25&toP=&toMP=false&arrdep=false&arrH=false&date=&dateH=&time=&timeH=&af=false&afShow=false&viaT=&viaH=&viaP=&viaMP=&trtypeH_0=on&trtype_150=on&trtype_151=on&trtype_152=on&trtype_153=on&trtype_156=on&trtype_2=on&trtype_3=on&trtype_4=on&trtype_5=on&trtype_6=on&trtype_9=on&trtypeids=&maxChange=4&minTime=-1&cmd=cmdSearch';

const App: FC = () => {
	const isMobile = useDeviceDetect();

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Flex flexDirection="column">
				{isMobile ? (
					<MobileBusDepartures title="Autobus tam" href={MobileThereHref} />
				) : (
					<DesktopBusDepartures title="Autobus tam" href={DesktopThereHref} />
				)}
				<Reservations isMobile={isMobile} />
				{isMobile ? (
					<MobileBusDepartures title="Autobus spať" href={MobileBackHref} />
				) : (
					<DesktopBusDepartures title="Autobus spať" href={DesktopBackHref} />
				)}
			</Flex>
		</ThemeProvider>
	);
};

export default App;
