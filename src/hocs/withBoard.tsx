import { ComponentType } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/store';

export default function withBoard<T>(Component: ComponentType<T>) {
  const WithBoardComponent = (props: Omit<T, 'boardId' | 'cardId' | 'onRefreshCard'>) => {
    const { boardId } = useParams();
    const searchParams = useSearchParams();
    const cardId = searchParams.get('cardId');
    const dispatch = useAppDispatch();

    const handleRefreshCard = () => {
      dispatch({
        type: `cardApi/invalidateTags`,
        payload: [{ type: 'Card', id: cardId }],
      });
    };

    return (
      <Component {...(props as T)} boardId={boardId.toString()} cardId={cardId!} onRefreshCard={handleRefreshCard} />
    );
  };

  return WithBoardComponent;
}