"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { Authenticated, AuthLoading, Unauthenticated, useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Heading() {
	const { isAuthenticated, isLoading } = useConvexAuth();

	return (
		<div className="max-w-3xl space-y-4">
			<h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
				Your Ideas, Documents & Plans. Unified. Welcome to <span className="underline">Jotion</span>
			</h1>
			<h3 className="text-base sm:text-xl md:text-2xl font-medium">
				Jotion is the connected workspace where <br /> better, faster work happen.
			</h3>
			<AuthLoading>
				<div className="w-full flex item-center justify-center">
					<Spinner size="lg" />
				</div>
			</AuthLoading>
			<Authenticated>
				<Button asChild>
					<Link href="/documents">
						Enter Jotion <ArrowRight className="h-5 w-5 ml-2" />
					</Link>
				</Button>
			</Authenticated>
			<Unauthenticated>
				<SignInButton mode="modal">
					<Button>
						Get Jotion Free
						<ArrowRight className="h-5 w-5 ml-2" />
					</Button>
				</SignInButton>
			</Unauthenticated>
		</div>
	);
}
