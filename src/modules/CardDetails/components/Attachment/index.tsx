import { useDeleteAttachmentMutation } from '@/redux/services/card/attachment';
import AttachmentView from './view';

function Attachment() {
  const [deleteAttachment] = useDeleteAttachmentMutation();

  const handleDelete = (params: string[], onSuccess: () => void) => {
    const [attachmentId, cardId] = params;
    deleteAttachment({
      attachmentId,
      cardId,
      onSuccess,
    });
  };

  return <AttachmentView onDelete={handleDelete} />;
}

export default Attachment;
