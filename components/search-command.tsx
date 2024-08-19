"use client";

import React from "react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandList,
	CommandItem,
} from "@/components/ui/command";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useStore } from "zustand";
import { useSearch } from "@/hooks/use-search";

export default function SearchCommand() {
	const { user } = useUser();
	const router = useRouter();
	const documents = useQuery(api.documents.getSearch);

	const [isMounted, setIsMounted] = React.useState(false);

	const toggle = useSearch((state) => state.toggle);
	const isOpen = useSearch((state) => state.isOpen);
	const onClose = useSearch((state) => state.onClose);

	function onSelect(documentId: string) {
		router.push(`/documents/${documentId}`);
		onClose();
	}

	// ** Listen for CMD+K to open the search dialog
	React.useEffect(() => {
		const down = (event: KeyboardEvent) => {
			if (event.key === "k" && (event.ctrlKey || event.metaKey)) {
				event.preventDefault();
				toggle();
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [toggle]);

	// ** To fix hydration errors on dialogs
	// ** use client does some hydration anyway
	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<CommandDialog open={isOpen} onOpenChange={onClose}>
			<CommandInput placeholder={`Search ${user?.firstName}'s Jotion...`} />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Documents">
					{documents?.map((document) => {
						return (
							<CommandItem
								key={document._id}
								value={`${document._id}-${document.title}`}
								title={document.title}
								onSelect={onSelect}
							>
								{document.icon ? (
									<p className="mr-2 text-[18px]">{document.icon}</p>
								) : (
									<File className="mr-2 h-4 w-4" />
								)}
								<span>{document.title}</span>
							</CommandItem>
						);
					})}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}
