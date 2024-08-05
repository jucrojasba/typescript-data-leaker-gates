import { loader } from "../../../components/loader/loader.component";
import { showModal } from "../../../components/modals/modal.component";
import { UserController } from "../../../controllers/user.controller";
import { RequestAuth } from "../../../models/user.model";
import { navigateTo } from "../../../router";
import "./login.view.css";

export function loginView(): void {
  //Elementos HTML
  const $root = document.getElementById("root") as HTMLElement;
  $root.innerHTML = "";
  const $rootContainerLogin = document.createElement("div") as HTMLDivElement;
  const $formLogin = document.createElement("form") as HTMLFormElement;
  const $h1Login = document.createElement("h1") as HTMLHeadingElement;
  const $pWelcome = document.createElement("p") as HTMLParagraphElement;
  const $inputEmail = document.createElement("input") as HTMLInputElement;
  const $inputPassword = document.createElement("input") as HTMLInputElement;
  const $actionButtons = document.createElement("div") as HTMLDivElement;
  const $buttonLogin = document.createElement("button") as HTMLButtonElement;
  const $buttonRegister = document.createElement("button") as HTMLButtonElement;

  //Classes && IDs
  $rootContainerLogin.classList.add("root-container-login");
  $formLogin.classList.add("form-login");
  $inputEmail.setAttribute("type", "email");
  $inputEmail.setAttribute("placeholder", "Enter your email");
  $inputPassword.setAttribute("type", "password");
  $inputPassword.setAttribute("placeholder", "Enter your password");
  $actionButtons.classList.add("action-buttons");
  $buttonLogin.setAttribute("id", "login-button");
  $buttonLogin.setAttribute("type", "submit");
  $buttonRegister.setAttribute("id", "register-button");
  $pWelcome.setAttribute("id","welcome-paragraph");

  //Jerarquia de Etiquetas HTML
  $root.appendChild($rootContainerLogin);
  $rootContainerLogin.appendChild($formLogin);
  $formLogin.appendChild($h1Login);
  $formLogin.appendChild($pWelcome);
  $formLogin.appendChild($inputEmail);
  $formLogin.appendChild($inputPassword);
  $formLogin.appendChild($actionButtons);
  $actionButtons.appendChild($buttonLogin);
  $actionButtons.appendChild($buttonRegister);

  //Contenido
  $h1Login.textContent = "Login";
  $buttonLogin.textContent = "Login";
  $buttonRegister.textContent = "Register";
  $pWelcome.textContent = "Data Leaker Gates, we check it for you!";

  //Instanciar Usuario
  const userLogin = new UserController("/auth/login");

  //Eventos
  //Logica para login
  $formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    if ($inputEmail.value && $inputPassword.value) {
      const dataToLogin: RequestAuth = {
        email: $inputEmail.value,
        password: $inputPassword.value,
      };
      try {
        loader(true);
        const responseLogin = await userLogin.postLogin(dataToLogin);
        sessionStorage.setItem("token", responseLogin.message);
        loader(false);
        navigateTo("/home");
      } catch (error) {
        loader(false);
        showModal(`${error}`);
      }
    } else {
      showModal("Please fill all the fields");
      return;
    }
  });

  //Evento para navegar a register
  $buttonRegister.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/register");
  });
}
