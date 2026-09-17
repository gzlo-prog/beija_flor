// Lista de productos - Beija Flor Variedades
// Con fotos reales

var productos = [
  // LIBRERIA
  { id: 1, nombre: "Lápices negros Pizzini (x12)", categoria: "libreria", precio: 4500, emoji: "✏️", img: "img/lapices.jpg", agotado: false },
  { id: 2, nombre: "Compás escolar Pizzini", categoria: "libreria", precio: 3500, emoji: "📐", img: "img/compas-colores.jpg", agotado: false },
  { id: 3, nombre: "Compás Pizzini 140 mm", categoria: "libreria", precio: 8500, emoji: "📏", img: "img/compas.jpg", agotado: false },
  { id: 4, nombre: "Goma de borrar multiuso", categoria: "libreria", precio: 800, emoji: "🧼", img: "img/gomas.jpg", agotado: false },
  { id: 5, nombre: "Goma de borrar tinta", categoria: "libreria", precio: 1200, emoji: "🧽", img: "img/gomas.jpg", agotado: false },
  { id: 6, nombre: "Cola vinílica / Plastivinil", categoria: "libreria", precio: 2500, emoji: "🧴", img: "img/colas.jpg", agotado: false },
  { id: 7, nombre: "Silicona líquida 250 ml", categoria: "libreria", precio: 4500, emoji: "💧", img: "img/silicona.jpg", agotado: false },
  { id: 8, nombre: "Voligoma / Pegamento", categoria: "libreria", precio: 1800, emoji: "📎", img: "img/colas.jpg", agotado: false },
  { id: 9, nombre: "Rollo PVC adhesivo", categoria: "libreria", precio: 5500, emoji: "📜", img: "img/pvc.jpg", agotado: false },
  { id: 10, nombre: "Goma eva con glitter", categoria: "libreria", precio: 2000, emoji: "✨", img: "img/gomaeva.jpg", agotado: false },
  { id: 11, nombre: "Papel crepé", categoria: "libreria", precio: 1500, emoji: "🎨", img: "img/papel-crepe.jpg", agotado: false },
  { id: 12, nombre: "Papel técnico Pizzini", categoria: "libreria", precio: 6000, emoji: "📄", img: "img/lapices.jpg", agotado: false },
  { id: 13, nombre: "Hojas de dibujo x8", categoria: "libreria", precio: 3500, emoji: "🖼️", img: "img/gomaeva.jpg", agotado: false },
  { id: 14, nombre: "Carpeta Art Flowers", categoria: "libreria", precio: 7500, emoji: "📁", img: "img/carpeta.jpg", agotado: false },
  { id: 15, nombre: "Cuaderno Avon", categoria: "libreria", precio: 5500, emoji: "📓", img: "img/cuaderno1.jpg", agotado: false },
  { id: 16, nombre: "Cartuchera", categoria: "libreria", precio: 6500, emoji: "🖊️", img: "img/cartuchera.jpg", agotado: false },
  { id: 17, nombre: "Tabla periódica", categoria: "libreria", precio: 2500, emoji: "🧪", img: "img/tabla.jpg", agotado: false },

  // COSMETICOS
  { id: 20, nombre: "Kaiak Desodorante spray 100ml", categoria: "cosmeticos", precio: 12000, emoji: "💨", img: "img/kaiak.jpg", agotado: false },
  { id: 21, nombre: "Kaiak Roll-on 75ml", categoria: "cosmeticos", precio: 8500, emoji: "🧴", img: "img/kaiak-azul.jpg", agotado: false },
  { id: 22, nombre: "Kaiak Aventura Roll-on", categoria: "cosmeticos", precio: 9000, emoji: "🌲", img: "img/kaiak-aventura.jpg", agotado: false },
  { id: 23, nombre: "Homem Desodorante roll-on", categoria: "cosmeticos", precio: 9500, emoji: "🧔", img: "img/homem.jpg", agotado: false },
  { id: 24, nombre: "Tododia Body Splash Cereza", categoria: "cosmeticos", precio: 15000, emoji: "🍒", img: "img/tododia-splash.jpg", agotado: false },
  { id: 25, nombre: "Tododia Crema hidratante", categoria: "cosmeticos", precio: 14000, emoji: "🧴", img: "img/tododia-crema.jpg", agotado: false },
  { id: 26, nombre: "Tododia Crema de manos", categoria: "cosmeticos", precio: 7000, emoji: "👐", img: "img/tododia-crema.jpg", agotado: false },
  { id: 27, nombre: "Tododia Perfume cabello", categoria: "cosmeticos", precio: 11000, emoji: "💇", img: "img/tododia-cabello.jpg", agotado: false },
  { id: 28, nombre: "Tododia Aceite corporal", categoria: "cosmeticos", precio: 13000, emoji: "🫒", img: "img/tododia-body.jpg", agotado: false },
  { id: 29, nombre: "Tododia Bálsamo labial", categoria: "cosmeticos", precio: 4500, emoji: "💋", img: "img/balsamo.jpg", agotado: false },
  { id: 30, nombre: "Naturé Agua de colonia", categoria: "cosmeticos", precio: 10000, emoji: "👶", img: "img/nature.jpg", agotado: false },
  { id: 31, nombre: "Naturé Shampoo refil", categoria: "cosmeticos", precio: 8500, emoji: "🛁", img: "img/nature.jpg", agotado: false },
  { id: 32, nombre: "Mamãe e Bebê Shampoo", categoria: "cosmeticos", precio: 9000, emoji: "🍼", img: "img/nature.jpg", agotado: false },

  // ARTESANIAS
  { id: 40, nombre: "Cesto decorado con flor", categoria: "artesanias", precio: 25000, emoji: "🧺", img: "img/cesto1.jpg", agotado: false },
  { id: 41, nombre: "Cesto porta mate", categoria: "artesanias", precio: 25000, emoji: "🧉", img: "img/cesto2.jpg", agotado: false },
  { id: 42, nombre: "Bolso matero", categoria: "artesanias", precio: 40000, emoji: "👜", img: "img/cesto3.jpg", agotado: false },
  { id: 43, nombre: "Bolso matero grande", categoria: "artesanias", precio: 40000, emoji: "🛍️", img: "img/cestos-set.jpg", agotado: false },
  { id: 44, nombre: "Repasadores con crochet", categoria: "artesanias", precio: 5000, emoji: "🧵", img: "img/servilletas.jpg", agotado: false },
  { id: 45, nombre: "Canasto con flor de crochet", categoria: "artesanias", precio: 28000, emoji: "🌸", img: "img/cesto4.jpg", agotado: false },
  { id: 46, nombre: "Camino de mesa crochet", categoria: "artesanias", precio: 18000, emoji: "🧶", img: "img/mantel.jpg", agotado: false },

  // REGALOS
  { id: 50, nombre: "Termo rojo + hierbas", categoria: "regalos", precio: 27000, emoji: "🔴", img: "img/termo-rojo.jpg", agotado: false },
  { id: 51, nombre: "Termo constelaciones + mate", categoria: "regalos", precio: 30000, emoji: "✨", img: "img/termo-estrellas.jpg", agotado: false },
  { id: 52, nombre: "Set termo + mate azul", categoria: "regalos", precio: 30000, emoji: "🔵", img: "img/termo-azul.jpg", agotado: false },
  { id: 53, nombre: "Set termo + mate blanco", categoria: "regalos", precio: 30000, emoji: "⚪", img: "img/termo-blanco.jpg", agotado: false },
  { id: 54, nombre: "Termo 1,2 litros", categoria: "regalos", precio: 35000, emoji: "🍶", img: "img/termo-blanco.jpg", agotado: false },
  { id: 55, nombre: "Vaso térmico lila", categoria: "regalos", precio: 30000, emoji: "💜", img: "img/vaso-lila.jpg", agotado: false },
  { id: 56, nombre: "Vaso térmico navy", categoria: "regalos", precio: 30000, emoji: "💙", img: "img/vaso-navy.jpg", agotado: false },
  { id: 57, nombre: "Termo brillantes turquesa", categoria: "regalos", precio: 45000, emoji: "💎", img: "img/termo-brillos.jpg", agotado: false }
];
