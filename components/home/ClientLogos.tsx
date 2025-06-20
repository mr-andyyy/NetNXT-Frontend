'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';

// Client logos
const customers = [
	{ src: '/Logos/browserstack.png', name: 'BrowserStack' },
	{ src: '/Logos/healthifyme.png', name: 'HealthifyMe' },
	{ src: '/Logos/bharatpe.png', name: 'BharatPe' },
	{ src: '/Logos/cleartrip.png', name: 'Cleartrip' },
	{ src: '/Logos/freecharge.png', name: 'Freecharge' },
	{ src: '/Logos/zoomcar.png', name: 'Zoomcar' },
	{ src: '/Logos/gameskraft.png', name: 'Gameskraft' },
	{ src: '/Logos/globale.png', name: 'Globale' },
	{ src: '/Logos/dhani.png', name: 'Dhani' },
	{ src: '/Logos/wheelseye.png', name: 'WheelsEye' },
	{ src: '/Logos/shiprocket.png', name: 'Shiprocket' },
	{ src: '/Logos/apna.png', name: 'Apna' },
	{ src: '/Logos/betterplace.png', name: 'Betterplace' },
	{ src: '/Logos/chargebee.png', name: 'Chargebee' },
	{ src: '/Logos/coverself.png', name: 'CoverSelf' },
	{ src: '/Logos/haptik.png', name: 'Haptik' },
	{ src: '/Logos/indmoney.png', name: 'INDmoney' },
	{ src: '/Logos/colortokens.png', name: 'ColorTokens' },
	{ src: '/Logos/yellowai.png', name: 'Yellow.ai' },
	{ src: '/Logos/indiabulls.png', name: 'Indiabulls' },
	{ src: '/Logos/lambdatest.png', name: 'LambdaTest' },
	{ src: '/Logos/powerschool.png', name: 'PowerSchool' },
	{ src: '/Logos/sandisk.png', name: 'SanDisk' },
	{ src: '/Logos/artfertilityclinics.png', name: 'ART Fertility Clinics' },
	{ src: '/Logos/atlan.png', name: 'Atlan' },
	{ src: '/Logos/apollotricoat.png', name: 'Apollo Tricoat' },
	{ src: '/Logos/bakerhughes.png', name: 'Baker Hughes' },
	{ src: '/Logos/liminal.png', name: 'Liminal' },
	{ src: '/Logos/cashfree.png', name: 'Cashfree' },
	{ src: '/Logos/prtg.png', name: 'PRTG' },
	{ src: '/Logos/proofpoint.png', name: 'Proofpoint' },
	{ src: '/Logos/innoviti.png', name: 'Innoviti' },
	{ src: '/Logos/spenmo.png', name: 'Spenmo' },
];

const ClientLogos = () => {
	const marqueeRef = useRef<HTMLDivElement>(null);

	return (
		<section
			id="expertise"
			className="py-16 flex flex-col items-center justify-center bg-gray-50 scroll-mt-24"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
				className="text-center mb-10 px-4"
			>
				<h2 className="text-3xl font-bold text-center mb-6">
					Over 12 Years of Expertise in Customized
					<br />
					IT & Security Solutions
				</h2>
			</motion.div>

			<div className="w-screen px-4 relative overflow-hidden" ref={marqueeRef}>
				{/* Left Gradient Mask */}
				<div
					className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
					style={{
						background:
							'linear-gradient(to right, rgba(249, 250, 251, 1), rgba(249, 250, 251, 0))',
					}}
				/>

				{/* Right Gradient Mask */}
				<div
					className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
					style={{
						background:
							'linear-gradient(to left, rgba(249, 250, 251, 1), rgba(249, 250, 251, 0))',
					}}
				/>

				{/* Marquee Content */}
				<Marquee
					gradient={false}
					speed={30}
					pauseOnHover={true}
					className="overflow-hidden transition-all duration-700 ease-in-out"
				>
					{customers.map((client, index) => (
						<div
							key={index}
							className="flex justify-center items-center mx-12 transition-transform duration-500 ease-in-out hover:scale-105"
						>
							<Image
								src={client.src}
								alt={`${client.name} logo`}
								width={150}
								height={80}
								className="h-16 w-auto object-contain"
							/>
						</div>
					))}
				</Marquee>
			</div>
		</section>
	);
};

export default ClientLogos;
