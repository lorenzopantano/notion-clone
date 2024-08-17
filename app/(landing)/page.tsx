import Footer from "@/app/(landing)/_components/footer";
import Heading from "@/app/(landing)/_components/heading";
import Heroes from "@/app/(landing)/_components/heroes";

export default function Landing() {
	return (
		<div className="min-h-full flex flex-col">
			<div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
				<Heading />
				<Heroes />
			</div>
			<Footer />
		</div>
	);
}
