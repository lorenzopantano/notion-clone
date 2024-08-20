"use client";

import Toolbar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface DocumentPageProps {
	params: {
		documentId: Id<"documents">;
	};
}

export default function DocumentPage({ params }: DocumentPageProps) {
	const document = useQuery(api.documents.getById, { id: params.documentId });

	if (document === undefined) return <div>Loading...</div>;

	if (document === null) return <div>Document not found.</div>;

	return (
		<div className="pb-40">
			<div className="h-[30vh]" />
			<div className="md:max-3xl lg:max-w-4xl mx-auto">
				<Toolbar initialData={document} />
			</div>
		</div>
	);
}
