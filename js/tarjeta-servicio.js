class TarjetaServicio extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    static get observedAttributes() {
        return ['titulo', 'descripcion', 'imagen'];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const titulo = this.getAttribute('titulo') || '';
        const descripcion = this.getAttribute('descripcion') || '';
        const imagen = this.getAttribute('imagen') || '';

        this.shadowRoot.innerHTML = `
            <style>
                .TarjetaServicio {
                    width: 100%;
                    height: 500px;
                    position: relative;
                    background-size: cover;
                    background-position: center;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    transition: transform 0.3s ease;
                    background-image: url('${imagen}');
                }

                .TarjetaServicio:hover {
                    transform: scale(1.02);
                }

                .TextoServicio {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
                    color: white;
                    padding: 20px;
                    text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
                    font-family: Arial, Helvetica, sans-serif;
                }

                .TextoServicio h1 {
                    font-size: 28px;
                    margin: 0;
                }

                .TextoServicio h2 {
                    font-size: 14px;
                    margin-top: 10px;
                    font-weight: normal;
                    text-align: center;
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .TarjetaServicio {
                        height: 300px;
                        border-radius: 12px;
                    }

                    .TextoServicio {
                        padding: 15px;
                    }

                    .TextoServicio h1 {
                        font-size: 20px;
                    }

                    .TextoServicio h2 {
                        font-size: 12px;
                    }
                }
            </style>

            <div class="TarjetaServicio">
                <div class="TextoServicio">
                    <h1>${titulo}</h1>
                    <h2>${descripcion}</h2>
                </div>
            </div>
        `;
    }
}

customElements.define('tarjeta-servicio', TarjetaServicio);
