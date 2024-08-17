import Image from "next/image";

export default function Heroes() {
	return (
		<div className="flex flex-col items-center justify-center max-w-5xl">
			<div className="flex items-center">
				<div className="relative w-[270px] sm:w-[350px] aspect-square">
					<Image
						src={"/documents.png"}
						fill
						alt="Documents"
						className="object-contain dark:hidden"
					/>
					<Image
						src={"/documents-dark.png"}
						fill
						alt="Documents"
						className="object-contain dark:block hidden"
					/>
				</div>
				<div className="relative w-[350px] aspect-square hidden md:block">
					<Image src={"/reading.png"} fill alt="Reading" className="object-contain dark:hidden" />
					<Image
						src={"/reading-dark.png"}
						fill
						alt="Reading"
						className="object-contain dark:block hidden"
					/>
				</div>
			</div>
		</div>
	);
}
