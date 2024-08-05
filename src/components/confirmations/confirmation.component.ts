import "./confirmation.component.css";

export function showConfirmation(message: string): Promise<boolean> {
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

  // Return a Promise
  return new Promise<boolean>((resolve) => {
    if ($modalContainer && $modalMessage && $closeButton) {
      $modalMessage.innerHTML = `
      <p>${message}</p>
      <div class='action-buttons-confirm'>
      <button id='yes'>Yes</button>
      <button id='no'>No</button>
      </div>
      `;
      const $yesButton = document.getElementById("yes") as HTMLButtonElement;
      const $noButton = document.getElementById("no") as HTMLButtonElement;

      $modalContainer.style.display = "flex";

      $yesButton.onclick = () => {
        $modalContainer.style.display = "none";
        resolve(true);
      };

      $noButton.onclick = () => {
        $modalContainer.style.display = "none";
        resolve(false);
      };

      $closeButton.onclick = () => {
        $modalContainer.style.display = "none";
        resolve(false);
      };

      window.onclick = (event) => {
        if (event.target === $modalContainer) {
          $modalContainer.style.display = "none";
          resolve(false);
        }
      };
    }
  });
}
