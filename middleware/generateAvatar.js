const { createCanvas } = require('canvas');

function generateAvatar(username) {
    const firstLetter = username.charAt(0).toUpperCase();
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const canvas = createCanvas(200, 200)
    const context = canvas.getContext('2d');

    context.fillStyle = randomColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = 'bold 100px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#FFFFFF';
    context.fillText(firstLetter, canvas.width / 2, canvas.height / 2);
    return canvas.toDataURL();
}

module.exports = generateAvatar;