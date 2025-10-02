<div align="center">

# 🌍 Explorador de Países con API y Theme Switcher 🌗

**Solución al reto de Frontend Mentor para construir una aplicación interactiva que muestra datos de países obtenidos de una API y permite cambiar entre modo claro y oscuro.**

[![Estado del Despliegue](https://img.shields.io/website?up_message=En%20L%C3%ADnea&down_message=Ca%C3%ADdo&url=https%3A%2F%2Fsantnier92.github.io%2Fproyecto-paises%2F&style=for-the-badge)](https://santnier92.github.io/proyecto-paises/)

</div>

<div align="center">

[**🚀 Ver Demo en Vivo 🚀**](https://santnier92.github.io/proyecto-paises/)

</div>

<br>

<p align="center">
  <img src="https://i.imgur.com/2sR9s5L.gif" alt="Demostración animada del proyecto" width="80%">
</p>

---

## 📖 Sobre el Proyecto

Este proyecto fue desarrollado como parte de un desafío propuesto por [Frontend Mentor](https://www.frontendmentor.io). El objetivo era construir una aplicación web que se conectara con la API de REST Countries para mostrar información de diferentes naciones y permitir al usuario buscar, filtrar y ver detalles de cada una, todo con la capacidad de cambiar entre un tema claro y uno oscuro.

---

## ✨ Características Principales

* 🎨 **Cambiador de Tema:** Soporte completo para un modo claro y un modo oscuro.
* 🌍 **Visualización Global:** Muestra todos los países obtenidos desde la API en la página principal.
* 🔍 **Búsqueda en Tiempo Real:** Campo de búsqueda que filtra los países por nombre mientras el usuario escribe.
* 🗺️ **Filtro por Región:** Permite a los usuarios filtrar los países por continente.
* 📄 **Página de Detalles:** Al hacer clic en un país, se muestra una vista detallada con información adicional.
* 📱 **Diseño Responsivo:** La interfaz se adapta a diferentes tamaños de pantalla, desde móviles hasta escritorios.

---

## 🛠️ Tecnologías Utilizadas

* **`HTML5`**: Para la estructura y el contenido semántico.
* **`CSS3`**: Para el diseño y la estilización, usando Flexbox, Grid y Variables CSS para el manejo de temas.
* **`JavaScript (ES6+)`**: Para la lógica interactiva, consumo de API (`async/await`, `Fetch`) y manipulación del DOM.
* **`REST Countries API`**: Como la fuente de datos para toda la información.
* **`GitHub Pages`**: Para el despliegue y hosting de la aplicación.

---

## 🚀 Retos y Aprendizajes

Durante el desarrollo de este proyecto, se presentaron varios desafíos que fueron clave para el aprendizaje:

* **Consumo de APIs Asíncronas:** Se utilizó `async/await` con `Fetch` para manejar las peticiones a la API de forma limpia y ordenada, asegurando que la interfaz no se bloqueara mientras se esperaban los datos.
* **Manipulación Dinámica del DOM:** Toda la lista de países y las páginas de detalles son generadas dinámicamente con JavaScript, creando y añadiendo elementos al DOM a partir de los datos recibidos.
* **Gestión de Estado Simple:** Se utilizó `sessionStorage` para pasar información (el código del país seleccionado) entre la página principal y la página de detalles, manteniendo un estado simple sin necesidad de librerías complejas.
* **Depuración (Debugging):** Fue necesario un proceso intensivo de depuración utilizando las Herramientas de Desarrollador del navegador para resolver problemas como:
    * Errores de CORS y la necesidad de usar un servidor local (Live Server).
    * Problemas de caché del navegador que mostraban versiones antiguas del código.
    * Errores sutiles de sintaxis (`'` vs. `` ` `` en las plantillas literales).
* **Despliegue y CI/CD:** El proceso finalizó con el despliegue de la aplicación en GitHub Pages, poniendo en práctica un flujo de trabajo básico de integración y entrega continua.

---

## 🙏 Agradecimientos

* A **Frontend Mentor** por proponer desafíos tan completos y estimulantes.

---

## 📬 Contacto

**Santiago** - [santnier92](https://github.com/santnier92)
