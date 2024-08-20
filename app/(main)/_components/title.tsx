"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React from "react";

interface TitleProps {
	initialData: Doc<"documents">;
}

export default function Title({ initialData }: TitleProps) {
	const update = useMutation(api.documents.update);
	const [isEditing, setIsEditing] = React.useState(false);
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [title, setTitle] = React.useState(initialData.title || "Untitled");

	function enableInput() {
		setTitle(initialData.title);
		setIsEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
		}, 0);
	}

	function disableInput() {
		setIsEditing(false);
	}

	function onChange(event: React.ChangeEvent<HTMLInputElement>) {
		setTitle(event.target.value);
		update({ id: initialData._id, title: event.target.value || "Untitled" });
	}

	function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter") {
			disableInput();
		}
	}

	return (
		<div className="flex items-center gap-x-1">
			{!!initialData.icon && <p>{initialData.icon}</p>}
			{isEditing ? (
				<Input
					ref={inputRef}
					onClick={enableInput}
					onBlur={disableInput}
					onChange={onChange}
					onKeyDown={onKeyDown}
					value={title}
					className="h-7 px-2 focus-visible:ring-transparent"
				/>
			) : (
				<Button onClick={enableInput} variant="ghost" className="h-7 ps-2 font-normal">
					<span className="truncate">{initialData.title}</span>
				</Button>
			)}
		</div>
	);
}

Title.Skeleton = function TitleSkeleton() {
	return <Skeleton className="h-7 w-60 rounded-md" />;
};
