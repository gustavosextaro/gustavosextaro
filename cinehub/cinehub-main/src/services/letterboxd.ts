// This is a mock service to allow the app to build and run.
// The GenAI flow `topMovieRecommendationsFlow` depends on this function.
// In a real application, this would fetch data from the Letterboxd API.

export type Movie = {
  title: string;
  plot: string;
  genre: string;
};

export async function getTopRatedMovies(): Promise<Movie[]> {
  // Returning static mock data
  return [
    { 
      title: 'The Outrun', 
      plot: 'Após uma passagem pela reabilitação, uma jovem retorna à fazenda de ovelhas onde cresceu, nas Ilhas Orkney, na Escócia, e tenta lidar com seu passado.', 
      genre: 'Drama' 
    },
    { 
      title: 'White Bird in a Blizzard', 
      plot: 'Em 1988, a vida de uma adolescente é lançada no caos quando sua mãe desaparece.', 
      genre: 'Drama' 
    },
    { 
      title: 'Neurotic Quest for Serenity', 
      plot: 'Um grupo de pacientes com transtorno obsessivo-compulsivo espera pela chegada de seu terapeuta para suas consultas e precisa suportar os hábitos estranhos uns dos outros.', 
      genre: 'Comédia' 
    },
    {
      title: 'Comrades, Almost a Love Story',
      plot: 'Dois imigrantes da China continental em Hong Kong formam uma amizade próxima que beira o romance, mas as circunstâncias e suas próprias escolhas os mantêm separados ao longo de uma década.',
      genre: 'Romance'
    },
    {
      title: 'A Traveler’s Needs',
      plot: 'Uma mulher francesa, incapaz de falar coreano, torna-se professora de duas mulheres coreanas, usando um método único de expressão emocional para se comunicar.',
      genre: 'Drama'
    },
    {
      title: 'How to Make Millions Before Grandma Dies',
      plot: 'Um jovem abandona o emprego para cuidar de sua avó com uma doença terminal, na esperança de herdar sua fortuna, mas aprende uma lição mais profunda sobre família.',
      genre: 'Comédia-Drama'
    },
    {
      title: 'The Beast',
      plot: 'Em um futuro próximo onde as emoções se tornaram uma ameaça, Gabrielle decide purificar seu DNA em uma máquina que a mergulhará em suas vidas passadas e se livrará de todos os sentimentos fortes.',
      genre: 'Ficção Científica'
    },
    {
      title: 'Funny Games',
      plot: 'Dois jovens psicopatas pegam uma família de refém em sua casa de férias e os forçam a participar de jogos sádicos.',
      genre: 'Suspense'
    },
    {
      title: 'But I’m a Cheerleader',
      plot: 'Uma líder de torcida adolescente ingênua é enviada para um campo de terapia de conversão para "curar" seu lesbianismo.',
      genre: 'Comédia'
    },
    {
      title: 'The Adults',
      plot: 'Uma viagem de volta para casa se torna complicada para uma mulher quando ela descobre que o vício de seu irmão em pôquer está fora de controle.',
      genre: 'Comédia-Drama'
    },
    {
      title: 'Portrait of a Lady on Fire',
      plot: 'Na França do século XVIII, uma pintora é contratada para fazer o retrato de casamento de uma jovem relutante, e um romance proibido se desenvolve entre elas.',
      genre: 'Romance'
    },
    {
      title: 'Valerie and Her Week of Wonders',
      plot: 'Uma jovem adolescente passa por uma série de eventos surreais e oníricos durante uma semana em uma cidade rural tcheca.',
      genre: 'Fantasia'
    },
    {
      title: 'Deep End',
      plot: 'Um jovem de 15 anos que trabalha em uma casa de banhos de Londres desenvolve uma obsessão por sua colega de trabalho mais velha.',
      genre: 'Drama'
    }
  ];
}
