class RecintosZoo {
  constructor() {
    this.recintos = [
      {
        numero: 1,
        bioma: 'savana',
        tamanhoTotal: 10,
        animaisExistentes: [
          { especie: 'MACACO', quantidade: 3, tipo: 'herbivoro' },
        ],
      },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
      {
        numero: 3,
        bioma: 'savana e rio',
        tamanhoTotal: 7,
        animaisExistentes: [
          { especie: 'GAZELA', quantidade: 1, tipo: 'herbivoro' },
        ],
      },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
      {
        numero: 5,
        bioma: 'savana',
        tamanhoTotal: 9,
        animaisExistentes: [
          { especie: 'LEAO', quantidade: 1, tipo: 'carnivoro' },
        ],
      },
    ]

    this.animais = {
      LEAO: { tamanho: 3, bioma: 'savana', tipo: 'carnivoro' },
      LEOPARDO: { tamanho: 2, bioma: 'savana', tipo: 'carnivoro' },
      CROCODILO: { tamanho: 3, bioma: 'rio', tipo: 'carnivoro' },
      MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], tipo: 'herbivoro' },
      GAZELA: { tamanho: 2, bioma: 'savana', tipo: 'herbivoro' },
      HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], tipo: 'herbivoro' },
    }
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animais[animal]) return { erro: 'Animal inválido' }
    if (quantidade <= 0 || !Number.isInteger(quantidade))
      return { erro: 'Quantidade inválida' }

    const infoAnimal = this.animais[animal]
    const recintosViaveis = []

    for (const recinto of this.recintos) {
      if (!this.biomaCompatível(infoAnimal.bioma, recinto.bioma)) continue

      let tamanhoDisponível = recinto.tamanhoTotal
      let espaçoOcupado = this.calculaEspacoOcupado(recinto)

      if (!this.podeAdicionarAnimal(infoAnimal, recinto)) continue

      tamanhoDisponível -= espaçoOcupado

      if (infoAnimal.tipo === 'herbivoro') {
        tamanhoDisponível -= Math.max(0, quantidade - 1)
      }

      if (tamanhoDisponível >= quantidade * infoAnimal.tamanho) {
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${
            tamanhoDisponível - quantidade * infoAnimal.tamanho
          } total: ${recinto.tamanhoTotal})`
        )
      }
    }

    return recintosViaveis.length === 0
      ? { erro: 'Não há recinto viável' }
      : { recintosViaveis }
  }

  biomaCompatível(biomasAnimal, biomaRecinto) {
    return Array.isArray(biomasAnimal)
      ? biomasAnimal.includes(biomaRecinto)
      : biomasAnimal === biomaRecinto
  }

  calculaEspacoOcupado(recinto) {
    return recinto.animaisExistentes.reduce((total, animalExistente) => {
      return (
        total +
        animalExistente.quantidade *
          this.animais[animalExistente.especie].tamanho
      )
    }, 0)
  }

  podeAdicionarAnimal(infoAnimal, recinto) {
    return !recinto.animaisExistentes.some(animalExistente => {
      return (
        this.animais[animalExistente.especie].tipo === 'carnivoro' &&
        infoAnimal.tipo === 'carnivoro'
      )
    })
  }
}

export { RecintosZoo as RecintosZoo }
