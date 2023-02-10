const iconsInit = () => {
  let icons = document.querySelectorAll("[class^='icon-']");
  console.log(icons);
  icons.forEach(async (icon) => {
    let name = icon.classList[0].replace("icon-", "");
    let res = await fetch("/assets/icons/" + name + ".svg");
    let svg = await res.text();
    let domSvg = document.createElement("div");
    domSvg.innerHTML = svg;
    domSvg = domSvg.querySelector("svg");
    domSvg.setAttribute("width", icon.getAttribute("width"));
    domSvg.setAttribute("height", icon.getAttribute("height"));
    if (icon.getAttribute("fill"))
      domSvg.setAttribute("fill", icon.getAttribute("fill"));
    if (icon.getAttribute("stroke"))
      domSvg.setAttribute("stroke", icon.getAttribute("stroke"));
    icon.style.display = "inline-flex";
    icon.style.justifyContent = "center";
    icon.style.alignItems = "center";
    icon.appendChild(domSvg);
  });
};

export default iconsInit;
