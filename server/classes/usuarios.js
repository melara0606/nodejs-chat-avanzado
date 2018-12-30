class Usuarios {
  constructor () {
    this.personas = [];
  }

  agregarPersona ( id, nombre, sala) {
    this.personas.push({ id, nombre, sala});
    return this.personas;
  }

  getPersona (id) {
    return this.personas.filter( persona => persona.id === id )[0];
  }

  getPersonasSala (sala) {
    return this.personas.filter(persona => persona.sala === sala);
  }

  borrarPersona (id) {
    let personaBorrada = this.getPersona(id);
    this.personas = this.personas.filter(people => people.id != id);
    return personaBorrada;
  }

  getPersonas () {
    return this.personas;
  }
}

module.exports = {
  Usuarios
};