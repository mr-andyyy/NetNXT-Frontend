'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const whyChooseUs = [
  {
    title: "Unmatched Personalization",
    description:
      "We listen, we learn, and we create. Your business is unique, and so are your IT needs. Our expert team takes the time to understand your goals, challenges, and aspirations, tailoring solutions that fit you like a glove.",
  },
  {
    title: "Agile and Adaptable",
    description:
      "In the fast-paced world of technology, flexibility is key. Our adaptive strategies ensure that your IT infrastructure stays agile, ready to embrace innovation and navigate any curveball that comes your way.",
  },
  {
    title: "Security Beyond Limits",
    description:
      "Cyber threats may be relentless, but so are we. Our cutting-edge security measures provide ironclad protection for your business, giving you peace of mind as you focus on growth.",
  },
  {
    title: "Compliance Made Simple",
    description:
      "Compliance shouldn't be a headache. We streamline the compliance journey, ensuring you stay compliant with regulations while minimizing complexity and hassle.",
  },
  {
    title: "Partner in Your Success",
    description:
      "Your success is our success. We don't just provide services; we become an extension of your team, empowering you to conquer challenges and seize opportunities for growth.",
  },
];

const WhyChooseUs = () => {
	const [activeIndices, setActiveIndices] = useState<number[]>([]);

	const toggleAccordion = (index: number) => {
		setActiveIndices((prev) =>
			prev.includes(index)
				? prev.filter((i) => i !== index)
				: [...prev, index]
		);
	};

	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
				{/* LEFT: Image */}
				<div className="flex justify-center">
					<img
						src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
						alt="Why Choose Us"
						className="rounded-xl shadow-md object-cover max-w-full h-auto w-[600px]"
					/>
				</div>

				{/* RIGHT: Accordion */}
				<div>
					<h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>
					<div className="border rounded-xl divide-y overflow-hidden">
						{whyChooseUs.map((item, index) => (
							<div key={index}>
								<button
									onClick={() => toggleAccordion(index)}
									className="w-full text-left px-6 py-4 font-semibold flex justify-between items-center bg-white hover:bg-gray-100 transition-all"
								>
									{item.title}
									<span className="text-xl ml-4">
										{activeIndices.includes(index) ? '−' : '+'}
									</span>
								</button>
								<div
									className={`transition-all duration-300 overflow-hidden bg-gray-50`}
									style={{
										maxHeight: activeIndices.includes(index) ? 200 : 0,
										opacity: activeIndices.includes(index) ? 1 : 0,
										padding: activeIndices.includes(index) ? '16px 24px' : '0 24px',
									}}
								>
									{activeIndices.includes(index) && (
										<div className="text-gray-700">
											{item.description}
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Survey Section */}
			<div className="max-w-7xl mx-auto px-4 mt-16 text-center">
				<h3 className="text-2xl font-bold mb-4">Share Your Insights in Our Survey!</h3>
				<p className="text-gray-600 mb-8">Discover Seamless & Effective Security for Better Data Governance and Compliance.</p>
			</div>
		</section>
	);
};

export default WhyChooseUs;