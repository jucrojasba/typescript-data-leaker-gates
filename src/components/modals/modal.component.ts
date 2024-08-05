import "./modal.component.css";
export function showModal(message: string) {
  //Page Content
  //Etiquetas HTML
  const $modalContainer = document.createElement("div") as HTMLDivElement;
  const $modalContent = document.createElement("div") as HTMLDivElement;
  const $modalMessage = document.createElement("div") as HTMLDivElement;
  const $closeButton = document.createElement("p") as HTMLParagraphElement;

  //Classes & IDs
  $modalContainer.classList.add("modal-container");
  $modalContent.classList.add("modal-content");
  $modalContainer.setAttribute("style", "display: none");
  $modalMessage.classList.add("modal-message");
  $closeButton.classList.add("close-button");

  //Contenido
  $closeButton.innerHTML = "&times";

  //Jerarquia de las etiquetas HTML
  const $root = document.getElementById("root") as HTMLElement;
  $root.appendChild($modalContainer);
  $modalContainer.appendChild($modalContent);
  $modalContent.appendChild($modalMessage);
  $modalContent.appendChild($closeButton);

  //Eveventos
  if ($modalContainer && $modalMessage && $closeButton) {
    $modalMessage.innerHTML = message;
    $modalContainer.style.display = "flex";

    $closeButton.onclick = () => {
      $modalContainer.style.display = "none";
    };

    window.onclick = (event) => {
      if (event.target === $modalContainer) {
        $modalContainer.style.display = "none";
      }
    };
  }
}
