const md = window.markdownit();

const sections = {
  bookshelf: () => `
    <h2>Bookshelf</h2>
    <p>Books I've read, am reading, and want to read.</p>
  `,
  about: () => `
    <h2>About me</h2>
    <p>Hi, I'm Shervil Gupta. More about me coming soon.</p>
  `,
  bytes: renderBytes,
};

const defaultSection = 'bytes';
const content = document.getElementById('content');
const navLinks = document.querySelectorAll('.site-nav a');
let renderId = 0;

async function loadPosts() {
  const res = await fetch('blogs/index.json');
  if (!res.ok) throw new Error(`Failed to load post list (${res.status})`);
  return res.json();
}

const slugOf = (post) => post.file.replace(/\.md$/, '');

async function renderBytes(slug) {
  const posts = await loadPosts();

  if (slug) {
    const post = posts.find((p) => slugOf(p) === slug);
    if (post) {
      const res = await fetch(`blogs/${post.file}`);
      if (!res.ok) throw new Error(`Failed to load post (${res.status})`);
      return `
        <p><a href="#bytes">&larr; All bytes</a></p>
        <article>${md.render(await res.text())}</article>
      `;
    }
  }

  const items = posts
    .map((p) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#bytes/${slugOf(p)}`;
      a.textContent = p.title;
      const time = document.createElement('time');
      time.textContent = p.date;
      li.append(a, ' ', time);
      return li.outerHTML;
    })
    .join('');

  return `<h2>Bytes</h2><ul class="post-list">${items}</ul>`;
}

async function render() {
  const [name, slug] = location.hash.slice(1).split('/');
  const key = name in sections ? name : defaultSection;
  const id = ++renderId;

  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${key}`;
    link.classList.toggle('active', active);
    if (active) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  try {
    const html = await sections[key](slug);
    if (id === renderId) content.innerHTML = html;
  } catch (err) {
    if (id === renderId) content.textContent = err.message;
  }
}

window.addEventListener('hashchange', render);
render();
