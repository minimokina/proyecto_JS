fetch("./data/noticias.json")
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById("noticias");

    data.noticias.forEach(noticia => {
      const card = document.createElement("article");
      card.classList.add("noticia");

      card.innerHTML = `
        <img src="${noticia.imagen}" alt="${noticia.titulo}">
        <div class="noticia-content">
          <span class="categoria">${noticia.categoria}</span>
          <h3>${noticia.titulo}</h3>
          <p>${noticia.resumen}</p>
          <span class="fecha">${noticia.fecha}</span>
        </div>
      `;

      contenedor.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error cargando las noticias:", error);
  });
