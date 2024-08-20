"use client";

import Banner from "@/app/(main)/_components/banner";
import Menu from "@/app/(main)/_components/menu";
import Title from "@/app/(main)/_components/title";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";

interface NavbarProps {
	isCollapsed: boolean;
	onResetWidth?: () => void;
}

export default function Navbar({ isCollapsed, onResetWidth }: NavbarProps) {
	const params = useParams();
	const document = useQuery(api.documents.getById, { id: params.documentId as Id<"documents"> });

	if (document === undefined)
		return (
			<nav className="bg-background px-3 py-2 w-full flex items-center justify-between gap-x-4">
				<Title.Skeleton />
				<div className="flex items-center gap-x-2">
					<Menu.Skeleton />
				</div>
			</nav>
		);

	if (document === null) return <div>Document not found</div>;

	return (
		<>
			<nav className="bg-background px-3 py-2 w-full flex items-center gap-x-4">
				{isCollapsed && (
					<MenuIcon
						role="button"
						onClick={onResetWidth}
						className="w-6 h-6 text-muted-foreground"
					/>
				)}
				<div className="flex items-center justify-between w-full">
					<Title initialData={document} />
					<div className="flex items-center gap-x-2">
						<Menu documentId={document._id} />
					</div>
				</div>
			</nav>
			{document.isArchived && <Banner documentId={document._id} />}
		</>
	);
}
