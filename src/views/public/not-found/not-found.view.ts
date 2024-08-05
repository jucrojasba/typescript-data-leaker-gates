import { navigateTo } from "../../../router";
import "./not-found.view.css";

export function notFoundView(): void {
  //Elementos HTML
  const $root = document.getElementById("root") as HTMLElement;
  const $rootContainer = document.createElement("div") as HTMLDivElement;
  const $notFoundContainer = document.createElement("div") as HTMLDivElement;
  const $message = document.createElement("div") as HTMLDivElement;
  const $h1NotFound = document.createElement("h1") as HTMLHeadingElement;
  const $pNotFound = document.createElement("p") as HTMLParagraphElement;
  const $buttonNotFound = document.createElement("button") as HTMLButtonElement;

  //Classes & id CSS
  $message.classList.add("message");
  $notFoundContainer.classList.add("not-found-container");
  $rootContainer.classList.add("root-container-not-found");
  $buttonNotFound.setAttribute("id", "back-home");

  //Jerarquia de Etiquetas HTML
  $root.appendChild($rootContainer);
  $rootContainer.appendChild($notFoundContainer);
  $notFoundContainer.appendChild($message);
  $message.appendChild($h1NotFound);
  $message.appendChild($pNotFound);
  $message.appendChild($buttonNotFound);

  //Contenido HTML
  $h1NotFound.textContent = "404 Not Found";
  $pNotFound.textContent = "La página que busca no fue encontrada.";
  $buttonNotFound.textContent = "Back to Home";

  //Eventos
  $buttonNotFound?.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/");
  });
}
