import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface MenuProps {
	documentId: Id<"documents">;
}

export default function Menu({ documentId }: MenuProps) {
	const router = useRouter();
	const { user } = useUser();
	const archive = useMutation(api.documents.archive);

	function onArchive() {
		const promise = archive({ id: documentId });
		toast.promise(promise, {
			loading: "Moving to trash...",
			success: "Document archived.",
			error: "Failed to archive document.",
		});

		router.push("/documents");
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button size="sm" variant="ghost">
					<MoreHorizontal className="w-4 h-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
				<DropdownMenuItem onClick={onArchive}>
					<Trash className="w-4 h-4 mr-2" />
					Delete
				</DropdownMenuItem>
				<div className="text-xs text-muted-foreground p-2">Last edited by {user?.fullName}</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

Menu.Skeleton = function MenuSkeleton() {
	return <Skeleton className="w-10 h-7" />;
};
