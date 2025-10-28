export const responseTree: { [key: string]: any } = {
  PruebaStiven: {
    response: "",
    options: {
      hola: {
        response:
          "¡Bienvenido a Nutrición Consciente! 🍃\nEstamos aquí para ayudarte con tu alimentación y bienestar.\n1. Ver menú saludable\n2. Información nutricional\n3. Hablar sobre alimentación consciente\n4. Consultas sobre trastornos alimenticios\n5. Reservar mesa",
        options: {
          "Ver menú saludable": {
            response:
              "Tenemos opciones deliciosas y balanceadas:\n1. Desayunos nutritivos\n2. Almuerzos balanceados\n3. Cenas ligeras\n4. Snacks saludables\n5. Bebidas naturales",
            options: {
              "Desayunos nutritivos": {
                response:
                  "Nuestros desayunos incluyen:\n• Bowl de avena con frutas ($8.500)\n• Tostadas integrales con aguacate ($9.000)\n• Smoothie bowl energético ($10.000)\n• Huevos revueltos con vegetales ($11.500)\n¿Te gustaría saber más sobre alguna opción?",
                options: {
                  "Bowl de avena con frutas": {
                    response:
                      "Bowl de Avena (450 kcal):\n• Avena integral 80g\n• Fresas, arándanos y banano\n• Miel natural\n• Semillas de chía\n• Nueces\n\n¿Te gustaría ordenar este platillo o conocer sus beneficios nutricionales?",
                    options: {
                      ordenar: {
                        response:
                          "¡Excelente elección! Tu Bowl de Avena ha sido añadido al pedido. ¿Deseas agregar algo más o proceder con tu orden?",
                        options: {
                          "agregar más": {
                            response:
                              "Perfecto, ¿qué más te gustaría agregar?\n1. Otra comida del menú\n2. Bebidas naturales\n3. Ver el pedido actual",
                          },
                          proceder: {
                            response:
                              "Genial, ¿para recoger o delivery? También necesitamos tu nombre y teléfono para confirmar el pedido.",
                          },
                        },
                      },
                      "beneficios nutricionales": {
                        response:
                          "Beneficios del Bowl de Avena:\n• Alto en fibra para mejorar digestión\n• Energía sostenida durante la mañana\n• Antioxidantes de las frutas\n• Grasas saludables de nueces y chía\n• Ayuda a controlar el apetito\n\n¿Te gustaría ordenarlo ahora?",
                        options: {
                          sí: {
                            response:
                              "¡Perfecto! Agregado al pedido. ¿Algo más que desees ordenar?",
                          },
                          no: {
                            response:
                              "No hay problema. ¿Te gustaría ver otras opciones del menú?",
                          },
                        },
                      },
                    },
                  },
                  "Smoothie bowl energético": {
                    response:
                      "Smoothie Bowl (380 kcal):\n• Base de açai y plátano\n• Granola casera\n• Coco rallado\n• Frutas frescas variadas\n• Mantequilla de maní\n\nRico en antioxidantes y energía natural. ¿Te interesa?",
                    options: {
                      sí: {
                        response:
                          "¡Excelente! Agregado al pedido. ¿Deseas algo más?",
                      },
                      no: {
                        response: "Entendido. ¿Te gustaría ver otras opciones?",
                      },
                    },
                  },
                },
              },
              "Almuerzos balanceados": {
                response:
                  "Nuestros almuerzos balanceados incluyen:\n• Ensalada mediterránea con pollo ($15.000)\n• Salmón al horno con vegetales ($22.000)\n• Bowl vegano de quinoa ($14.500)\n• Pechuga a la plancha con arroz integral ($16.500)\n\nTodos incluyen porciones balanceadas de proteína, carbohidratos y grasas saludables. ¿Cuál te interesa?",
                options: {
                  "Bowl vegano de quinoa": {
                    response:
                      "Bowl Vegano (520 kcal):\n• Quinoa orgánica\n• Garbanzos especiados\n• Vegetales asados\n• Aguacate\n• Tahini casero\n• Ensalada fresca\n\nCompleto en proteína vegetal y nutrientes esenciales. ¿Lo ordenamos?",
                    options: {
                      sí: {
                        response:
                          "¡Genial! Bowl vegano agregado. ¿Algo más para tu pedido?",
                      },
                      "información nutricional": {
                        response:
                          "Este bowl aporta:\n• 18g de proteína vegetal\n• 65g carbohidratos complejos\n• 15g grasas saludables\n• Alto en fibra y minerales\n• Vitaminas del complejo B\n\nIdeal para una alimentación balanceada. ¿Te animas a probarlo?",
                        options: {
                          sí: {
                            response: "¡Perfecto! Agregado al pedido.",
                          },
                        },
                      },
                    },
                  },
                  "Salmón al horno con vegetales": {
                    response:
                      "Salmón al Horno (580 kcal):\n• Filete de salmón fresco 180g\n• Mix de vegetales al vapor\n• Papas al romero\n• Limón y hierbas aromáticas\n\nRico en Omega-3 para la salud cardiovascular. ¿Lo agregamos?",
                    options: {
                      sí: {
                        response:
                          "¡Excelente elección! Salmón agregado al pedido. ¿Deseas algo más?",
                      },
                      no: {
                        response:
                          "Sin problema. ¿Te gustaría ver otras opciones?",
                      },
                    },
                  },
                },
              },
              "Cenas ligeras": {
                response:
                  "Nuestras cenas ligeras son perfectas para la noche:\n• Sopa de lentejas ($9.500)\n• Ensalada caprese con atún ($12.000)\n• Crema de vegetales ($8.500)\n• Wrap de pollo y vegetales ($11.000)\n\n¿Cuál prefieres?",
                options: {
                  "Crema de vegetales": {
                    response:
                      "Crema de Vegetales (280 kcal):\n• Mezcla de zanahorias, calabaza y apio\n• Especias naturales\n• Semillas tostadas\n• Pan integral\n\nReconfortante y baja en calorías. ¿La ordenamos?",
                    options: {
                      sí: {
                        response:
                          "¡Perfecto! Crema de vegetales agregada. ¿Algo más?",
                      },
                    },
                  },
                },
              },
              "Snacks saludables": {
                response:
                  "Tenemos snacks nutritivos entre comidas:\n• Frutos secos mixtos ($5.000)\n• Hummus con vegetales ($6.500)\n• Yogurt griego con granola ($7.000)\n• Energy balls de dátiles ($4.500)\n\n¿Te interesa alguno?",
                options: {
                  "Hummus con vegetales": {
                    response:
                      "Hummus Casero (180 kcal):\n• Hummus de garbanzo artesanal\n• Bastones de zanahoria, pepino y apio\n• Tomates cherry\n• Pan pita integral\n\nPerfecto snack rico en proteína y fibra. ¿Lo agregamos?",
                    options: {
                      sí: {
                        response: "¡Genial! Hummus agregado al pedido.",
                      },
                    },
                  },
                },
              },
              "Bebidas naturales": {
                response:
                  "Nuestras bebidas son 100% naturales sin azúcar añadida:\n• Agua de frutas ($4.000)\n• Jugos verdes detox ($7.500)\n• Té helado de hierbas ($5.000)\n• Limonada natural ($4.500)\n• Batidos de frutas ($8.000)\n\n¿Cuál te gustaría probar?",
                options: {
                  "Jugos verdes detox": {
                    response:
                      "Jugo Verde (120 kcal):\n• Espinaca fresca\n• Pepino y apio\n• Manzana verde\n• Jengibre\n• Limón\n\nDepurativo y lleno de vitaminas. ¿Lo incluimos en tu pedido?",
                    options: {
                      sí: {
                        response: "¡Excelente! Jugo verde agregado. ¿Algo más?",
                      },
                      beneficios: {
                        response:
                          "Beneficios del Jugo Verde:\n• Alcaliniza el organismo\n• Rico en antioxidantes\n• Mejora la digestión\n• Aumenta energía natural\n• Apoya la desintoxicación del hígado\n\n¿Lo ordenamos?",
                        options: {
                          sí: {
                            response: "¡Perfecto! Agregado al pedido.",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "Información nutricional": {
            response:
              "¿Sobre qué te gustaría aprender?\n1. Macronutrientes (proteínas, carbohidratos, grasas)\n2. Porciones adecuadas\n3. Lectura de etiquetas nutricionales\n4. Hidratación\n5. Suplementación",
            options: {
              Macronutrientes: {
                response:
                  "Los macronutrientes son esenciales:\n\n• PROTEÍNAS: Construcción muscular (20-30% calorías)\n• CARBOHIDRATOS: Energía principal (45-55% calorías)\n• GRASAS: Hormonas y vitaminas (20-30% calorías)\n\n¿Te gustaría profundizar en alguno?",
                options: {
                  proteínas: {
                    response:
                      "Las proteínas son fundamentales:\n• Construyen y reparan tejidos\n• Necesitas ~0.8-1g por kg de peso\n• Fuentes: carnes, huevos, legumbres, lácteos\n• Importante en cada comida\n\n¿Entendiste la importancia de las proteínas?",
                    options: {
                      sí: {
                        response:
                          "¡Excelente! Una alimentación balanceada incluye proteína en cada comida. ¿Hay algo más que quieras saber?",
                      },
                      no: {
                        response:
                          "Déjame explicarlo de otra forma: Las proteínas son como los ladrillos que construyen tu cuerpo. Necesitas comerlas diariamente porque tu cuerpo las usa constantemente para mantenerse fuerte. ¿Ahora está más claro?",
                        options: {
                          sí: {
                            response:
                              "¡Perfecto! Me alegra que lo hayas entendido. ¿Quieres saber más sobre nutrición?",
                          },
                        },
                      },
                    },
                  },
                  carbohidratos: {
                    response:
                      "Sobre los carbohidratos:\n• Son tu fuente principal de energía\n• Prefiere INTEGRALES sobre refinados\n• Buenos: avena, arroz integral, quinoa, frutas\n• Evita exceso de: azúcar, harinas blancas, dulces\n\n¿Quedó claro?",
                    options: {
                      sí: {
                        response:
                          "¡Genial! Los carbohidratos no son enemigos, solo elige las versiones más saludables. ¿Algo más?",
                      },
                      no: {
                        response:
                          "Piénsalo así: Los carbohidratos integrales son como leña que arde lento (energía duradera), mientras que los azúcares simples son como papel que arde rápido (picos de energía). ¿Mejor ahora?",
                        options: {
                          sí: {
                            response:
                              "¡Perfecto! Ahora sabes elegir mejor tus carbohidratos.",
                          },
                        },
                      },
                    },
                  },
                  grasas: {
                    response:
                      "Las grasas saludables son importantes:\n• Grasas BUENAS: aguacate, nueces, aceite de oliva, pescado\n• Grasas MALAS: frituras, manteca, comida procesada\n• Ayudan a absorber vitaminas\n• Necesarias para hormonas\n\n¿Te quedó claro?",
                    options: {
                      sí: {
                        response:
                          "¡Excelente! Las grasas no engordan si eliges las correctas y en cantidades adecuadas. ¿Algo más que quieras saber?",
                      },
                      no: {
                        response:
                          "Recuerda: no todas las grasas son iguales. Las de aguacate y pescado te ayudan, las de frituras te perjudican. ¿Ahora sí?",
                        options: {
                          sí: {
                            response:
                              "¡Perfecto! Ya sabes diferenciar las grasas saludables.",
                          },
                        },
                      },
                    },
                  },
                },
              },
              "Porciones adecuadas": {
                response:
                  "Las porciones correctas son clave:\n\n🤚 Proteína = Palma de tu mano\n✊ Carbohidratos = Tu puño cerrado\n👍 Grasas = Tu pulgar\n🖐️🖐️ Vegetales = Dos manos juntas\n\n¿Te parece útil este método?",
                options: {
                  sí: {
                    response:
                      "¡Genial! Este método te ayuda a comer sin necesidad de pesar todo. También recuerda:\n• Come despacio\n• Escucha tu saciedad\n• Usa platos más pequeños\n\n¿Quieres más consejos?",
                  },
                  no: {
                    response:
                      "Entiendo que puede parecer confuso. Lo importante es aprender a reconocer cuándo tienes hambre real vs. ansiedad. ¿Te gustaría que te explique más sobre esto?",
                    options: {
                      sí: {
                        response:
                          "Perfecto. El hambre real:\n• Aparece gradualmente\n• Cualquier comida te satisface\n• Te sientes bien después\n\nEl hambre emocional:\n• Aparece repentinamente\n• Quieres comidas específicas\n• Puede venir con culpa\n\n¿Te ayuda esto?",
                        options: {
                          sí: {
                            response:
                              "¡Excelente! Reconocer la diferencia es un gran paso hacia una alimentación consciente.",
                          },
                        },
                      },
                    },
                  },
                },
              },
              Hidratación: {
                response:
                  "La hidratación es fundamental:\n• Bebe 2-3 litros de agua al día\n• Más si haces ejercicio\n• El agua ayuda a:\n  - Digestión\n  - Energía\n  - Piel saludable\n  - Control del apetito\n\n¿Sabías que a veces la sed se confunde con hambre?",
                options: {
                  sí: {
                    response:
                      "¡Exacto! Por eso es importante tomar agua antes de comer. ¿Tienes el hábito de tomar suficiente agua?",
                  },
                  no: {
                    response:
                      "Es muy común. Cuando sientas hambre entre comidas, primero toma un vaso de agua y espera 10 minutos. Muchas veces eso es suficiente. ¿Lo intentarás?",
                    options: {
                      sí: {
                        response:
                          "¡Perfecto! Este simple hábito puede cambiar mucho tu relación con la comida.",
                      },
                    },
                  },
                },
              },
            },
          },
          "Hablar sobre alimentación consciente": {
            response:
              "La alimentación consciente es clave para tu bienestar. ¿Sobre qué te gustaría hablar?\n1. Qué es alimentación consciente\n2. Comer sin distracciones\n3. Reconocer señales de hambre y saciedad\n4. Disfrutar la comida sin culpa\n5. Relación emocional con la comida",
            options: {
              "Qué es alimentación consciente": {
                response:
                  "Alimentación consciente significa:\n• Prestar atención plena a lo que comes\n• Disfrutar cada bocado\n• Comer sin distracciones\n• Escuchar las señales de tu cuerpo\n• No juzgarte por lo que comes\n\nNo es una dieta, es una forma de relacionarte con la comida. ¿Te resuena esto?",
                options: {
                  sí: {
                    response:
                      "¡Maravilloso! La alimentación consciente te libera de las dietas restrictivas y te ayuda a tener paz con la comida. ¿Quieres consejos para empezar a practicarla?",
                  },
                  no: {
                    response:
                      "Entiendo, puede sonar abstracto. Déjame darte un ejemplo: En lugar de comer viendo TV y sin pensar, comes sentado en la mesa, saboreas cada bocado y notas cuándo estás satisfecho. ¿Así tiene más sentido?",
                    options: {
                      sí: {
                        response:
                          "¡Perfecto! Es simplemente estar presente mientras comes. ¿Te gustaría intentarlo?",
                      },
                    },
                  },
                },
              },
              "Comer sin distracciones": {
                response:
                  "Comer sin distracciones ayuda a:\n• Disfrutar más la comida\n• Comer la cantidad adecuada\n• Mejorar la digestión\n• Reducir comer de más\n\nConsejos:\n❌ No celular, TV o trabajo\n✅ Siéntate en la mesa\n✅ Mastica despacio\n✅ Nota sabores y texturas\n\n¿Crees que puedes intentarlo?",
                options: {
                  sí: {
                    response:
                      "¡Excelente! Empieza con una comida al día sin distracciones. Notarás la diferencia. ¿Hay algo más que quieras saber?",
                  },
                  no: {
                    response:
                      "Entiendo que puede ser difícil al principio. ¿Qué te impide intentarlo? Tal vez puedo darte sugerencias.",
                    options: {
                      "no tengo tiempo": {
                        response:
                          "Entiendo. Pero comer con atención no toma más tiempo, solo requiere estar presente. Incluso 10 minutos de comida consciente son mejor que 30 minutos distraído. ¿Lo intentarías con una comida esta semana?",
                      },
                      "es aburrido": {
                        response:
                          "Al principio puede parecer así, pero descubrirás sabores que nunca notaste. Es como redescubrir la comida. Además, tu cuerpo te lo agradecerá. ¿Le das una oportunidad?",
                      },
                    },
                  },
                },
              },
              "Reconocer señales de hambre y saciedad": {
                response:
                  "Aprender a escuchar tu cuerpo es fundamental:\n\nESCALA DE HAMBRE (1-10):\n1-2: Hambre extrema, mareo\n3-4: Hambre moderada\n5-6: Neutral, cómodo\n7-8: Satisfecho\n9-10: Muy lleno, incómodo\n\nLo ideal: Comer en 3-4, parar en 7-8\n\n¿Sueles notar estas señales?",
                options: {
                  sí: {
                    response:
                      "¡Perfecto! Estás en contacto con tu cuerpo. Eso es muy valioso para una alimentación saludable. ¿Algo más en lo que pueda ayudarte?",
                  },
                  no: {
                    response:
                      "Es normal, muchas personas han perdido esta conexión. Consejos para reconectarte:\n• Pregúntate antes de comer: ¿Tengo hambre física?\n• Come despacio y pausa a la mitad\n• Pregunta: ¿Sigo con hambre?\n• No esperes a estar muy lleno\n\n¿Te animas a practicar esto?",
                    options: {
                      sí: {
                        response:
                          "¡Maravilloso! Con práctica, volverás a escuchar tu cuerpo naturalmente. Es un proceso, sé paciente contigo.",
                      },
                      no: {
                        response:
                          "Entiendo que puede ser difícil. ¿Hay algo específico que te preocupa sobre esto?",
                      },
                    },
                  },
                },
              },
              "Disfrutar la comida sin culpa": {
                response:
                  'La culpa al comer es muy común pero dañina:\n\n❌ NO hay comidas "buenas" o "malas"\n❌ NO debes "compensar" lo que comiste\n❌ NO eres "malo" por tus elecciones\n\n✅ Todos los alimentos tienen su lugar\n✅ El balance es en el tiempo, no en cada comida\n✅ Disfrutar la comida es saludable\n\n¿Te sientes identificado con la culpa al comer?',
                options: {
                  sí: {
                    response:
                      'Eres muy valiente al reconocerlo. La culpa viene de:\n• Dietas restrictivas\n• Mensajes de "comida prohibida"\n• Presión social\n\nPero la verdad es: Tu valor NO depende de lo que comes. ¿Te gustaría consejos para trabajar en esto?',
                    options: {
                      sí: {
                        response:
                          "Consejos para reducir la culpa:\n1. Cuestiona: ¿Quién dice que esto es malo?\n2. Recuerda: Una comida no define tu salud\n3. Practica auto-compasión\n4. Busca balance, no perfección\n5. Si la culpa persiste, considera apoyo profesional\n\nRecuerda: Mereces comer y disfrutar sin castigos. ¿Esto te ayuda?",
                        options: {
                          sí: {
                            response:
                              "Me alegra mucho. La relación con la comida puede sanar. Sé amable contigo en este proceso. ¿Hay algo más que necesites?",
                          },
                        },
                      },
                    },
                  },
                  no: {
                    response:
                      "¡Qué bueno! Tener una relación neutral con la comida es muy saludable. ¿Hay otro tema sobre el que quieras hablar?",
                  },
                },
              },
              "Relación emocional con la comida": {
                response:
                  'Muchas personas comen por emociones, no por hambre:\n\n¿Comes cuando estás:\n• Estresado/a?\n• Triste?\n• Aburrido/a?\n• Ansioso/a?\n• Solo/a?\n\nEsto se llama "comer emocional" y es muy común. ¿Te identificas con esto?',
                options: {
                  sí: {
                    response:
                      "Gracias por tu honestidad. El comer emocional NO te hace débil o malo. Es una forma de buscar consuelo.\n\nPero hay formas más efectivas de manejar emociones:\n• Identificar la emoción real\n• Hablar con alguien\n• Escribir un diario\n• Hacer ejercicio\n• Técnicas de respiración\n\n¿Te gustaría aprender estrategias específicas?",
                    options: {
                      sí: {
                        response:
                          'Estrategias anti-comer emocional:\n\n1. PAUSA: Antes de comer, pregúntate "¿Tengo hambre física?"\n2. IDENTIFICA: ¿Qué siento realmente?\n3. ESPERA: Dale 10 minutos\n4. ALTERNATIVA: Haz otra cosa que te calme\n5. PERMISO: Si aún quieres comer, está bien, hazlo conscientemente\n\nImportante: Si es frecuente, considera terapia. ¿Te parece útil esto?',
                        options: {
                          sí: {
                            response:
                              "¡Excelente! Recuerda: El cambio toma tiempo. Sé compasivo contigo. Y si necesitas ayuda profesional, no dudes en buscarla. ¿Algo más?",
                          },
                          "necesito ayuda profesional": {
                            response:
                              "Es muy valiente reconocerlo. Te recomiendo buscar:\n• Nutricionista especializado en comportamiento alimentario\n• Psicólogo/a con experiencia en trastornos alimenticios\n• Grupos de apoyo\n\nEstos profesionales pueden darte herramientas personalizadas. Tu bienestar es lo más importante. ¿Hay algo más en lo que pueda apoyarte ahora?",
                          },
                        },
                      },
                    },
                  },
                  no: {
                    response:
                      "¡Qué bueno que tienes esa consciencia! Mantienes una relación saludable con la comida. ¿Hay otro tema que te interese?",
                  },
                },
              },
            },
          },
          "Consultas sobre trastornos alimenticios": {
            response:
              "⚠️ Los trastornos alimenticios son condiciones serias que requieren ayuda profesional.\n\n¿Sobre qué te gustaría información?\n1. Qué son los trastornos alimenticios\n2. Señales de alerta\n3. Bulimia nerviosa\n4. Anorexia nerviosa\n5. Trastorno por atracón\n6. Cómo buscar ayuda",
            options: {
              "Qué son los trastornos alimenticios": {
                response:
                  "Los trastornos alimenticios son condiciones de salud mental que afectan:\n• Tu relación con la comida\n• Tu imagen corporal\n• Tu salud física y emocional\n\nNO son:\n❌ Una elección\n❌ Vanidad\n❌ Algo que puedes controlar solo\n\nSÍ son:\n✅ Condiciones médicas serias\n✅ Tratables con ayuda profesional\n✅ Más comunes de lo que crees\n\n¿Tienes preocupaciones sobre ti o alguien cercano?",
                options: {
                  "sobre mí": {
                    response:
                      "Gracias por tu valentía al compartir esto. Es un paso importante.\n\nPor favor, considera:\n• Hablar con un profesional de salud mental\n• Llamar a una línea de ayuda\n• Hablar con alguien de confianza\n\n¿Te gustaría información sobre dónde buscar ayuda?",
                    options: {
                      sí: {
                        response:
                          "Recursos importantes:\n\n📞 Línea de ayuda: 106 (Colombia - Salud Mental)\n🏥 Busca: Psicólogo especializado en TCA\n🏥 Nutricionista clínico\n💚 Grupos de apoyo\n\nRecuerda:\n• No estás solo/a\n• La recuperación es posible\n• Mereces ayuda y apoyo\n• No es tu culpa\n\n¿Hay algo específico que necesites ahora?",
                      },
                    },
                  },
                  "sobre alguien cercano": {
                    response:
                      "Es importante que estés preocupado por tu ser querido.\n\nCómo ayudar:\n✅ Expresa tu preocupación con amor\n✅ Escucha sin juzgar\n✅ Sugiere ayuda profesional\n✅ Sé paciente, la recuperación toma tiempo\n✅ Cuida también de ti\n\n❌ No fuerces a comer\n❌ No comentes sobre su cuerpo\n❌ No minimices el problema\n\n¿Necesitas más orientación sobre esto?",
                    options: {
                      sí: {
                        response:
                          'Consejos específicos:\n\n1. Elige un momento tranquilo para hablar\n2. Usa "yo" no "tú": "Me preocupo por ti" vs "Tú tienes un problema"\n3. Ofrece acompañarle a buscar ayuda\n4. Mantén tu apoyo constante\n5. Busca también apoyo para ti (es desgastante)\n\nRecuerda: No puedes forzar la recuperación, pero tu apoyo es valioso. ¿Algo más?',
                      },
                    },
                  },
                },
              },
              "Señales de alerta": {
                response:
                  "⚠️ Señales de alerta de un trastorno alimenticio:\n\nCOMPORTAMIENTO:\n• Preocupación excesiva por calorías/peso\n• Evitar comer con otros\n• Rituales rígidos con la comida\n• Ejercicio compulsivo\n• Ir al baño después de comer\n\nFÍSICO:\n• Cambios drásticos de peso\n• Mareos, fatiga\n• Problemas digestivos\n• Caída del cabello\n\nEMOCIONAL:\n• Ansiedad por la comida\n• Cambios de humor\n• Aislamiento social\n• Baja autoestima\n\n¿Reconoces alguna de estas señales?",
                options: {
                  "sí en mí": {
                    response:
                      "Reconocer estas señales es muy valiente y es el primer paso.\n\nIMPORTANTE: No estás solo/a y hay ayuda disponible.\n\n¿Qué te gustaría hacer ahora?\n1. Información sobre dónde buscar ayuda\n2. Hablar más sobre lo que sientes\n3. Consejos para hablar con alguien de confianza",
                    options: {
                      "Información sobre dónde buscar ayuda": {
                        response:
                          "🏥 AYUDA PROFESIONAL:\n\n• Psicólogo/Psiquiatra especializado en TCA\n• Nutricionista clínico\n• Médico de cabecera\n\n📞 LÍNEAS DE AYUDA:\n• 106 - Línea de salud mental (Colombia)\n• Emergencias: 123\n\n💚 GRUPOS DE APOYO:\n• Busca grupos locales de TCA\n• Terapia grupal\n\n⏰ NO ESPERES: Cuanto antes busques ayuda, mejor.\n\nRecuerda: Pedir ayuda NO es debilidad, es FORTALEZA. ¿Crees que puedes dar este paso?",
                        options: {
                          sí: {
                            response:
                              "¡Eso es increíblemente valiente! Estoy orgulloso de ti por tomar esta decisión.\n\nPróximos pasos:\n1. Habla con alguien de confianza HOY\n2. Agenda cita con profesional esta semana\n3. Sé honesto sobre lo que sientes\n4. Sé paciente contigo, la recuperación toma tiempo\n\nNo estás solo en esto. ¿Hay algo más que necesites ahora?",
                          },
                          "tengo miedo": {
                            response:
                              "Es completamente normal tener miedo. Buscar ayuda puede ser aterrador.\n\nPero considera:\n• Los profesionales están ahí para ayudarte, no juzgarte\n• La recuperación es posible\n• Mereces vivir sin este sufrimiento\n• Cada día que pasa puede empeorar la situación\n\n¿Qué es lo que más te asusta de buscar ayuda?",
                            options: {
                              "que me obliguen a comer/subir de peso": {
                                response:
                                  "Entiendo tu miedo. Pero la realidad es:\n\n• Los profesionales van a tu ritmo\n• El objetivo es TU BIENESTAR, no solo el peso\n• Trabajarán en tu relación con la comida\n• Te darán herramientas para manejar la ansiedad\n• Respetarán tus tiempos\n\nLa recuperación no es solo sobre la comida, es sobre sanar tu mente y emociones. ¿Esto calma un poco tu miedo?",
                              },
                              "que me juzguen": {
                                response:
                                  "Los profesionales de salud mental NO juzgan. Ellos:\n\n✅ Han visto muchos casos similares\n✅ Están entrenados para ayudar sin juzgar\n✅ Entienden que es una enfermedad, no una elección\n✅ Su trabajo es apoyarte\n\nAdemás, todo lo que hables es CONFIDENCIAL.\n\nSi encuentras a alguien que te juzga, busca otro profesional. Mereces ser tratado con respeto. ¿Te animas a intentarlo?",
                              },
                            },
                          },
                        },
                      },
                      "Hablar más sobre lo que sientes": {
                        response:
                          "Estoy aquí para escucharte. Recuerda que soy un chatbot, pero tu voz y tus sentimientos son válidos.\n\nPor favor considera que necesitas hablar con un profesional de salud mental, pero mientras tanto...\n\n¿Qué es lo que más te está afectando en este momento?",
                        options: {
                          "mi relación con la comida": {
                            response:
                              "La relación con la comida puede ser muy compleja y dolorosa.\n\nLo que quiero que sepas:\n• NO es tu culpa\n• Muchas personas luchan con esto\n• La comida debería ser placentera, no estresante\n• Puedes recuperar una relación sana con la comida\n• Necesitas apoyo profesional para lograrlo\n\nLa comida es combustible Y placer. Mereces disfrutarla sin ansiedad. ¿Crees que puedes buscar ayuda esta semana?",
                          },
                          "mi imagen corporal": {
                            response:
                              "Los problemas de imagen corporal son devastadores y muy reales.\n\nVerdades importantes:\n• Tu valor NO está en tu apariencia\n• Lo que ves en el espejo puede estar distorsionado por la enfermedad\n• Los cuerpos sanos vienen en TODAS las formas y tamaños\n• La belleza es subjetiva y construida socialmente\n• Mereces amor y respeto en cualquier cuerpo\n\nUn terapeuta puede ayudarte a trabajar estos pensamientos. Tu cuerpo merece amor, no castigo. ¿Buscarás ayuda?",
                          },
                        },
                      },
                    },
                  },
                  "sí en alguien cercano": {
                    response:
                      "Es importante que estés atento a tu ser querido.\n\n¿Qué señales has notado específicamente? Esto me ayudará a orientarte mejor:\n1. Cambios en hábitos alimenticios\n2. Cambios físicos notorios\n3. Cambios emocionales/aislamiento\n4. Ejercicio excesivo\n5. Varios de los anteriores",
                    options: {
                      "Varios de los anteriores": {
                        response:
                          'Es preocupante cuando hay múltiples señales. Esto indica que la situación es seria.\n\nACCIONES INMEDIATAS:\n1. Habla con la persona en privado y con amor\n2. Expresa tu preocupación específica: "He notado que..."\n3. NO menciones peso o apariencia\n4. Ofrece acompañamiento para buscar ayuda\n5. Si hay riesgo inmediato, busca ayuda profesional urgente\n\nRecuerda:\n• No puedes forzar la recuperación\n• Tu apoyo es valioso pero no suficiente\n• Necesitan ayuda profesional\n• Cuida también tu salud mental\n\n¿Necesitas más orientación?',
                        options: {
                          sí: {
                            response:
                              'QUÉ DECIR:\n"Me preocupo por ti porque he notado [comportamiento específico]. Quiero apoyarte. ¿Podemos hablar de cómo te sientes?"\n\nQUÉ NO DECIR:\n❌ "Solo come más/menos"\n❌ "Te ves muy delgado/gordo"\n❌ "Esto es solo una fase"\n❌ "Yo también he hecho dieta"\n\nSI NIEGAN EL PROBLEMA:\n• No discutas\n• Mantén la puerta abierta\n• Sigue observando\n• Considera hablar con sus padres/pareja (si es apropiado)\n\n¿Esto te ayuda?',
                          },
                        },
                      },
                    },
                  },
                  no: {
                    response:
                      "Me alegra que no reconozcas estas señales. \n\nRecuerda estar atento a:\n• Cambios en tu relación con la comida\n• Pensamientos obsesivos sobre peso/comida\n• Aislamiento social por la comida\n\nLa prevención es importante. Mantener una alimentación consciente y una buena salud mental es clave. ¿Hay algo más sobre lo que quieras hablar?",
                  },
                },
              },
              "Bulimia nerviosa": {
                response:
                  "BULIMIA NERVIOSA:\n\nCaracterísticas:\n• Episodios de atracones (comer mucho en poco tiempo)\n• Comportamientos compensatorios (vómito, laxantes, ejercicio excesivo)\n• Preocupación excesiva por peso/figura\n• Ciclo de atracón-purga-culpa\n\nEfectos en la salud:\n• Daño en dientes y esófago\n• Desequilibrio electrolítico (peligroso para el corazón)\n• Problemas digestivos\n• Ansiedad y depresión\n\n⚠️ ES TRATABLE con ayuda profesional.\n\n¿Buscas información porque te preocupa por ti o alguien más?",
                options: {
                  "por mí": {
                    response:
                      "Primero, gracias por tu valentía al buscar información.\n\nSi estás luchando con bulimia:\n• NO estás solo/a\n• NO es tu culpa\n• SÍ puedes recuperarte\n• NECESITAS ayuda profesional\n\nLa bulimia es peligrosa para tu salud física y mental. Cuanto antes busques ayuda, mejor.\n\nTratamiento incluye:\n• Terapia psicológica (TCC, DBT)\n• Apoyo nutricional\n• Posiblemente medicación\n• Grupos de apoyo\n\n¿Estás dispuesto/a a buscar ayuda?",
                    options: {
                      sí: {
                        response:
                          "¡Ese es un paso enorme y valiente!\n\nPRÓXIMOS PASOS:\n1. Habla con alguien de confianza HOY\n2. Busca psicólogo especializado en TCA\n3. Agenda cita con médico (revisa tu salud física)\n4. Sé honesto sobre tus síntomas\n5. Ten paciencia con el proceso\n\nRecuerda:\n• La recuperación es posible\n• Mereces estar bien\n• No estás solo en esto\n• Cada día sin purgar es una victoria\n\n¿Hay algo específico que te preocupe del proceso?",
                        options: {
                          "dejar de hacerlo": {
                            response:
                              "Es la preocupación más común y totalmente válida.\n\nLa verdad:\n• NO podrás detenerte solo con fuerza de voluntad\n• Necesitas abordar las causas emocionales\n• El terapeuta te dará herramientas específicas\n• Será gradual, no inmediato\n• Habrá recaídas, son parte del proceso\n\nPero con ayuda profesional:\n✅ Aprenderás a manejar las urgencias\n✅ Trabajarás las emociones subyacentes\n✅ Desarrollarás estrategias de afrontamiento\n✅ Tendrás apoyo en momentos difíciles\n\nLa recuperación NO es lineal, pero ES posible. ¿Te comprometes a intentarlo?",
                          },
                        },
                      },
                      "no sé si estoy listo/a": {
                        response:
                          'Es normal no sentirse listo. El cambio da miedo.\n\nPero considera:\n• Cada día que pasa, tu salud está en riesgo\n• La bulimia puede causar daño permanente\n• No tienes que estar "listo" para pedir ayuda\n• Los profesionales te ayudarán a estar listo\n• Dar el primer paso es lo más difícil\n\nPregúntate:\n¿Quieres seguir viviendo así? ¿Qué vida quieres tener en 5 años?\n\nNo tienes que estar perfecto para buscar ayuda. Solo tienes que dar el primer paso. ¿Qué te detiene específicamente?',
                      },
                    },
                  },
                  "por alguien más": {
                    response:
                      'Es importante que estés preocupado por tu ser querido.\n\nSeñales de bulimia:\n• Ir al baño inmediatamente después de comer\n• Comer grandes cantidades y desaparecer\n• Hinchazón en mejillas (glándulas salivales)\n• Marcas en nudillos\n• Problemas dentales\n• Fluctuaciones de peso\n• Uso excesivo de chicles/enjuague bucal\n\nCÓMO AYUDAR:\n✅ Habla en privado, con amor\n✅ "Me preocupa tu salud"\n✅ Ofrece apoyo para buscar ayuda\n✅ No vigiles su comida\n✅ No comentes su cuerpo\n\n❌ No confrontes sobre purgas\n❌ No culpes o juzgues\n\n¿Necesitas más orientación sobre cómo abordar esto?',
                    options: {
                      sí: {
                        response:
                          'CONVERSACIÓN SUGERIDA:\n\n"[Nombre], he notado algunos cambios y me preocupo por ti. Sé que tal vez no quieras hablar de esto, pero estoy aquí si necesitas apoyo. ¿Hay algo que te esté afectando?"\n\nSI NIEGAN:\n• No insistas en ese momento\n• Diles que estarás ahí cuando estén listos\n• Deja recursos de ayuda disponibles\n• Sigue observando\n\nSI ADMITEN:\n• Escucha sin juzgar\n• Agradece su confianza\n• Ofrece acompañamiento para buscar ayuda\n• No prometas guardar el secreto si hay riesgo\n\nRecuerda cuidar también tu salud mental. ¿Esto te ayuda?',
                      },
                    },
                  },
                },
              },
              "Anorexia nerviosa": {
                response:
                  "ANOREXIA NERVIOSA:\n\nCaracterísticas:\n• Restricción severa de alimentos\n• Miedo intenso a aumentar de peso\n• Distorsión de imagen corporal\n• Peso significativamente bajo\n• Negación de la gravedad\n\nEfectos en salud:\n• Problemas cardíacos (puede ser fatal)\n• Pérdida de masa muscular y ósea\n• Anemia\n• Amenorrea (pérdida de menstruación)\n• Problemas cognitivos\n• Aislamiento social\n\n⚠️ Es el trastorno mental con mayor mortalidad, pero ES TRATABLE.\n\n¿Esta información es para ti o alguien cercano?",
                options: {
                  "para mí": {
                    response:
                      "Gracias por buscar información. Eso muestra valentía.\n\nSi tienes anorexia o sospechas que la tienes:\n\n🚨 ESTO ES URGENTE: La anorexia es peligrosa y potencialmente fatal. Necesitas ayuda médica YA.\n\nPor favor:\n1. Dile a alguien de confianza HOY\n2. Ve con un médico esta semana\n3. Busca terapeuta especializado en TCA\n4. Sé completamente honesto sobre tus síntomas\n\nSÉ QUE:\n• Puede ser aterrador\n• Sientes que tienes control\n• Temes subir de peso\n• Crees que estás bien\n\nPERO:\n• Tu vida está en riesgo\n• Tu cerebro está siendo afectado\n• La recuperación es posible\n• Mereces vivir plenamente\n\n¿Buscarás ayuda esta semana?",
                    options: {
                      "no creo necesitarla": {
                        response:
                          'La negación es un síntoma común de la anorexia. Tu cerebro, afectado por la desnutrición, no puede evaluar objetivamente la situación.\n\nPREGUNTA HONESTA:\n¿Las personas que te aman están preocupadas?\n¿Has perdido mucho peso?\n¿Piensas en comida/peso constantemente?\n¿Tu vida gira alrededor de la restricción?\n\nSi respondiste sí a alguna: NECESITAS AYUDA.\n\nNo esperes a estar "peor". En la anorexia, cuando crees que estás bien, a menudo estás en peligro.\n\nPor favor, por lo que más ames, habla con un médico. ¿Lo harás?',
                        options: {
                          "está bien, buscaré ayuda": {
                            response:
                              "GRACIAS. Acabas de tomar la decisión más importante de tu vida.\n\nACCIONES INMEDIATAS:\n1. Dile a un adulto de confianza HOY (padres, profesor, familiar)\n2. Pide ir al médico ESTA SEMANA\n3. Sé honesto sobre peso, restricción, ejercicio\n4. Acepta el tratamiento que te ofrezcan\n\nLO QUE DEBES SABER:\n• Recuperarse da miedo pero salva vidas\n• Tu cuerpo necesita comida para funcionar\n• Tu cerebro necesita nutrición para pensar claramente\n• La recuperación te devolverá tu vida\n\nEres valiente. Puedes hacer esto. Tu vida vale la pena. ¿A quién le dirás primero?",
                          },
                        },
                      },
                      "sí, buscaré ayuda": {
                        response:
                          "¡Eso es increíblemente valiente! Estoy orgulloso de ti por tomar esta decisión.\n\nPRÓXIMOS PASOS:\n1. Habla con alguien de confianza HOY\n2. Busca psicólogo especializado en TCA\n3. Agenda cita con médico (revisa tu salud física)\n4. Sé honesto sobre tus síntomas\n5. Ten paciencia con el proceso\n\nRecuerda:\n• La recuperación es posible\n• Mereces estar bien\n• No estás solo en esto\n• Cada día que comes es una victoria\n\n¿Hay algo específico que te preocupe del proceso?",
                      },
                      "tengo miedo": {
                        response:
                          'Es completamente normal tener miedo. La anorexia crea un falso sentido de control y seguridad.\n\nPERO CONSIDERA:\n• Cada día que pasa, tu salud está en riesgo\n• La anorexia puede causar daño permanente\n• No tienes que estar "listo" para pedir ayuda\n• Los profesionales te ayudarán a estar listo\n• Dar el primer paso es lo más difícil\n\nPregúntate:\n¿Quieres seguir viviendo así? ¿Qué vida quieres tener en 5 años?\n\nNo tienes que estar perfecto para buscar ayuda. Solo tienes que dar el primer paso. ¿Qué te detiene específicamente?',
                      },
                    },
                  },
                  "para alguien cercano": {
                    response:
                      "Es admirable que te preocupes por alguien cercano que pueda estar luchando con la anorexia. Aquí hay algunas formas en las que puedes ayudar:\n\n1. **Escucha sin juzgar**: Ofrece un espacio seguro para que hablen sobre sus sentimientos.\n2. **Informa**: Comparte información sobre la anorexia y su tratamiento.\n3. **Anima a buscar ayuda**: Sugiere que hablen con un profesional de la salud.\n4. **Sé paciente**: La recuperación lleva tiempo y puede haber retrocesos.\n\nRecuerda cuidar también de ti mismo mientras apoyas a otros. ¿Hay algo específico que te preocupe sobre esta persona?",
                  },
                },
              },
              "Trastorno por atracón": {
                response:
                  "El trastorno por atracón es un problema serio. Aquí hay algunos pasos que puedes seguir para buscar ayuda:\n\n1. **Habla con un profesional**: Un psicólogo o psiquiatra puede ofrecerte apoyo.\n2. **Informa a tus seres queridos**: Hablar con amigos o familiares puede ayudarte a sentirte menos solo.\n3. **Considera grupos de apoyo**: Compartir experiencias con otros puede ser muy beneficioso.\n4. **No te culpes**: La recuperación lleva tiempo y es un proceso difícil.\n\nRecuerda que pedir ayuda es un signo de fortaleza. ¿Hay algo específico que te preocupe sobre este trastorno?",
              },
            },
            "Buscar ayuda profesional": {
              response:
                "Buscar ayuda profesional es un paso valiente hacia tu bienestar. ¿Sobre qué te gustaría información?\n1. Tipos de profesionales\n2. Cómo encontrar un buen profesional\n3. Qué esperar en la primera consulta\n4. Preguntas para hacerle a un profesional\n5. Recursos y líneas de ayuda",
            },
          },
        },
      },
    },
  },
};
