import React, {useImperativeHandle, useState } from "react";
import { Box, Chip, InputAdornment, TextField, Tooltip } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { FieldErrors } from "react-hook-form";
import { TaskSchema } from "@/schemas/taskSchema";
import { LoginErrorTypography } from "../layout/login/loginForm";
import CreateTagModal from "../layout/tag/createTagModal";
import { useTagStore } from "@/stores/useTagStore";
import { Tag } from "@/types/tagType";

interface TagProps {
	errors: FieldErrors<TaskSchema>
	ref?: React.Ref<TagRef>;
}

interface TagRef {
  reset: () => void;
}

const TagComponent = ({errors, ref}: TagProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const tags = useTagStore((state) => state.tags)

	console.log(selectedTags)

	const [openModal, setOpenModal] = useState<boolean>(false)

	useImperativeHandle(ref, () => ({
    reset: () => setSelectedTags([]),
  }));

	const handleToggle = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.some((t) => t.id === tag.id)
        ? prev.filter((t) => t.id !== tag.id)
        : [...prev, tag]
    );
  };

  return (
		<>
			<TextField
				label="Tags"
				variant="outlined"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Box
								sx={{
									display: "flex",
									gap: 1,
									mt: 0.5,
									alignItems: "center",
								}}
							>
								{tags.map((tag) => {
        					const isSelected = selectedTags.some((t) => t.id === tag.id);
									return (
										<Chip
											key={tag.id}
											label={tag.name}
											onClick={() => handleToggle(tag)}
											variant={isSelected ? "filled" : "outlined"}
											sx={{
												cursor: "pointer",
												borderColor: tag.color,
												color: isSelected ? "#fff" : tag.color,
												backgroundColor: isSelected ? tag.color : "transparent",
												fontWeight: 500,
												transition: "all 0.2s ease",
												"&:hover": {
													backgroundColor: isSelected ? tag.color : `${tag.color}20`
												},
											}}
										/>
									);
								})}
								<Tooltip title="Criar nova tag" arrow>
									<AddCircleOutlinedIcon
										sx={{ color: "#925FE2", fontSize: 28, cursor: "pointer" }}
										onClick={() => setOpenModal(true)} 
									/>
								</Tooltip>
							</Box>
						</InputAdornment>
					),
					readOnly: true,
				}}
				/>
			{errors["tags"] && (
				<LoginErrorTypography sx={{marginTop:'-20px'}}>
					{errors["tags"]?.message}
				</LoginErrorTypography>
			)}

			<CreateTagModal 
				open={openModal} 
				onClose={() => setOpenModal(false)} 
				onCreate={(name, color) => {
				}} 
			/>
		</>

  );
};

export default TagComponent;
