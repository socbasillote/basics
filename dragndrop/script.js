import { isInside, getClosestItem, animateFLIP } from "./functionss.js";

// ===== STATE =====
let draggedItem = null;
let columnRects = [];
let lastX = 0;
let lastY = 0;


// ===== POINTER DOWN =====
document.addEventListener("pointerdown", (e) => {
  if (!e.target.classList.contains("item")) return;

  document.body.classList.add("no-select");
  draggedItem = e.target;
  draggedItem.classList.add("dragging");

  draggedItem.setPointerCapture(e.pointerId);

  lastX = e.clientX;
  lastY = e.clientY;

  // cache column rects (performance)
  const columns = document.querySelectorAll(".column");
  columnRects = Array.from(columns).map(col => ({
    el: col,
    rect: col.getBoundingClientRect()
  }));
});

// ===== POINTER MOVE =====
document.addEventListener("pointermove", (e) => {
  if (!draggedItem) return;

  // STEP 1: capture FIRST positions
  const items = document.querySelectorAll(".item");
  const firstRects = new Map();

  // compute movement delta
const dx = e.clientX - lastX;
const dy = e.clientY - lastY;

// update last position
lastX = e.clientX;
lastY = e.clientY;

// compute rotation (tweak multiplier)
const rotate = dx * 0.1; // small tilt

draggedItem.style.transform = `scale(1.05) rotate(${rotate}deg)`;

  items.forEach(el => {
    firstRects.set(el, el.getBoundingClientRect());
  });

  let hoveredColumn = null;

  columnRects.forEach(({ el, rect }) => {
    if (isInside(e.clientX, e.clientY, rect)) {
      hoveredColumn = el;
    }

    el.classList.remove("active");
  });

  if (!hoveredColumn) return;

  hoveredColumn.classList.add("active");

  const closest = getClosestItem(hoveredColumn, e.clientY);

  if (closest) {
    hoveredColumn.insertBefore(draggedItem, closest);
  } else {
    hoveredColumn.appendChild(draggedItem);
  }

  // STEP 2: animate using FLIP
  animateFLIP(items, firstRects);
});

// ===== POINTER UP =====
document.addEventListener("pointerup", (e) => {
  if (!draggedItem) return;

  document.body.classList.remove("no-select");
  draggedItem.style.transform = ""; // reset tilt
  draggedItem.classList.remove("dragging");
  draggedItem.releasePointerCapture(e.pointerId);

  draggedItem = null;

  document.querySelectorAll(".column").forEach(col =>
    col.classList.remove("active")
  );
});

// ===== POINTER CANCEL =====
document.addEventListener("pointercancel", (e) => {
  if (!draggedItem) return;
document.body.classList.remove("no-select");
  draggedItem.classList.remove("dragging");
  draggedItem.releasePointerCapture(e.pointerId);
  draggedItem = null;
});