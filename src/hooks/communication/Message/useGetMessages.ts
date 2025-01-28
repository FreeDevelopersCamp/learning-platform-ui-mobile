import { useQuery } from '@tanstack/react-query';
import { Message } from '../Message';

export function useGetMessages(id1: string, id2: string) {
  return useQuery(
    ['messages', id1, id2],
    () => new Message().getMessages(id1, id2),
    {
      enabled: !!id1 && !!id2,
    },
  );
}
