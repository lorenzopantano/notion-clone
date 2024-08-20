"use client";

import CoverImageModal from "@/components/modals/cover-image-modal";
import SettingsModal from "@/components/modals/settings-modal";
import React from "react";

export default function ModalProvider() {
	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<SettingsModal />
			<CoverImageModal />
		</>
	);
}
