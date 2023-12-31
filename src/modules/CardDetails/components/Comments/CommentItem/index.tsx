import { Comment } from '@/types/card.type';
import CommentItemView from './view';
import { BoardGlobalProps, withBoard } from '@/hocs';
import { useDeleteCommentMutation, useEditCommentMutation } from '@/redux/services/card/comment';

type CommentItemProps = BoardGlobalProps & {
  comment: Comment;
};

function CommentItem({ comment, boardId, cardId, onRefreshCard }: CommentItemProps) {
  const [editComment, { isLoading }] = useEditCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const handleEdit = (commentId: string, content: string, onEditSuccess: () => void) => {
    editComment({
      content,
      commentId,
      boardId,
      cardId,
      onSuccess: () => {
        onEditSuccess();
        onRefreshCard();
      },
    });
  };

  const handleDelete = (commentId: string) => {
    deleteComment({
      commentId,
      boardId,
      cardId,
      onSuccess: onRefreshCard,
    });
  };

  return <CommentItemView comment={comment} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />;
}

export default withBoard(CommentItem);
