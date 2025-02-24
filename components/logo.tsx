import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export default function Logo() {
	return (
		<div className="md:flex items-center gap-x-2">
			<Image src="/logo.svg" alt="Logo" width={40} height={40} className="dark:hidden" />
			<Image src="/logo-dark.svg" alt="Logo" width={40} height={40} className="hidden dark:block" />
			<p className={cn("hidden md:block font-semibold", font.className)}>Jotion</p>
		</div>
	);
}
