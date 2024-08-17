import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function Footer() {
	return (
		<div className="flex items-center w-full p-6 bg-background z-50">
			<Logo />
			<div className="md:ml-auto w-full justify-end flex items-center gap-x-2 text-muted-foreground">
				<Button variant="ghost" size={"sm"}>
					Privacy Policy
				</Button>
				<Button variant="ghost" size={"sm"}>
					Terms and Conditions
				</Button>
			</div>
		</div>
	);
}
