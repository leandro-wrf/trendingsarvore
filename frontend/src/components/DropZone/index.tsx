
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaRegImage } from 'react-icons/fa';

import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
}

const DropZone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*"/>
      <FaRegImage size={32} color="#333333"/>
    </div>
  )
}

export default DropZone;