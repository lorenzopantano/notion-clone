import Navbar from "@/app/(landing)/_components/navbar";

export default function LandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="h-full">
			<Navbar />
			<main className="h-full pt-40">{children}</main>
		</div>
	);
}
