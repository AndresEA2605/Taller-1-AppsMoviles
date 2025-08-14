document.addEventListener('input', (e) => {
  const ta = document.getElementById('msg');
  const count = document.getElementById('count');
  const prog = document.getElementById('prog');
  const len = ta.value.length;
  count.textContent = len;
  prog.value = len;
});