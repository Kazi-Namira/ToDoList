let array = [
  "rgba(255, 211, 211, 0.52)",
  "rgba(255, 179, 179, 0.5)",
  "rgba(253, 161, 161, 0.5)",
  "white",
];
let index = 0;
function changecolor() {
  document.body.style.backgroundColor = array[index];
  index++;
  if (index >= array.length) {
    index = 0;
  }
}
