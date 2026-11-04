const sections = {
  bookshelf: `
    <h2>Bookshelf</h2>
    <p>Books I've read, am reading, and want to read.</p>
  `,
  bytes: `
    <h2>Bytes</h2>
    <p>Short posts and notes. Nothing here yet.</p>
  `,
  about: `
    <h2>About me</h2>
    <p>Hi, I'm Shervil Gupta. More about me coming soon.</p>
  `,
};

const defaultSection = 'bytes';
const content = document.getElementById('content');
const navLinks = document.querySelectorAll('.site-nav a');

function render() {
  const name = location.hash.slice(1);
  const key = name in sections ? name : defaultSection;

  content.innerHTML = sections[key];
  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${key}`;
    link.classList.toggle('active', active);
    if (active) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

window.addEventListener('hashchange', render);
render();
