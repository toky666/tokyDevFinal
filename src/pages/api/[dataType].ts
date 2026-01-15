// Importamos el tipo APIRoute de Astro, que define el formato de una ruta API en Astro.
import type { APIRoute } from "astro";
// Importamos los diferentes datos desde sus respectivos archivos.
// Cada archivo contiene información estructurada, como las habilidades, el menú, el portafolio, etc.
import { skillsData } from "@data/skillsData";
import { menuData } from "@src/data/menuData";
import { portafolioData } from "@src/data/portfolioData";
import { socialIconsData } from "@src/data/socialIconsData";
import { userData } from "@src/data/userData";
import { toolsData } from "@src/data/ToolsData";

// Creamos un objeto 'dataTypes' que mapea los nombres de los tipos de datos a sus respectivos valores.
// Este objeto permite acceder rápidamente a los datos según el tipo solicitado.
const dataTypes = {
  skills: skillsData, // Datos sobre habilidades (skills)
  menu: menuData, // Datos sobre el menú de navegación
  portafolio: portafolioData, // Datos sobre proyectos de portafolio
  socialIcons: socialIconsData, // Datos sobre iconos de redes sociales
  tools: toolsData, // Datos sobre herramientas que utiliza el usuario
  user: userData, // Datos del usuario
};

// Definimos el controlador para la solicitud GET. En Astro, esto es usado para manejar una ruta API.
// El parámetro 'params' incluye los parámetros de la URL, como el tipo de dato que se solicita.
export const GET: APIRoute = ({ params }) => {
  const data = params?.dataType;

  // Si no se especifica ningún tipo de dato, devolvemos todos
  if (!data) {
    return new Response(JSON.stringify({ data: dataTypes }));
  }

  // Si el tipo de dato no existe, devolvemos 404
  if (!Object.hasOwn(dataTypes, data)) {
    return new Response(JSON.stringify({ status: 404 }), { status: 404 });
  }

  // Si existe, devolvemos ese conjunto de datos
  return new Response(
    JSON.stringify({
      [data]: dataTypes[data as keyof typeof dataTypes],
    })
  );
};
