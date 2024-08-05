import { Routes } from "../models/routes.model";
import { homeView } from "../views/private/home/home.view";
import { loginView } from "../views/public/login/login.view";
import { notFoundView } from "../views/public/not-found/not-found.view";
import { registerView } from "../views/public/register/register.view";

export const routes: Record<string, Array<Routes>> = {
  public: [
    { path: "/not-found", view: notFoundView },
    { path: "/login", view: loginView },
    { path: "/register", view: registerView },
  ],
  private: [{ path: "/home", view: homeView }],
};
