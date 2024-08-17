"use client";

import Logo from "@/components/logo";
import { Spinner } from "@/components/spinner";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated, useConvexAuth } from "convex/react";
import Link from "next/link";

export default function Navbar() {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const isScrolled = useScrollTop();

	console.log(isAuthenticated, isLoading);

	return (
		<div
			className={cn(
				"z-50 bg-background fixed top-0 flex items-center w-full p-6",
				isScrolled && "border-b shadow-sm"
			)}
		>
			<Logo />
			<div className="justify-end w-full flex items-center gap-x-4">
				<AuthLoading>
					<Spinner />
				</AuthLoading>
				<Unauthenticated>
					<SignInButton mode="modal">
						<Button variant="outline">Sign In</Button>
					</SignInButton>
					<SignInButton mode="modal">
						<Button>Get Jotion Free</Button>
					</SignInButton>
				</Unauthenticated>
				<Authenticated>
					<Button variant="ghost" asChild size="sm">
						<Link href="/documents">Enter Jotion</Link>
					</Button>
					<UserButton />
				</Authenticated>
				<ModeToggle />
			</div>
		</div>
	);
}
