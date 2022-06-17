import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { useRef } from "react";

const Input = styled("input")({
  display: "none",
});

const ImageUploader = ({ onFileSelect }) => {
  const fileInput = useRef(null);
  const handleFileInput = (e) => {
    onFileSelect(e.target.files[0]);
  };
  return (
    <Stack direction="row" alignItems="center" spacing={12}>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleFileInput}
        />
        <IconButton
          size="large"
          color="error"
          aria-label="upload picture"
          component="span"
          //   onClick={(e) => {
          //     fileInput.current && fileInput.current.click();
          //   }}
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleFileInput}
        />
        <IconButton
          size="large"
          color="error"
          aria-label="upload picture"
          component="span"
          //   onClick={(e) => {
          //     fileInput.current && fileInput.current.click();
          //   }}
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleFileInput}
        />
        <IconButton
          size="large"
          color="error"
          aria-label="upload picture"
          component="span"
          onClick={(e) => {
            fileInput.current && fileInput.current.click();
          }}
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleFileInput}
        />
        <IconButton
          size="large"
          color="error"
          aria-label="upload picture"
          component="span"
          onClick={(e) => {
            fileInput.current && fileInput.current.click();
          }}
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </Stack>
  );
};

export default ImageUploader;
