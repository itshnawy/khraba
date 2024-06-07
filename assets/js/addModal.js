function close(elm, elm2, anielm) {
  const modalClosing = [
    { transform: "scale(1)" },
    { transform: "scale(0)" },
  ];

  const modalClosingTiming = {
    duration: 210,
    iterations: 1,
  };

  var animation = anielm.animate(modalClosing, modalClosingTiming);

  animation.onfinish = function() {
    document.body.style.overflow = "auto";
    elm.remove();
    elm2.remove();
  }
}

document.getElementById("addcity").addEventListener("click", () => {
  let ov = document.createElement("div");
  let modal = document.createElement("div"); modal.id = "modal";
  let BGTL = "#0f0f0f";
  ov.id = "overlay";
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("addModal");
  modalContainer.style.backgroundColor = BGTL;

  // Modal Content
  modalContainer.innerHTML = `
        <button id="close-btn" title="Close Button" style="color:#fff">&times;</button>
        <div class="header" style="color:#fff"><h1>ضيف موعد القطع</h1></div>
        <iframe src="./add.html" frameborder="0"></iframe>
        `;

  modal.append(modalContainer)
  // modal opening animation
  const modalOpening = [{ transform: "scale(0)" }, { transform: "scale(1)" },];
  const modalOpeningTiming = { duration: 210, iterations: 1, };
  // append on the position
  document.body.appendChild(ov)
  document.body.appendChild(modal);
  modalContainer.animate(modalOpening, modalOpeningTiming)
  document.body.style.overflow = "hidden";


  // closing
  const closeButton = modalContainer.querySelector("#close-btn");
  closeButton.addEventListener("click", () => close(ov, modal, modalContainer))
  ov.addEventListener('click', () => close(ov, modal, modalContainer))
})
