import './navigation.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    header {
      background-color: var(--accent);
      grid-column: 1 / -1;
    }

    header .social {
      text-align: right;
      padding: 10px 10px 0 0;
    }

    header img.github-badge {
      float: right;
      display: inline-block;
      padding: 10px;
      align-items: top;
      width: 90px;
      height: 20px;
    }
  </style>

  <header>
    <div>
      <a href="/">
        <img src="/www/assets/wcc-logo.jpg" alt="WCC logo" class="logo"/>
      </a>

      <a href="https://github.com/ProjectEvergreen/wcc" class="social">
        <img
          src="https://img.shields.io/github/stars/ProjectEvergreen/wcc.svg?style=social&logo=github&label=github"
          alt="WCC GitHub badge"
          class="github-badge"
        />
      </a>
    </div>

    <wcc-navigation></wcc-navigation>
  </header>
`;

class Header extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
}

export {
  Header
};

customElements.define('wcc-header', Header);