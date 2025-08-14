(() => {
  const correctPIN = '2580'; // PIN de ejemplo
  const dots = Array.from(document.querySelectorAll('.dot'));
  const keypad = document.getElementById('keypad');
  const status = document.getElementById('status');
  let buffer = '';

  function render() {
    dots.forEach((d, i) => d.classList.toggle('filled', i < buffer.length));
  }

  function reset(msg = '') {
    buffer = '';
    render();
    status.textContent = msg;
  }

  keypad.addEventListener('click', (e) => {
    const t = e.target;
    if (t.tagName !== 'BUTTON') return;
    const val = t.textContent.trim();

    if (val === 'Borrar') {
      buffer = buffer.slice(0, -1);
      render();
      return;
    }
    if (val === 'OK') {
      if (buffer.length !== 4) { status.textContent = 'PIN incompleto'; return; }
      if (buffer === correctPIN) {
        status.textContent = 'Acceso concedido';
        status.className = 'status success';
      } else {
        status.textContent = 'PIN incorrecto';
        status.className = 'status error';
        setTimeout(() => reset(), 700);
      }
      return;
    }
    if (/\d/.test(val) && buffer.length < 4) {
      buffer += val;
      render();
      if (buffer.length === 4) status.textContent = 'Pulsa OK';
    }
  });
})();