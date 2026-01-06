import '@/styles/globals.css';
import { type Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
	title: '32 Smile',
	description: 'Let Us Brighten Your Smile',
	icons: [{ rel: 'icon', url: '/favicon.ico' }],
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
