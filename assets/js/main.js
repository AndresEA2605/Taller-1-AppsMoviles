document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelectorAll('#results li');
  list.forEach(li => {
    li.addEventListener('click', () => {
      const link = li.getAttribute('data-link');
      if (link) location.href = link;
    });
  });
});