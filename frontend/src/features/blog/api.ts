import { baseApi } from '../api/baseApi';
import type { BlogItem, BlogPaginatedResponse } from '../../types/blog';
export type { BlogItem, BlogPaginatedResponse };

// We inject our endpoints into the main Redux Store BaseAPI. 
// This automatically provides us with pre-typed `useGetBlogsQuery` hooks!
export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/v1/blogs
    getBlogs: builder.query<BlogPaginatedResponse, { page?: number; size?: number }>({
      query: (arg) => {
        const { page = 1, size = 10 } = arg;
        return {
          url: `/v1/blogs/?page=${page}&size=${size}`,
        };
      },
      // When we create/edit a blog, 'Blog' tags are invalidated, causing this list to magically re-fetch
      providesTags: ['Blog'],
    }),

    // GET /api/v1/blogs/{slug}
    getBlogBySlug: builder.query<BlogItem, string>({
      query: (slug) => `/v1/blogs/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: 'Blog', id: slug }],
    }),

    // Admin Mutations
    createBlog: builder.mutation<BlogItem, Partial<BlogItem>>({
      query: (body) => ({
        url: `/v1/blogs/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation<BlogItem, { slug: string; body: Partial<BlogItem> }>({
      query: ({ slug, body }) => ({
        url: `/v1/blogs/${slug}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { slug }) => ['Blog', { type: 'Blog' as const, id: slug }],
    }),
    deleteBlog: builder.mutation<void, string>({
      query: (slug) => ({
        url: `/v1/blogs/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

// Auto-generated hooks based off the Endpoints above!
export const { 
  useGetBlogsQuery, 
  useGetBlogBySlugQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation
} = blogApi;
