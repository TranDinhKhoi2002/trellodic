import EditCLNameView from './view';
import { useUpdateChecklistTitleMutation } from '@/redux/services/card/checklist';
import { withBoard, BoardGlobalProps } from '@/hocs';

type EditCLNameProps = BoardGlobalProps & {
  checklistId: string;
  currentName: string;
  onClose: () => void;
};

function EditCLName({ checklistId, boardId, cardId, onRefreshCard, ...rest }: EditCLNameProps) {
  const [updateChecklistTitle] = useUpdateChecklistTitleMutation();

  const handleEdit = (newName: string) => {
    updateChecklistTitle({
      checklistId,
      cardId: cardId,
      boardId: boardId,
      updatedTitle: newName,
      onSuccess: onRefreshCard,
    });
  };

  return <EditCLNameView {...rest} onEdit={handleEdit} />;
}

export default withBoard(EditCLName);
