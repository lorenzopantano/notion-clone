"use client";

import Navigation from "@/app/(main)/_components/navigation";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const { isAuthenticated, isLoading } = useConvexAuth();

	if (isLoading) {
		return (
			<div className="h-full flex items-center justify-center">
				<Spinner size="lg" />
			</div>
		);
	}

	/** Redirect to Landing page when not authenticated for every page in (main) */
	if (!isAuthenticated) {
		return redirect("/");
	}

	return (
		<div className="h-full flex">
			<Navigation />
			<main className="flex-1 h-full overflow-auto">{children}</main>
		</div>
	);
}
