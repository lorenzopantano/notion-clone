"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function Documents() {
	const { user } = useUser();
	const create = useMutation(api.documents.create);

	function onCreate() {
		const promise = create({ title: "Untitled" });
		toast.promise(promise, {
			loading: "Creating new note...",
			success: "New note created!",
			error: "Failed to create new note.",
		});
	}

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
			<Button onClick={onCreate}>
				Create a note
				<PlusCircle className="w-4 h-4 ml-2" />
			</Button>
		</div>
	);
}
