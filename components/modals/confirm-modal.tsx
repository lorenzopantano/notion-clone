"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";

interface ConfirmModalProps {
	children: React.ReactNode;
	onConfirm: () => void;
}

export default function ConfirmModal({ children, onConfirm }: ConfirmModalProps) {
	function handleConfirm(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.stopPropagation();
		onConfirm();
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger onClick={(e) => e.stopPropagation()}>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
