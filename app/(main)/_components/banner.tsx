import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
	documentId: Id<"documents">;
}

export default function Banner({ documentId }: BannerProps) {
	const router = useRouter();
	const remove = useMutation(api.documents.remove);
	const restore = useMutation(api.documents.restore);

	function onRemove() {
		const promise = remove({ id: documentId });
		toast.promise(promise, {
			loading: "Deleting document...",
			success: "Document deleted.",
			error: "Failed to delete document.",
		});

		router.push("/documents");
	}

	function onRestore() {
		const promise = restore({ id: documentId });
		toast.promise(promise, {
			loading: "Restoring document...",
			success: "Document restored.",
			error: "Failed to restore document.",
		});
	}

	return (
		<div className="w-full bg-rose-500 text-centerd text-sm p-2 text-white flex items-center gap-2 justify-center">
			This page is in the trash.
			<Button
				size="sm"
				onClick={onRestore}
				variant={"outline"}
				className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
			>
				Restore page
			</Button>
			<ConfirmModal onConfirm={onRemove}>
				<Button
					size="sm"
					variant={"outline"}
					className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
				>
					Delete forever
				</Button>
			</ConfirmModal>
		</div>
	);
}
