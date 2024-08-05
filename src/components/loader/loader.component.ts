import "./loader.component.css";

export function loader(show: boolean) {
  const loaderHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;

  function injectLoader() {
    const $root = document.getElementById("root") as HTMLElement;
    $root.insertAdjacentHTML("beforeend", loaderHTML);
  }

  function removeLoader() {
    const $loaderContainer = document.querySelector(".loader-container");
    if ($loaderContainer) {
      $loaderContainer.remove();
    }
  }

  if (show) {
    injectLoader();
  } else {
    removeLoader();
  }
}
