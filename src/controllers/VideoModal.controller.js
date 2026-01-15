const btnOpenModal = document.querySelector(".youtube__button");
const closeModalBtn = document.querySelector(".modal__close__button");
const videoThumbnail = document.querySelector(".youtubeThumbnail");
const liteYoutube = document.querySelector("lite-youtube.latestVideoEmbed");

const initializeModal = (liteYoutube) => {
  const poster = liteYoutube.style.backgroundImage.slice(5, -2);
  poster ? videoThumbnail.style.backgroundImage = `url(${poster})` : "url('/img/portadaLIVE.png')";
  const dialog = document.querySelector(".youtube__modal__box");

  btnOpenModal.addEventListener("click", () => {
    dialog.setAttribute("open", "true");
    dialog.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
    dialog.removeAttribute("open");
    dialog.style.display = "none";
    const Video = liteYoutube.querySelector("iframe");
    if (Video) {
      Video.src = Video.src.split("?")[0];
    }
  });
};

export const loadVideo = () => {
  liteYoutube ? initializeModal(liteYoutube) : null
};
