export const responseTree: { [key: string]: any } = {
    "PruebaStiven": {
      response: "",
      options: {
        "hola": {
          response: "Hola, ¿en qué puedo ayudarte?\n1. enseñar\n2. aprender\n3. retroalimentar",
          options: {
            "enseñar": {
              response: "Puedo enseñarte sobre programación. ¿Sobre qué tema te gustaría aprender?\n1. JavaScript\n2. Python\n3. Bases de datos",
              options: {
                "JavaScript": {
                  response: "JavaScript es un lenguaje de programación muy utilizado en el desarrollo web. ¿Te gustaría aprender sobre funciones, promesas o DOM?",
                  options: {
                    "funciones": {
                      response: "Las funciones en JavaScript permiten ejecutar bloques de código. ¿Entendiste este concepto?",
                      options: {
                        "sí": {
                          response: "¡Genial! Me alegra que lo hayas entendido. ¿Puedo ayudarte en algo más?",
                          options: {
                            "no": {
                              response: "Me alegra haberte ayudado. ¡Hasta la próxima!"
                            }
                          }
                        },
                        "no": {
                          response: "No te preocupes, puedo explicarlo nuevamente. Una función es un conjunto de instrucciones que realizan una tarea específica. ¿Ahora lo has entendido?",
                          options: {
                            "sí": {
                              response: "¡Perfecto! Me alegra que lo hayas entendido. ¿Puedo ayudarte en algo más?",
                              options: {
                                "no": {
                                  response: "Me alegra haberte ayudado. ¡Hasta la próxima!"
                                }
                              }
                            },
                            "no": {
                              response: "Entiendo, sigue practicando y verás que lo aprenderás. ¡Hasta la próxima!"
                            }
                          }
                        }
                      }
                    },
                    "promesas": {
                      response: "Las promesas en JavaScript se utilizan para manejar operaciones asíncronas. ¿Te gustaría saber más sobre cómo funcionan?",
                      options: {
                        "sí": {
                          response: "Una promesa tiene tres estados: pendiente, resuelta o rechazada. ¿Entendiste este concepto?",
                          options: {
                            "sí": {
                              response: "¡Fantástico! ¿Puedo ayudarte en algo más?",
                              options: {
                                "no": {
                                  response: "Me alegra haberte ayudado. ¡Hasta la próxima!"
                                }
                              }
                            },
                            "no": {
                              response: "No te preocupes, te recomiendo seguir investigando sobre promesas. ¡Hasta la próxima!"
                            }
                          }
                        },
                        "no": {
                          response: "No hay problema. Puedes aprender sobre promesas poco a poco. ¡Hasta la próxima!"
                        }
                      }
                    },
                    "DOM": {
                      response: "El DOM es la estructura de un documento HTML. Con JavaScript, puedes manipularlo para cambiar la página web. ¿Entendiste este concepto?",
                      options: {
                        "sí": {
                          response: "¡Perfecto! Me alegra que lo hayas entendido. ¿Puedo ayudarte en algo más?",
                          options: {
                            "no": {
                              response: "Me alegra haberte ayudado. ¡Hasta la próxima!"
                            }
                          }
                        },
                        "no": {
                          response: "No te preocupes, sigue explorando el DOM y verás que lo dominarás. ¡Hasta la próxima!"
                        }
                      }
                    }
                  }
                },
                "Python": {
                  response: "Python es un lenguaje de programación muy versátil. ¿Te gustaría aprender sobre funciones, bucles o manejo de archivos?",
                  options: {
                    "funciones": {
                      response: "Las funciones en Python te permiten reutilizar código. ¿Entendiste este concepto?",
                      options: {
                        "sí": {
                          response: "¡Perfecto! Me alegra que lo hayas entendido. ¿Puedo ayudarte en algo más?",
                          options: {
                            "no": {
                              response: "Me alegra haberte ayudado. ¡Hasta la próxima!"
                            }
                          }
                        },
                        "no": {
                          response: "No te preocupes, sigue practicando y lo aprenderás. ¡Hasta la próxima!"
                        }
                      }
                    },
                    "bucles": {
                      response: "Los bucles en Python permiten repetir bloques de código. ¿Te gustaría aprender más sobre `for` o `while`?",
                      options: {
                        "for": {
                          response: "El bucle `for` itera sobre una secuencia como una lista o cadena. ¿Entendiste?",
                          options: {
                            "sí": {
                              response: "¡Genial! ¿Puedo ayudarte en algo más?",
                              options: {
                                "no": {
                                  response: "Me alegra haberte ayudado. ¡Hasta la próxima!"
                                }
                              }
                            },
                            "no": {
                              response: "No te preocupes, con práctica lo entenderás mejor. ¡Hasta la próxima!"
                            }
                          }
                        },
                        "while": {
                          response: "El bucle `while` se ejecuta mientras una condición sea verdadera. ¿Entendiste?",
                          options: {
                            "sí": {
                              response: "¡Fantástico! ¿Puedo ayudarte en algo más?",
                              options: {
                                "no": {
                                  response: "Me alegra haberte ayudado. ¡Hasta la próxima!"
                                }
                              }
                            },
                            "no": {
                              response: "Sigue practicando y lo entenderás. ¡Hasta la próxima!"
                            }
                          }
                        }
                      }
                    },
                    "manejo de archivos": {
                      response: "En Python, puedes leer y escribir archivos usando funciones como `open()`. ¿Te gustaría ver un ejemplo?",
                      options: {
                        "sí": {
                          response: "Aquí tienes un ejemplo básico: `with open('archivo.txt', 'r') as f: contenido = f.read()`. ¿Te parece claro?",
                          options: {
                            "sí": {
                              response: "¡Genial! ¿Puedo ayudarte en algo más?",
                              options: {
                                "no": {
                                  response: "Me alegra haberte ayudado. ¡Hasta la próxima!"
                                }
                              }
                            },
                            "no": {
                              response: "No te preocupes, sigue intentando y lo lograrás. ¡Hasta la próxima!"
                            }
                          }
                        },
                        "no": {
                          response: "No te preocupes, el manejo de archivos requiere práctica. ¡Hasta la próxima!"
                        }
                      }
                    }
                  }
                },
                "Bases de datos": {
                  response: "Las bases de datos son sistemas para almacenar y recuperar datos. ¿Te gustaría aprender sobre consultas SQL o relaciones entre tablas?",
                  options: {
                    "consultas SQL": {
                      response: "Las consultas SQL permiten interactuar con los datos. ¿Entendiste este concepto?",
                      options: {
                        "sí": {
                          response: "¡Fantástico! ¿Puedo ayudarte en algo más?",
                          options: {
                            "no": {
                              response: "Me alegra haberte ayudado. ¡Hasta la próxima!"
                            }
                          }
                        },
                        "no": {
                          response: "No te preocupes, sigue practicando y lo entenderás mejor. ¡Hasta la próxima!"
                        }
                      }
                    },
                    "relaciones entre tablas": {
                      response: "Las relaciones permiten conectar datos de diferentes tablas. ¿Te parece claro este concepto?",
                      options: {
                        "sí": {
                          response: "¡Genial! ¿Puedo ayudarte en algo más?",
                          options: {
                            "no": {
                              response: "Me alegra haberte ayudado. ¡Hasta la próxima!"
                            }
                          }
                        },
                        "no": {
                          response: "Sigue explorando las bases de datos y pronto lo dominarás. ¡Hasta la próxima!"
                        }
                      }
                    }
                  }
                }
              }
            },
            "aprender": {
              response: "Puedo ayudarte a aprender nuevas habilidades. ¿Te gustaría aprender sobre programación, matemáticas o idiomas?",
              options: {
                "programación": {
                  response: "Puedo enseñarte varios lenguajes como JavaScript, Python o C++. ¿Te gustaría aprender alguno de estos?",
                  // Otras opciones se pueden añadir de forma similar a las anteriores.
                },
                "matemáticas": {
                  response: "Podemos repasar álgebra, geometría o cálculo. ¿Qué te gustaría aprender?",
                  // Aquí puedes continuar agregando opciones específicas de matemáticas.
                },
                "idiomas": {
                  response: "Puedo ayudarte con inglés, español o francés. ¿Cuál idioma prefieres?",
                  // Aquí puedes añadir más preguntas relacionadas con los idiomas.
                }
              }
            },
            "retroalimentar": {
              response: "Puedo darte retroalimentación sobre tu código. Por favor, compártemelo y lo revisaré.",
              // Aquí podrías agregar más lógica para manejar la retroalimentación.
            }
          }
        }
      }
    }
  };
  