import { loader } from "./components/loader/loader.component";
import { routes } from "./helpers/routes";
import { Routes } from "./models/routes.model";


export async function Router(): Promise<void> {
  const path: string = window.location.pathname;
  const publicRoute: Routes | undefined = routes.public.find(
    (r) => r.path === path
  );
  const privateRoute: Routes | undefined = routes.private.find(
    (r) => r.path === path
  );
  const token: string | null = sessionStorage.getItem("token");
  

  // Acceso a la ruta principal si no hay token
  if (path === "/" && !token) {
    navigateTo("/login");
    return;
  }

  // Si accede a la ruta principal o a una vista publica y hay token
  if ((path === "/"|| publicRoute) && token) {
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
    if (token) {
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
