"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

export default function Documents() {
	const { user } = useUser();

	return (
		<div className="h-full flex flex-col items-center justify-center space-y-4">
			<Image
				src="/empty-dark.png"
				width={200}
				height={200}
				alt="Empty"
				className="hidden dark:block"
			/>
			<Image src="/empty.png" width={200} height={200} alt="Empty" className="dark:hidden" />
			<h2 className="text-lg font-medium">Welcome to {user?.firstName}'s Jotion</h2>
			<Button>
				Create a note
				<PlusCircle className="w-4 h-4 ml-2" />
			</Button>
		</div>
	);
}
