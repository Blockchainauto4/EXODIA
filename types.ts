
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

export interface JobOpportunity {
  id: string;
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY';
  hiringOrganization: string;
  city: string;
  state: string;
  specialty: string;
  salary?: string;
  contactWhatsapp?: string;
  contactUrl?: string;
  dates?: string[];
}

export const BRAZIL_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const CITIES_BY_STATE: Record<string, string[]> = {
  'AC': ['Rio Branco', 'Cruzeiro do Sul'],
  'AL': ['Maceió', 'Arapiraca'],
  'AP': ['Macapá', 'Santana'],
  'AM': ['Manaus', 'Parintins'],
  'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
  'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte'],
  'DF': ['Brasília', 'Taguatinga'],
  'ES': ['Vitória', 'Vila Velha', 'Serra'],
  'GO': ['Goiânia', 'Anápolis'],
  'MA': ['São Luís', 'Imperatriz'],
  'MT': ['Cuiabá', 'Várzea Grande'],
  'MS': ['Campo Grande', 'Dourados'],
  'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora'],
  'PA': ['Belém', 'Ananindeua', 'Santarém'],
  'PB': ['João Pessoa', 'Campina Grande'],
  'PR': ['Curitiba', 'Londrina', 'Maringá', 'Paranaguá', 'Lapa'],
  'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda'],
  'PI': ['Teresina', 'Parnaíba'],
  'RJ': [
    'Rio de Janeiro', 'São Gonçalo', 'Niterói', 'Duque de Caxias', 'Nova Iguaçu', 
    'Belford Roxo', 'São João de Meriti', 'Campos dos Goytacazes', 'Petrópolis', 'Volta Redonda', 'Barra Mansa'
  ],
  'RN': ['Natal', 'Mossoró'],
  'RS': ['Porto Alegre', 'Caxias do Sul', 'Região Central', 'Região Noroeste'],
  'RO': ['Porto Velho', 'Ji-Paraná'],
  'RR': ['Boa Vista'],
  'SC': ['Florianópolis', 'Joinville', 'Blumenau'],
  'SP': [
    'São Paulo', 'Guarulhos', 'Campinas', 'José Bonifácio', 'Vila Matilde', 'Santo André', 
    'São Caetano do Sul', 'São Bernardo do Campo', 'Osasco', 'São José do Rio Preto', 
    'Ribeirão Preto', 'Santos', 'Mogi das Cruzes', 'Jundiaí', 'Itapecerica da Serra', 'Icém', 'São Vicente'
  ],
  'SE': ['Aracaju'],
  'TO': ['Palmas']
};

export const SPECIALTIES = [
  'Clínica Geral', 'Cardiologia', 'Pediatria', 'Saúde Mental', 'Ginecologia', 'Ortopedia', 'Neurologia', 'Dermatologia', 'Endocrinologia', 'Geriatria', 'Oftalmologia', 'Urologia', 'Otorrinolaringologia', 'Psiquiatria', 'Radiologia', 'Nutrição', 'Alergologia', 'Angiologia', 'Cirurgia Geral', 'Gastroenterologia', 'Hematologia', 'Infectologia', 'Mastologia', 'Nefrologia', 'Neuropediatria', 'Pneumologia', 'Proctologia', 'Reumatologia', 'Nutrologia', 'Neonatologia', 'Anestesiologia', 'Emergencista'
];
