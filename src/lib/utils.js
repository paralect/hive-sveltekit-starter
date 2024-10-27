// Note: clsx and tailwind-merge functionality would need to be implemented separately
// or replaced with alternative logic in vanilla JS

export function cn(...inputs) {
  // This function would need a custom implementation to replace clsx and tailwind-merge
  // For now, we'll just return the inputs joined with a space
  return inputs.filter(Boolean).join(' ');
}

export const flyAndScale = (
  node,
  params = { y: -8, x: 0, start: 0.95, duration: 150 }
) => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;

  const scaleConversion = (
    valueA,
    scaleA,
    scaleB
  ) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  const styleToString = (style) => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + key + ":" + style[key] + ";";
    }, "");
  };

  // Note: This function doesn't have a direct equivalent in vanilla JS
  // as it's specifically for Svelte transitions.
  // Instead, we'll return an object with methods that could be used
  // to manually create an animation

  return {
    duration: params.duration ?? 200,
    delay: 0,
    animate: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

      const styleString = styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t,
      });

      Object.assign(node.style, styleString);
    },
    // Note: cubicOut easing function would need to be implemented
    // or replaced with a CSS easing function
  };
};

// Easing function (cubic out)
function cubicOut(t) {
  const f = t - 1.0;
  return f * f * f + 1.0;
}