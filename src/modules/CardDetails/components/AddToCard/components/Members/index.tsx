import { uniq } from 'lodash';
import { withBoard, BoardGlobalProps } from '@/hocs';
import { useAddMembersToCardMutation } from '@/redux/services/card/member';
import MembersView from './view';

function Members({ cardId, onRefreshCard, onRefreshBoard }: BoardGlobalProps) {
  const [addMembers, { isLoading: isSaving }] = useAddMembersToCardMutation();

  const handleAddMember = (userIds: string[]) => {
    addMembers({
      userIds: uniq(userIds),
      cardId,
      onSuccess: () => {
        onRefreshCard();
        onRefreshBoard();
      },
    });
  };

  return <MembersView isSaving={isSaving} onAddMember={handleAddMember} />;
}

export default withBoard(Members);
