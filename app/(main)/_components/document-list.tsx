"use client";

import Item from "@/app/(main)/_components/item";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface DocumentListProps {
	parentDocumentId?: Id<"documents">;
	level?: number;
	data?: Doc<"documents">[];
}

export default function DocumentList({ parentDocumentId, level = 0 }: DocumentListProps) {
	const params = useParams();
	const router = useRouter();
	const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

	const onExpand = (id: Id<"documents">) => {
		setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const documents = useQuery(api.documents.getSidebar, { parentDocument: parentDocumentId });

	const onRedirect = (documentId: string) => {
		router.push(`/documents/${documentId}`);
	};

	// ** Convex returns null if no documents are found, undefined only when loading
	if (documents === undefined) {
		return (
			<>
				<Item.Skeleton level={level} />
				<>
					<Item.Skeleton level={level} />
					<Item.Skeleton level={level} />
				</>
			</>
		);
	}

	return (
		<>
			<p
				style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
				className={cn(
					"hidden text-sm font-medium text-muted-foreground",
					level === 0 && "hidden",
					expanded && "last:block"
				)}
			>
				No pages inside.
			</p>
			{documents.map((document) => {
				return (
					<div key={document._id}>
						<Item
							id={document._id}
							label={document.title}
							icon={FileIcon}
							onClick={() => onRedirect(document._id)}
							documentIcon={document.icon}
							level={level}
							active={document._id === params.documentId}
							expanded={expanded[document._id]}
							onExpand={() => onExpand(document._id)}
						/>
						{expanded[document._id] && (
							<DocumentList parentDocumentId={document._id} level={level + 1} />
						)}
					</div>
				);
			})}
		</>
	);
}
