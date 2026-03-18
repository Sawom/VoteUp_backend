import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { PostRoutes } from '../modules/post/post.routes';
import { VoteRoutes } from '../modules/vote/vote.routes';

const router = Router();

const moduleRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/posts', route: PostRoutes },
  { path: '/votes', route: VoteRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;