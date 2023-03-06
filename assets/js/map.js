const mapInit = () => {
  let mapMarks = document.querySelectorAll(".map [data-mark-number]");
  let mapPlaces = document.querySelectorAll("[data-place-number]");

  mapMarks.forEach((mark) => {
    mark.addEventListener("click", () => {
      resetMapPlaceActive();
      let markNumber = mark.getAttribute("data-mark-number");
      setActivePlace(markNumber);
    });
  });

  mapPlaces.forEach((place) => {
    place.addEventListener("click", () => {
      let placeNumber = place.getAttribute("data-place-number");
      setActivePlace(placeNumber);
    });
  });
};

const setActivePlace = (number) => {
  resetMapPlaceActive();
  let mapPlace = document.querySelector("[data-place-number='" + number + "']");
  let mapMark = document.querySelector("[data-mark-number='" + number + "']");
  mapPlace.classList.add("map-place-active");
  mapMark.classList.add("map-mark-active");
};

const resetMapPlaceActive = () => {
  let mapPlaces = document.querySelectorAll(
    ".map-place-active, .map-mark-active"
  );
  mapPlaces.forEach((place) => {
    place.classList.remove("map-place-active");
    place.classList.remove("map-mark-active");
  });
};
export default mapInit;
