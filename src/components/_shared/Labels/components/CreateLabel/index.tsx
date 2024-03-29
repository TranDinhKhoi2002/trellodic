import { useState } from 'react';
import CreateLabelView from './view';
import { withBoard, BoardGlobalProps } from '@/hocs';
import { useAddLabelMutation } from '@/redux/services/board/label';

type CreateLabelProps = BoardGlobalProps & {
  onCreateSuccess: () => void;
};

function CreateLabel({ boardId, cardId, onRefreshBoard, onRefreshCard, onCreateSuccess }: CreateLabelProps) {
  const [selectedColor, setSelectedColor] = useState('');
  const [createLabel, { isLoading }] = useAddLabelMutation();

  const handleCreateLabel = async (title: string, color: string) => {
    createLabel({
      title,
      color,
      boardId,
      cardId,
      onSuccess: () => {
        onCreateSuccess();
        onRefreshBoard();
        if (cardId) onRefreshCard();
      },
    });
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <CreateLabelView
      selectedColor={selectedColor}
      isPending={isLoading}
      onSelectColorChange={handleSelectColor}
      onCreate={handleCreateLabel}
    />
  );
}

export default withBoard(CreateLabel);
