/**
 * post/[id]/page.tsx
 **/

export type PostHeroSectionProps = {
  data: {
    title: string;
    firstName: string;
    mediaUrl: string;
    mediaType: string;
  };
};

export type PostBodySectionProps = {
  data: {
    description: string;
  };
};

export type PostZapSectionProps = {
  data: {
    userId: string;
  };
};

/**
 *
 *
 */
export type Post = {
  id: string;
  firstName: string;
  title: string;
  description: string;
  likes: string;
  comments: string;
  publishDate: string;
  avatarUrl: string;
  mediaUrl: string;
  mediaType: string;
  zapCount: string;
};

export type PostsGridSectionProps = {
  posts: Post[];
};

export type PostHeaderType = {
  title?: string;
  description?: string;
  mediaUrl?: string;
  mediaType?: string;
};

export type PostContentType = {
  id?: string;
  description?: string;
  firstName?: string;
  avatarUrl?: string;
};

export type PostFooterType = {
  likes?: string;
  comments?: string;
  zapCount?: string;
  publishDate: string;
};

export type ContentPostCardProps = {
  post: PostHeaderType & PostContentType & PostFooterType;
};
