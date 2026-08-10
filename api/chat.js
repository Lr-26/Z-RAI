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

    // 1. Saludos
    if (text.match(/\b(hola|buenas|dia|tarde|noche|saludos|hey)\b/)) {
      responseText = "¡Hola! Soy el Asistente Técnico de Z-RAI. Estoy aquí para resolver todas tus dudas al instante. Puedo explicarte en detalle sobre nuestros **SERVICIOS**, cómo calculamos nuestros **PRECIOS**, o cómo es nuestro **PROCESO** de desarrollo. ¿Qué te gustaría saber?";
    }
    // 2. Precios
    else if (text.match(/\b(precio|costo|cuanto|valor|pagar|presupuesto|caro|barato|cotizar)\b/)) {
      responseText = "En Z-RAI no usamos paquetes enlatados; desarrollamos tecnología a la medida exacta de tu empresa.\n\nPara que tengas una referencia:\n- **Sistemas de Automatización y Chatbots:** Son soluciones rápidas de alto retorno de inversión.\n- **Plataformas SaaS e Infraestructuras:** Son proyectos de mayor escala y complejidad.\n\nEl valor exacto depende de las integraciones que requieras. Si ya sabes lo que necesitas, te sugiero usar el botón de 'Cotizar Proyecto' para obtener un número exacto.";
    }
    // 3. Servicios
    else if (text.match(/\b(servicios|hacen|ofrecen|ia|inteligencia|desarrollo|web|app|aplicacion|tecnologia|sistemas)\b/)) {
      responseText = "Nos especializamos en construir tecnología de élite. Nuestros 3 pilares son:\n\n1. **Inteligencia Artificial:** Creamos asistentes virtuales, agentes autónomos y automatización de procesos.\n2. **Ingeniería Web/SaaS:** Construimos plataformas escalables, sistemas de gestión interna y aplicaciones web.\n3. **Arquitectura de Datos:** Conectamos tus sistemas con bases de datos modernas para que tu negocio opere en piloto automático.\n\n¿Tienes alguna idea en mente que encaje con esto?";
    }
    // 4. Proceso
    else if (text.match(/\b(proceso|tiempo|demora|trabajan|pasos|tardan|como)\b/)) {
      responseText = "Nuestro flujo de trabajo está diseñado para ser transparente y eficiente:\n\n1. **Discovery (Gratis):** Analizamos la viabilidad técnica de tu idea.\n2. **Arquitectura:** Diseñamos el plan de software exacto.\n3. **Desarrollo Ágil:** Programamos tu solución entregando avances reales.\n4. **Despliegue:** Lanzamos tu producto en servidores de alto rendimiento global (como Vercel).\n\nLos tiempos varían desde 2 semanas para integraciones simples, hasta un par de meses para plataformas completas.";
    }
    // 5. Proyecto / Idea
    else if (text.match(/\b(si|sí|idea|tengo|proyecto|quiero|necesito|hacer|crear|construir|mente)\b/)) {
      responseText = "¡Excelente! Me encanta escuchar sobre nuevos proyectos. Cuéntame un poco más: ¿Qué problema principal intentas resolver o qué funcionalidad clave necesitas?\n\nEn Z-RAI somos expertos en tomar una visión desde cero y desarrollar toda la arquitectura tecnológica para hacerla realidad. Describe tu idea y te orientaré sobre cómo podemos construirla juntos.";
    }
    // 6. Contacto
    else if (text.match(/\b(contacto|hablar|humano|reunion|asesor|llamar|telefono|mail|correo)\b/)) {
      responseText = "Si ya tienes tu proyecto claro y prefieres hablar directamente con nuestro Arquitecto de Software, te invito a cerrar este chat y completar el formulario 'Cotizar Proyecto' en la pantalla principal. Tus datos irán directo a nuestra base de datos segura y te contactaremos a la brevedad.";
    }
    // 6. Default
    else {
      responseText = "Es una pregunta muy interesante. Mi sistema está entrenado principalmente para explicar nuestros **SERVICIOS**, nuestro **PROCESO** de trabajo y cómo estimamos los **PRECIOS**.\n\nPara cuestiones tan específicas, te recomiendo llenar el formulario principal de la web para que un especialista humano evalúe tu caso en detalle.";
    }

    // Responder con JSON simulando la respuesta de la IA
    return res.status(200).json({ text: responseText });

  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
