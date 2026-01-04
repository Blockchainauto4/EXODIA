
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface UserLocation {
  city: string;
  state: string;
  specialty?: string;
  lat?: number;
  lng?: number;
}

export const BRAZIL_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const CITIES_BY_STATE: Record<string, string[]> = {
  'AC': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó', 'Brasiléia', 'Senador Guiomard'],
  'AL': ['Maceió', 'Arapiraca', 'Rio Largo', 'Palmeira dos Índios', 'Penedo', 'União dos Palmares', 'São Miguel dos Campos'],
  'AP': ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Mazagão', 'Porto Grande', 'Tartarugalzinho'],
  'AM': ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari', 'Tabatinga', 'Maués', 'Tefé'],
  'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna', 'Juazeiro', 'Ilhéus', 'Lauro de Freitas', 'Jequié', 'Teixeira de Freitas', 'Barreiras', 'Porto Seguro', 'Simões Filho'],
  'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Itapipoca', 'Maranguape', 'Iguatu', 'Quixadá', 'Pacatuba', 'Aquiraz'],
  'DF': ['Brasília', 'Taguatinga', 'Ceilândia', 'Gama', 'Sobradinho', 'Guará', 'Planaltina', 'Samambaia', 'Santa Maria', 'Águas Claras'],
  'ES': ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Cachoeiro de Itapemirim', 'Linhares', 'Colatina', 'Guarapari', 'São Mateus', 'Aracruz'],
  'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia', 'Águas Lindas de Goiás', 'Valparaíso de Goiás', 'Trindade', 'Formosa', 'Novo Gama'],
  'MA': ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon', 'Caxias', 'Codó', 'Paço do Lumiar', 'Açailândia', 'Bacabal', 'Balsas'],
  'MT': ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra', 'Cáceres', 'Sorriso', 'Lucas do Rio Verde', 'Primavera do Leste', 'Barra do Garças'],
  'MS': ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã', 'Naviraí', 'Nova Andradina', 'Aquidauana', 'Sidrolândia'],
  'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga', 'Sete Lagoas', 'Divinópolis', 'Santa Luzia', 'Ibirité'],
  'PA': ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Castanhal', 'Parauapebas', 'Abaetetuba', 'Cametá', 'Marituba', 'Bragança', 'Altamira', 'Barcarena'],
  'PB': ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux', 'Sousa', 'Cabedelo', 'Cajazeiras', 'Guarabira', 'Sapé'],
  'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu', 'Colombo', 'Guarapuava', 'Paranaguá', 'Araucária', 'Toledo', 'Apucarana', 'Pinhais'],
  'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Paulista', 'Cabo de Santo Agostinho', 'Vitória de Santo Antão', 'Igarassu', 'Camaragibe', 'Garanhuns'],
  'PI': ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Floriano', 'Barras', 'Campo Maior', 'União', 'Altos'],
  'RJ': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Campos dos Goytacazes', 'Belford Roxo', 'São João de Meriti', 'Petrópolis', 'Volta Redonda', 'Magé', 'Itaboraí', 'Macaé', 'Cabo Frio'],
  'RN': ['Natal', 'Mossoró', 'Parnamirim', 'Caicó', 'Ceará-Mirim', 'São Gonçalo do Amarante', 'Macaíba', 'Currais Novos', 'São José de Mipibu'],
  'RS': ['Porto Alegre', 'Caxias do Sul', 'Canoas', 'Pelotas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo', 'São Leopoldo', 'Rio Grande', 'Passo Fundo', 'Sapucaia do Sul', 'Uruguaiana', 'Santa Cruz do Sul'],
  'RO': ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal', 'Rolim de Moura', 'Jaru', 'Guajará-Mirim'],
  'RR': ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Mucajaí', 'Cantá', 'Bonfim', 'Pacaraima'],
  'SC': ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Chapecó', 'Itajaí', 'Criciúma', 'Jaraguá do Sul', 'Lages', 'Palhoça', 'Balneário Camboriú', 'Brusque'],
  'SP': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'São José dos Campos', 'Ribeirão Preto', 'Osasco', 'Sorocaba', 'Mauá', 'São José do Rio Preto', 'Mogi das Cruzes', 'Santos', 'Diadema', 'Jundiaí', 'Piracicaba', 'Carapicuíba', 'Bauru', 'Itaquaquecetuba', 'São Vicente', 'Franca', 'Guarujá', 'Praia Grande', 'Taubaté', 'Limeira', 'Suzano'],
  'SE': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'São Cristóvão', 'Estância', 'Tobias Barreto', 'Simão Dias'],
  'TO': ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins', 'Colinas do Tocantins', 'Guaraí', 'Tocantinópolis']
};

export const SPECIALTIES = [
  'Clínica Geral', 'Cardiologia', 'Pediatria', 'Saúde Mental', 'Ginecologia', 'Ortopedia', 'Neurologia', 'Dermatologia', 'Endocrinologia', 'Geriatria', 'Oftalmologia', 'Urologia', 'Otorrinolaringologia', 'Psiquiatria', 'Radiologia', 'Nutrição'
];
