(() => {
  const correctPIN = '2580'; // PIN de ejemplo
  const dots = Array.from(document.querySelectorAll('.dot'));
  const keypad = document.getElementById('keypad');
  const status = document.getElementById('status');
  const allButtons = Array.from(keypad.querySelectorAll('button'));
  const numButtons = allButtons.filter(
    (b) => !['Borrar', 'OK'].includes(b.textContent.trim())
  );

  let buffer = '';

  // ---- UI helpers ----
  function render() {
    dots.forEach((d, i) => d.classList.toggle('filled', i < buffer.length));
  }

  function reset(msg = '') {
    buffer = '';
    render();
    status.textContent = msg;
    status.className = 'status';
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Muestra * cuando no hay hover
  function maskNumbers() {
    numButtons.forEach((btn) => (btn.textContent = '*'));
    keypad.classList.remove('revealed');
  }

  // Muestra los dígitos reales mientras hay hover
  function revealNumbers() {
    numButtons.forEach((btn) => (btn.textContent = btn.dataset.value));
    keypad.classList.add('revealed');
  }

  // Reparte nuevos dígitos a los botones (cambia de lugar los números)
  function shuffleNumbers() {
    const nums = shuffle([...Array(10).keys()]); // [0..9] mezclados
    numButtons.forEach((btn, i) => {
      btn.dataset.value = String(nums[i]);
      if (keypad.classList.contains('revealed')) {
        btn.textContent = btn.dataset.value; // si está visible, actualiza lo que se ve
      }
    });
  }

  // ---- Inicialización ----
  // Toma la numeración original (1..9,0) y la guarda como data-value
  numButtons.forEach((btn) => {
    btn.dataset.value = btn.textContent.trim();
  });
  // Arranca enmascarado
  maskNumbers();

  // Mostrar/ocultar números al entrar/salir con el mouse
  keypad.addEventListener('mouseenter', revealNumbers);
  keypad.addEventListener('mouseleave', maskNumbers);

  // ---- Interacción ----
  keypad.addEventListener('click', (e) => {
    const t = e.target;
    if (t.tagName !== 'BUTTON') return;

    const label = t.textContent.trim();

    if (label === 'Borrar') {
      buffer = buffer.slice(0, -1);
      render();
      return;
    }

    if (label === 'OK') {
      if (buffer.length !== 4) {
        status.textContent = 'PIN incompleto';
        return;
      }
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

    // Si es un botón numérico: usamos el valor real del data-attr (aunque se vea *)
    if (numButtons.includes(t) && buffer.length < 4) {
      const val = t.dataset.value;
      buffer += val;
      render();
      if (buffer.length === 4) status.textContent = 'Pulsa OK';

      // Después de cada clic numérico, remezcla posiciones
      shuffleNumbers();
    }
  });
})();
