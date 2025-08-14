document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('play');
  const scene = document.getElementById('scene');
  const beep = document.getElementById('beep');

  btn.addEventListener('click', async () => {
    scene.classList.add('run');
    try {
      await beep.play();
    } catch (e) {
      // Autoplay blocked; show gentle hint
      btn.textContent = 'Toca para reproducir 🔊';
    }
    // Revert after a while for replay
    setTimeout(() => scene.classList.remove('run'), 2500);
  });
});