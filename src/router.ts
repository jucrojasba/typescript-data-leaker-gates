import { loader } from "./components/loader/loader.component";
import { UserController } from "./controllers/user.controller";
import { routes } from "./helpers/routes";
import { Routes } from "./models/routes.model";
import { RequestAuth } from "./models/user.model";

export async function Router(): Promise<void> {
  const path: string = window.location.pathname;
  const publicRoute: Routes | undefined = routes.public.find(
    (r) => r.path === path
  );
  const privateRoute: Routes | undefined = routes.private.find(
    (r) => r.path === path
  );
  const token: string | null = sessionStorage.getItem("token");
  const email: string | null = sessionStorage.getItem("email");
  const password: string = "*****";
  const data: RequestAuth = {
    email,
    password,
  };

  // Instanciar User para acceder al método check authentication
  const user = new UserController("/login");

  // Probar token
  const responseCheckToken = token ? await user.checkToken(token, data) : false;

  // Acceso a la ruta principal si no hay token
  if (path === "/" && !token) {
    navigateTo("/login");
    return;
  }

  // Si accede a la ruta principal o a una vista publica y hay token
  if ((path === "/"|| publicRoute) && responseCheckToken) {
    navigateTo("/home");
    return;
  }

  // Manejo de rutas públicas
  if (publicRoute && !token) {
    publicRoute.view();
    return;
  }

  // Manejo de rutas privadas
  if (privateRoute) {
    if (responseCheckToken) {
      privateRoute.view();
      return;
    } else {
      navigateTo("/login");
      return;
    }
  }

  // Not Found View
  if ((!publicRoute || !privateRoute) && path !== "/") {
    navigateTo("/not-found");
    return;
  }
}

export function navigateTo(path: string): void {
  window.history.pushState({}, "", window.location.origin + path);
  loader(true);
  Router();
  loader(false);
}

window.addEventListener("popstate", Router);
