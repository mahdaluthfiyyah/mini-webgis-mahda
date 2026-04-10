const map = document.getElementById("map");
const info = document.getElementById("info");
const counter = document.getElementById("counter");
const markerList = document.getElementById("markerList");
const btnRandom = document.getElementById("btnRandom");
const btnClear = document.getElementById("btnClear");
const btnToggle = document.getElementById("btnToggle");
const markerColorSelect = document.getElementById("markerColor");

let markers = [];
let layerVisible = true;
let markerId = 1;

class Marker {
  constructor(x, y, color, name) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.name = name;

    this.element = document.createElement("div");
    this.element.className = `marker ${color}`;
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;

    this.element.addEventListener("click", () => {
      this.showInfo();
    });
  }

  addTo(parent) {
    parent.appendChild(this.element);
  }

  showInfo() {
    info.textContent = `${this.name} | Color: ${this.color} | X: ${Math.round(this.x)}, Y: ${Math.round(this.y)}`;
  }

  remove() {
    this.element.remove();
  }

  setVisible(visible) {
    this.element.style.display = visible ? "block" : "none";
  }
}

function updateCounter() {
  counter.textContent = markers.length;
}

function updateMarkerList() {
  markerList.innerHTML = "";

  markers.forEach((marker) => {
    const li = document.createElement("li");
    li.textContent = `${marker.name} - ${marker.color} (${Math.round(marker.x)}, ${Math.round(marker.y)})`;
    markerList.appendChild(li);
  });
}

function addMarker(x, y, color) {
  const name = `Marker-${markerId++}`;
  const marker = new Marker(x, y, color, name);
  marker.addTo(map);
  markers.push(marker);
  updateCounter();
  updateMarkerList();
}

btnRandom.addEventListener("click", () => {
  const colors = ["red", "blue", "green"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const x = Math.random() * (map.clientWidth - 20) + 10;
  const y = Math.random() * (map.clientHeight - 20) + 10;
  addMarker(x, y, color);
});

btnClear.addEventListener("click", () => {
  markers.forEach((marker) => marker.remove());
  markers = [];
  info.textContent = "Semua marker sudah dihapus.";
  updateCounter();
  updateMarkerList();
});

btnToggle.addEventListener("click", () => {
  layerVisible = !layerVisible;
  markers.forEach((marker) => marker.setVisible(layerVisible));
  btnToggle.textContent = layerVisible ? "Hide Layer" : "Show Layer";
});

map.addEventListener("click", (event) => {
  if (event.target !== map) return;

  const rect = map.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const color = markerColorSelect.value;

  addMarker(x, y, color);
});