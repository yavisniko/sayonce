import { createTRPCRouter } from "@/server/api/trpc";
import { gif } from "./routers/query/gif";
import { authUser } from "./routers/mutation/authUser";
import { createPost } from "./routers/mutation/createPost";
import { posts } from "./routers/query/posts";
import { postById } from "./routers/query/postById";
import { isPosted } from "./routers/query/isPosted";

export const appRouter = createTRPCRouter({
  gif: gif(),
  authUser: authUser(),
  createPost: createPost(),
  posts: posts(),
  postById: postById(),
  isPosted: isPosted()
});

// export type definition of API
export type AppRouter = typeof appRouter;
