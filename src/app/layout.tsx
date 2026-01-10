import '@/styles/globals.css';
import { type Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
	title: 'SlotFlow',
	description: 'Schedule Your Appointment Effortlessly',
	icons: [
		{ rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
		{ rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
		{ rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
		{ rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
	],
};

const geist = Geist({
	subsets: ['latin'],
	variable: '--font-geist-sans',
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			className={`scroll-smooth ${geist.variable}`}>
			<body className="">
				{/* <Header /> */}
				{children}
				{/* <Footer /> */}
				<ToastContainer />
			</body>
		</html>
	);
}
