class Chromosome {
    constructor(gene = '') {
      this.gene = gene;
    }
    //Kromozomun hedef metne ne kadar yakın olduğunu ölçer. 
    //Metinler arasındaki farkları toplar ve bir uygunluk değeri döndürür.
    getFitness() {
      if (this.gene.length !== GeneticAlgorithm.target.length) {
        throw new Error('Gene length does not match target length');
      }
  
      let target = GeneticAlgorithm.target;
      let fitness = 0;
      for (let i = 0; i < target.length; ++i) {
        fitness += Math.abs(target.charCodeAt(i) - this.gene.charCodeAt(i));
      }
      return fitness;
    }
  
    static getBestTwo(population) {
      let fittest1 = 0;
      let fittest2 = 1;
      for (let i = 0; i < population.length; ++i) {
        if (population[i].getFitness() < population[fittest2].getFitness()) {
          fittest2 = i;
        }
  
        if (population[fittest2].getFitness() < population[fittest1].getFitness()) {
          let temp = fittest1;
          fittest1 = fittest2;
          fittest2 = temp;
        }
      }
  
      return [population[fittest1], population[fittest2]];
    }
    //ki kromozom arasında çaprazlama işlemi gerçekleştirir
    crossover(other) {
      let crossoverGene = '';
      let crossoverPoint = Math.floor(Math.random() * this.gene.length);
  
      for (let i = 0; i < this.gene.length; ++i) {
        if (i < crossoverPoint) {
          crossoverGene += this.gene[i];
        } else {
          crossoverGene += other.gene[i];
        }
      }
  
      return new Chromosome(crossoverGene);
    }
    //kromozomdaki genlerde rastgele mutasyonlar uygular
    mutate() {
      let chars = GeneticAlgorithm.chars;
      let mutationRate = GeneticAlgorithm.mutationRate;
  
      let mutatedGene = '';
      for (let i = 0; i < this.gene.length; ++i) {
        if (Math.random() < mutationRate) {
          let rnd = Math.floor(Math.random() * chars.length);
          mutatedGene += chars[rnd];
        } else {
          mutatedGene += this.gene[i];
        }
      }
  
      return new Chromosome(mutatedGene);
    }
  }
  
  class GeneticAlgorithm {
    static target = "esra"; //Hedef metin
    static chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static mutationRate = 0.01;
  
    constructor(populationSize) {
      this.populationSize = populationSize;
      this.population = [];
  
      for (let i = 0; i < this.populationSize; i++) {
        let gene = '';
        for (let j = 0; j < GeneticAlgorithm.target.length; j++) {
          let randomIndex = Math.floor(Math.random() * GeneticAlgorithm.chars.length);
          gene += GeneticAlgorithm.chars[randomIndex];
        }
        this.population.push(new Chromosome(gene));
      }
    }
    // genetik algoritmanın ana evrim adımını gerçekleştirir. Bu adımda seçim, 
    // çaprazlama ve mutasyon işlemleri gerçekleştirilir.
    evolve() {
      let newPopulation = [];
  
      // Selection
      let [parent1, parent2] = Chromosome.getBestTwo(this.population);
  
      // Crossover
      let child1 = parent1.crossover(parent2);
      let child2 = parent2.crossover(parent1);
  
      // Mutation
      child1 = child1.mutate();
      child2 = child2.mutate();
  
      newPopulation.push(child1);
      newPopulation.push(child2);
  
      // Add some more children through crossover and mutation if needed
  
      this.population = newPopulation;
    }
  }
  
  // GeneticAlgorithm sınıfından bir örnek oluşturun
  let geneticAlgorithm = new GeneticAlgorithm(10); // Örnek olarak popülasyon boyutunu 10 olarak belirledik
  
  // Belirli bir sayıda evrim adımı yapmak için bir döngü oluşturun
  for (let i = 0; i < 10000; i++) { // Örnek olarak 10 evrim adımı gerçekleştirdik
    console.log(`Generation ${i+1}:`);
    console.log(geneticAlgorithm.population); // Her evrim adımından sonra popülasyonu yazdırın
    geneticAlgorithm.evolve(); // Evrim adımını gerçekleştirin
  }
  