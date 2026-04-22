export function clamp(min, max, value) {
    return Math.max(min, Math.min(max, value));
}

export function isInside(x, y, rect) {
  return (
    x >= rect.left &&
    x <= rect.right &&
    y >= rect.top &&
    y <= rect.bottom
  );
}
export function getClosestItem(container, y) {
  const items = [...container.querySelectorAll(".item:not(.dragging)")];

  let closest = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const offset = y - (rect.top + rect.height / 2);

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closest = item;
    }
  });

  return closest;
}

export function animateFLIP(elements, firstRects) {
  elements.forEach(el => {
    const last = el.getBoundingClientRect();
    const first = firstRects.get(el);

    if (!first) return;

    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;

    // INVERT
    el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // FORCE reflow (important)
    el.getBoundingClientRect();

    // PLAY
    el.style.transform = "";
  });
}