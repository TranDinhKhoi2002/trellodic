import { useEffect, useRef } from 'react';
import Image from 'next/image';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Button, Typography } from '@/components/UIElements';
import ActionButton, { ActionButtonRef } from '@/components/ActionButton';
import PopoverWrapper from '../Popover';

type CoverViewProps = {
  image: string | ArrayBuffer | null | undefined;
  isUploading: boolean;
  isSaveSuccess: boolean;
  onUpload: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveCover: () => void;
};

function CoverView({ image, isUploading, isSaveSuccess, onUpload, onSaveCover }: CoverViewProps) {
  const ref = useRef<ActionButtonRef>(null);

  useEffect(() => {
    if (isSaveSuccess) ref.current?.handleClose();
  }, [isSaveSuccess]);

  const handleClose = () => {
    ref.current?.handleClose();
  };

  const renderImage = () => {
    if (!image) return;
    return (
      <>
        <Box sx={{ mt: 2, maxHeight: '200px', borderRadius: '4px', overflow: 'hidden' }}>
          <Image src={image as string} width={200} height={200} style={{ width: '100%' }} alt="Cover image" />
        </Box>
        <Box sx={{ textAlign: 'end', mt: 1 }}>
          <Button variant="contained" loading={isUploading} onClick={onSaveCover}>
            Save
          </Button>
        </Box>
      </>
    );
  };

  return (
    <ActionButton
      ref={ref}
      startIcon={<ImageOutlinedIcon />}
      renderPopover={() => (
        <PopoverWrapper title="Cover" onClose={handleClose}>
          <Typography sx={{ mt: 2 }}>Add a cover to your card</Typography>
          <Typography variant="caption" sx={{ color: '#95a5a6' }}>
            You can upload .png, .jpg, .jpeg, .webp files
          </Typography>

          <Button variant="contained" component="label" fullWidth startIcon={<FileUploadIcon />} sx={{ mt: 2 }}>
            Upload File
            <input type="file" accept=".png,.jpg,.jpeg,.webp" hidden onChange={onUpload} />
          </Button>
          {renderImage()}
        </PopoverWrapper>
      )}
    >
      Cover
    </ActionButton>
  );
}

export default CoverView;
