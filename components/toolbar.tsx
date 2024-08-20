import IconPicker from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ImageIcon, Smile, X } from "lucide-react";
import React, { ElementRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface ToolabarProps {
	initialData: Doc<"documents">;
	preview?: boolean;
}

export default function Toolbar({ initialData, preview }: ToolabarProps) {
	const inputRef = React.useRef<ElementRef<"textarea">>(null);
	const [isEditing, setIsEditing] = React.useState(false);
	const [value, setValue] = React.useState(initialData.title || "Untitled");

	const update = useMutation(api.documents.update);
	const iconRemove = useMutation(api.documents.removeIcon);

	const enableInput = () => {
		if (preview) return;

		setIsEditing(true);
		setTimeout(() => {
			setValue(initialData.title);
			inputRef.current?.focus();
		}, 0);
	};

	const disableInput = () => {
		setIsEditing(false);
	};

	const onInput = (value: string) => {
		setValue(value);
		update({ id: initialData._id, title: value || "Untitled" });
	};

	const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			disableInput();
		}
	};

	const onIconSelect = (icon: string) => {
		update({ id: initialData._id, icon });
	};

	const onRemoveIcon = () => {
		iconRemove({ id: initialData._id });
	};

	return (
		<div className="pl-[54px] group/icon relative">
			{!!initialData.icon && !preview && (
				<div className="flex items-center gap-x-2 group/icon pt-6">
					<IconPicker onChange={onIconSelect} asChild>
						<p className="text-6xl hover:opacity-75 transition">{initialData.icon}</p>
					</IconPicker>
					<Button
						onClick={onRemoveIcon}
						className="opacity-0 group-hover/icon:opacity-100 text-xs text-muted-foreground transition-none rounded-full"
						variant="outline"
						size="icon"
					>
						<X className="w-4 h-4" />
					</Button>
				</div>
			)}
			{!!initialData.icon && preview && <p className="text-6xl pt-6">{initialData.icon}</p>}
			<div className="opacity-0 group-hover/icon:opacity-100 flex items-center gap-x-1 py-4">
				{!initialData.icon && !preview && (
					<IconPicker onChange={onIconSelect} asChild>
						<Button className="text-muted-foreground text-xs" variant={"outline"} size={"sm"}>
							<Smile className="h-4 w-4 mr-2" />
							Add Icon
						</Button>
					</IconPicker>
				)}
				{!initialData.coverImage && !preview && (
					<Button
						className="text-muted-foreground text-xs"
						variant={"outline"}
						size={"sm"}
						onClick={() => {}}
					>
						<ImageIcon className="w-4 h-4 mr-2" />
						Add cover
					</Button>
				)}
			</div>
			{isEditing && !preview ? (
				<TextareaAutosize
					ref={inputRef}
					onBlur={disableInput}
					onKeyDown={onKeyDown}
					value={value}
					onChange={(e) => onInput(e.target.value)}
					className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
				/>
			) : (
				<div
					onClick={enableInput}
					className="pb-[11.5px] text-5xl font-bold break-words outline-none"
				>
					{initialData.title}
				</div>
			)}
		</div>
	);
}
