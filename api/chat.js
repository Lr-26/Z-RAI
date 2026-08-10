module.exports = async function handler(req, res) {
  // Configuración de CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Formato de mensaje inválido' });
    }

    // Obtener el último mensaje del usuario
    const lastMessage = messages[messages.length - 1];
    const text = lastMessage.text ? lastMessage.text.toLowerCase() : '';

    let responseText = '';

    // 1. Prioridad Máxima: Cotizaciones y Proyectos (Si el usuario ya tiene una idea clara)
    if (text.match(/\b(precio|costo|cuanto|valor|pagar|presupuesto|cotizar|sitio web|web|ecommerce|tienda|landing|quiero hacer|necesito|idea|proyecto|crear|construir)\b/)) {
      responseText = "En Z-RAI desarrollamos tecnología a medida con estándares de élite. Para que tengas una referencia clara de inversión (en Pesos Argentinos):\n\n*   🎯 **Landing Page de Alta Conversión:** $120.000 – $400.000 ARS\n*   🏢 **Sitio Web Institucional (Corporativo):** $150.000 – $500.000 ARS\n*   🛒 **E-commerce Escalable:** $350.000 – $1.300.000+ ARS\n*   🤖 **Sistemas IA y Automatización:** Cotización a medida.\n\nEstos valores incluyen diseño exclusivo, integración de marca y configuración inicial. ¿Qué tipo de proyecto de estos tienes en mente?";
    }
    // 2. Saludos
    else if (text.match(/\b(hola|buenas|dia|tarde|noche|saludos|hey)\b/)) {
      responseText = "¡Hola! Soy el Asistente Técnico de Z-RAI. Estoy aquí para resolver todas tus dudas al instante. Puedo darte **PRECIOS** exactos para sitios web y e-commerce, explicarte nuestros **SERVICIOS**, o contarte sobre nuestro **PROCESO** de desarrollo. ¿Qué te gustaría saber?";
    }
    // 3. Servicios Genéricos
    else if (text.match(/\b(servicios|hacen|ofrecen|ia|inteligencia|desarrollo|app|aplicacion|tecnologia|sistemas)\b/)) {
      responseText = "Nos especializamos en construir tecnología de élite. Nuestros 3 pilares son:\n\n1. **Inteligencia Artificial:** Creamos asistentes virtuales, agentes autónomos y automatización de procesos.\n2. **Ingeniería Web/SaaS:** Construimos plataformas escalables, sistemas de gestión interna y aplicaciones web.\n3. **Arquitectura de Datos:** Conectamos tus sistemas con bases de datos modernas para que tu negocio opere en piloto automático.\n\nSi quieres saber valores, pídeme que te cotice un proyecto.";
    }
    // 4. Proceso
    else if (text.match(/\b(proceso|tiempo|demora|trabajan|pasos|tardan|como)\b/)) {
      responseText = "Nuestro flujo de trabajo está diseñado para ser transparente y eficiente:\n\n1. **Discovery (Gratis):** Analizamos la viabilidad técnica de tu idea.\n2. **Arquitectura:** Diseñamos el plan de software exacto.\n3. **Desarrollo Ágil:** Programamos tu solución entregando avances reales.\n4. **Despliegue:** Lanzamos tu producto en servidores de alto rendimiento global (como Vercel).\n\nLos tiempos varían desde 2 semanas para integraciones simples, hasta un par de meses para plataformas completas.";
    }
    // 5. Contacto
    else if (text.match(/\b(contacto|hablar|humano|reunion|asesor|llamar|telefono|mail|correo)\b/)) {
      responseText = "Si ya tienes tu proyecto claro y prefieres hablar directamente con nuestro Arquitecto de Software, te invito a cerrar este chat y completar el formulario 'Cotizar Proyecto' en la pantalla principal. Tus datos irán directo a nuestra base de datos segura y te contactaremos a la brevedad.";
    }
    // 6. Default
    else {
      responseText = "Entiendo. Mi base de datos principal está enfocada en darte **PRECIOS** y **COTIZACIONES** para sitios web, así como explicarte nuestros **SERVICIOS**.\n\nSi quieres saber cuánto cuesta un proyecto (ej: 'Quiero hacer un ecommerce'), dímelo y te daré los valores exactos.";
    }

    // Responder con JSON simulando la respuesta de la IA
    return res.status(200).json({ text: responseText });

  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
