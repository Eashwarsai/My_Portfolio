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
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
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
      invalidatesTags: ['LearningLog'],
    }),
  }),
});

export const { 
  useGetLearningLogsQuery, 
  useCreateLearningLogMutation,
  useUpdateLearningLogMutation,
  useDeleteLearningLogMutation
} = learningApi;
