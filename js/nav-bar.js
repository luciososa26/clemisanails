class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.menuAbierto = false;
        this.render();
    }

    static get observedAttributes() {
        return ["color", "background", "height", "font"];
    }

    attributeChangedCallback() {
        this.render();
    }

    styles() {
        const color = this.getAttribute("color") || "black";
        const background = this.getAttribute("background") || "white";
        const height = this.getAttribute("height") || "50px";
        const font = this.getAttribute("font") || "Arial, Helvetica, sans-serif";

        return `
            header {
                background-color: ${background};
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 23px;
                font-family: ${font};
                flex-wrap: wrap;
                position: relative;
                height: ${height};
            }

            .Logo img {
                height: 50px;
            }

            .nav {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
            }

            .nav a {
                color: ${color};
                text-decoration: none;
                margin: 10px;
                font-weight: bold;
                transition: 0.3s;
            }

            .nav a:hover {
                text-decoration: underline;
            }

            .BotonConfig {
                margin-left: 15px;
                font-size: 24px;
                cursor: pointer;
                user-select: none;
                transition: transform 0.2s;
            }

            .BotonConfig:hover {
                transform: rotate(20deg);
            }

            .ConfigMenu {
                display: ${this.menuAbierto ? "block" : "none"};
                position: absolute;
                top: 70px;
                right: 20px;
                background: #fff;
                border: 1px solid #ccc;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                z-index: 100;
            }

            .ConfigMenu label {
                display: block;
                margin-top: 10px;
                font-weight: bold;
            }

            @media (max-width: 768px) {
                header {
                    flex-direction: column;
                    text-align: center;
                }

                .nav {
                    flex-direction: column;
                }

                .nav a {
                    margin: 8px 0;
                    font-size: 20px;
                }

                .Logo img {
                    margin-bottom: 10px;
                }
            }
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.styles()}</style>
            <header>
                <div class="Logo">
                    <img src="img/logo.png" alt="Logo">
                </div>
                <div class="nav">
                    <a href="index.html">Inicio</a>
                    <a href="servicios.html">Servicios</a>
                    <a href="nosotros.html">Nosotros</a>
                    <a href="contacto.html">Contacto</a>
                    <span class="BotonConfig" id="ConfigBot" title="Cambiar estilo">⚙️</span>
                </div>
                <div class="ConfigMenu" id="menuConfig">
                    <label>Color de Texto:</label>
                    <input type="color" id="colorTexto" value="${this.getAttribute("color") || "#000000"}">

                    <label>Color de Fondo:</label>
                    <input type="color" id="colorFondo" value="${this.getAttribute("background") || "#ffffff"}">

                    <label>Height del header (px):</label>
                    <input type="number" id="heightHeader" value="${parseInt(this.getAttribute("height")) || 50}">

                    <label>Fuente:</label>
                    <select id="SelectorFuente">
                        <option value="Arial, Helvetica, sans-serif">Arial</option>
                        <option value="'Amarieta'">Amarieta</option>
                        <option value="Verdana, Geneva, sans-serif">Verdana</option>
                        <option value="Georgia, serif">Georgia</option>
                    </select>
                </div>
            </header>
        `;

        this.addEventListeners();
    }

    addEventListeners() {
        const btn = this.shadowRoot.querySelector("#ConfigBot");
        const menu = this.shadowRoot.querySelector("#menuConfig");

        btn.addEventListener("click", () => {
            this.menuAbierto = !this.menuAbierto;
            this.render();
        });

        this.shadowRoot.querySelector("#colorTexto").addEventListener("input", (e) => {
            this.setAttribute("color", e.target.value);
        });

        this.shadowRoot.querySelector("#colorFondo").addEventListener("input", (e) => {
            this.setAttribute("background", e.target.value);
        });

        this.shadowRoot.querySelector("#heightHeader").addEventListener("input", (e) => {
            this.setAttribute("height", `${e.target.value}px`);
        });

        this.shadowRoot.querySelector("#SelectorFuente").addEventListener("change", (e) => {
            this.setAttribute("font", e.target.value);
        });
    }
}

customElements.define("nav-bar", NavBar);
