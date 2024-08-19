"use client";

import DocumentList from "@/app/(main)/_components/document-list";
import Item from "@/app/(main)/_components/item";
import TrashBox from "@/app/(main)/_components/trash-box";
import UserItem from "@/app/(main)/_components/user-item";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

export default function Navigation() {
	const pathname = usePathname();
	const isMobile = useMediaQuery("(max-width: 768px)");

	const create = useMutation(api.documents.create);

	const isResizingRef = useRef(false);
	const sidebarRef = useRef<ElementRef<"aside">>(null);
	const navbarRef = useRef<ElementRef<"div">>(null);

	const [isResetting, setIsResetting] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(isMobile); // ** Sidebar auto-collapsed on mobile

	React.useEffect(() => {
		if (isMobile)
			collapse(); // ** Weird behaviour otherwise with hamburger icon remaining on desktop
		else resetWidth();
	}, [isMobile]);

	// ** Same as above but for pathname change
	React.useEffect(() => {
		if (isMobile) collapse();
	}, [pathname, isMobile]);

	// ** Manual sidebar resizing
	function handleMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		event.preventDefault();
		event.stopPropagation();

		isResizingRef.current = true;
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	}

	function handleMouseMove(event: MouseEvent) {
		if (!isResizingRef.current) return;

		let newWidth = event.clientX;

		if (newWidth < 240) newWidth = 240; // ** Sidebar minimum width
		if (newWidth > 480) newWidth = 480; // ** Sidebar maximum width

		// ** Set sidebar width and navbar left position
		if (sidebarRef.current && navbarRef.current) {
			sidebarRef.current.style.width = `${newWidth}px`;
			navbarRef.current.style.setProperty("left", `${newWidth}px`);
			navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
		}
	}

	function handleMouseUp() {
		isResizingRef.current = false;
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	}

	// ** Reset sidebar width (Different from Collapse)
	function resetWidth() {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(false);
			setIsResetting(true);

			sidebarRef.current.style.width = isMobile ? "100%" : "240px";
			navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
			navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");
		}
		setTimeout(() => setIsResetting(false), 300); // ** For animation (transition duration 300ms)
	}

	function collapse() {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(true);
			setIsResetting(true);

			sidebarRef.current.style.width = "0";
			navbarRef.current.style.setProperty("left", "0");
			navbarRef.current.style.setProperty("width", "100%");
		}
		setTimeout(() => setIsResetting(false), 300); // ** For animation (transition duration 300ms)
	}

	function handleCreate() {
		const promise = create({ title: "Untitled" });
		toast.promise(promise, {
			loading: "Creating new note...",
			success: "New note created!",
			error: "Failed to create note.",
		});
	}

	return (
		<>
			<aside
				ref={sidebarRef}
				className={cn(
					"group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
					isResetting && "transition-all ease-in-out duration-300",
					isMobile && "w-0"
				)}
			>
				<div
					role="button"
					onClick={collapse}
					className={cn(
						"h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
						isMobile && "opacity-100"
					)}
				>
					<ChevronsLeft className="w-6 h-6" />
				</div>
				<div>
					<UserItem />
					<Item onClick={() => {}} label="Search" icon={Search} isSearch />
					<Item onClick={handleCreate} label="New page" icon={PlusCircle} />
					<Item onClick={() => {}} label="Settings" icon={Settings} />
				</div>
				<div className="mt-4">
					<DocumentList />
					<Item onClick={handleCreate} icon={Plus} label="Add a page" />
					<Popover>
						<PopoverTrigger className="w-full mt-4">
							<Item label="Trash" icon={Trash} />
						</PopoverTrigger>
						<PopoverContent side={isMobile ? "bottom" : "right"} className="p-0 w-72">
							<TrashBox />
						</PopoverContent>
					</Popover>
				</div>
				<div
					onMouseDown={handleMouseDown}
					onClick={resetWidth}
					className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
				/>
			</aside>
			<div
				ref={navbarRef}
				className={cn(
					"absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
					isResetting && "transition-all ease-in-out duration-300",
					isCollapsed && "left-0"
				)}
			>
				<nav className="bg-transparent px-3 py-2 w-full">
					{isCollapsed && (
						<MenuIcon
							className="h-6 w-6 text-muted-foreground"
							role="button"
							onClick={resetWidth}
						/>
					)}
				</nav>
			</div>
		</>
	);
}
