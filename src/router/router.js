import { createRouter, createWebHashHistory } from "vue-router";
import AllUsers from "../components/AllUsers";
import ChoosenUsers from "../components/ChoosenUsers";

const routes = [
  {
    path: "/",
    component: AllUsers,
  },
  {
    path: "/choosen-users",
    component: ChoosenUsers,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
