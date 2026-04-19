import { baseApi } from '../api/baseApi';

export interface LearningLogItem {
  id: number;
  category: string;
  content: string;
  date: string;
  created_at: string;
  updated_at: string;
}


export const learningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // The feed endpoint implements infinite scroll by manually merging previous cache pages
    // with new requests depending on the provided offset `skip`.
    getLearningLogs: builder.query<LearningLogItem[], { skip: number; limit: number }>({
      query: ({ skip, limit }) => `/v1/learning/?skip=${skip}&limit=${limit}`,
      
      // Cache merge logic for infinite scrolling
      // serializeQueryArgs forces all queries to share the exact same 'cache key' preventing separate caches
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Merge incoming paginated data into the existing cache chunk array
      // We use a Map to ensure unique items by ID, preventing duplicates on re-fetches
      merge: (currentCache, newItems, { arg }) => {
        // If we are fetching the first page (skip 0), it means we are resetting/refreshing
        // Clear the cache to remove any items that might have been deleted on the server
        if (arg.skip === 0) {
          currentCache.length = 0;
        }

        const itemMap = new Map(currentCache.map(item => [item.id, item]));
        newItems.forEach(item => itemMap.set(item.id, item));
        
        // Sort by date (desc) then by created_at (desc) to match backend order
        const merged = Array.from(itemMap.values()).sort((a, b) => {
          if (a.date !== b.date) return b.date.localeCompare(a.date);
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        
        currentCache.length = 0;
        currentCache.push(...merged);
      },
      // Refetch if the parameter signature moves forwards (triggering next page loads)
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.skip !== previousArg?.skip;
      },
      providesTags: ['LearningLog'],
    }),


    // Admin Mutations
    createLearningLog: builder.mutation<LearningLogItem, Partial<LearningLogItem>>({
      query: (body) => ({
        url: `/v1/learning/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['LearningLog'],
    }),
    updateLearningLog: builder.mutation<LearningLogItem, { id: number; body: Partial<LearningLogItem> }>({
      query: ({ id, body }) => ({
        url: `/v1/learning/${id}`,
        method: 'PUT',
        body,
      }),
      // We force a refetch because the feed cache relies on index tracking
      invalidatesTags: ['LearningLog'],
    }),
    deleteLearningLog: builder.mutation<void, number>({
      query: (id) => ({
        url: `/v1/learning/${id}`,
        method: 'DELETE',
      }),
      // THE PRO WAY: Surgical Cache Update
      // When the deletion starts, we manually update the 'getLearningLogs' cache 
      // to remove the item immediately without a full page refresh.
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          learningApi.util.updateQueryData('getLearningLogs', { skip: 0, limit: 10 }, (draft) => {
            // Because we use `serializeQueryArgs` focused on the endpoint name, 
            // the cache key is actually the endpoint name regardless of args.
            // However, RTK Query still needs a key.
            return draft.filter((item) => item.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      // We surgically remove the item above, so no need for background refetch
    }),
  }),
});

export const { 
  useGetLearningLogsQuery, 
  useCreateLearningLogMutation,
  useUpdateLearningLogMutation,
  useDeleteLearningLogMutation
} = learningApi;
