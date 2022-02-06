import { createRouter, createWebHashHistory } from "vue-router";
import AllUsers from "../components/AllUsers";
import FavoriteUsers from "../components/FavoriteUsers";

const routes = [
  {
    path: "/",
    component: AllUsers,
  },
  {
    path: "/favorite-users",
    component: FavoriteUsers,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
