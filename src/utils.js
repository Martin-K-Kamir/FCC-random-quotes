export function animateOpacity(from, to, duration, setOpacity) {

    let start = null;
    let currentOpacity = from;
    const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        currentOpacity = from + progress * (to - from);
        setOpacity(currentOpacity);
        if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
}

export function getRandomColor() {
    const colors = [
        '#16a085',
        '#27ae60',
        '#2c3e50',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#fb6964',
        '#342224',
        '#472e32',
        '#bdbb99',
        '#77b1a9',
        '#73a857'
    ]

    return colors[Math.floor(Math.random() * colors.length)]
}

export const animateColor = (color, setColor) => {
    const {r: startR, g: startG, b: startB} = hexToRgb(color.prev);
    const {r: endR, g: endG, b: endB} = hexToRgb(color.cur);

    let alpha = 0;
    const step = 0.05;
    const interval = setInterval(() => {
        alpha += step;
        if (alpha >= 1) {
            clearInterval(interval);
            alpha = 1;
        }
        const currentColor = interpolateColor({r: startR, g: startG, b: startB}, {r: endR, g: endG, b: endB}, alpha);
        setColor(prevState => ({...prevState, use: `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`}))
    }, 50);
};

const hexToRgb = hex => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return {r, g, b};
};

const interpolateColor = (color1, color2, alpha) => {
    const r = Math.round((1 - alpha) * color1.r + alpha * color2.r);
    const g = Math.round((1 - alpha) * color1.g + alpha * color2.g);
    const b = Math.round((1 - alpha) * color1.b + alpha * color2.b);
    return {r, g, b};
};