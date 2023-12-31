import { BoardGlobalProps, withBoard } from '@/hocs';
import { useCreateCommentMutation } from '@/redux/services/card/comment';
import CommentEditorView from './view';

function CommentEditor({ boardId, cardId, onRefreshCard }: BoardGlobalProps) {
  const [addComment, { isLoading }] = useCreateCommentMutation();

  const handleSave = (content: string, onSaveSuccess: () => void) => {
    addComment({
      content,
      boardId,
      cardId,
      onSuccess: () => {
        onSaveSuccess();
        onRefreshCard();
      },
    });
  };

  return <CommentEditorView isLoading={isLoading} onSave={handleSave} />;
}

export default withBoard(CommentEditor);
