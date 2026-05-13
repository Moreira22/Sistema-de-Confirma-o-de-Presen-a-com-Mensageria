import axios from "axios";
export interface Convidado {
  id: string
  nome: string
  cpf: string
  telefone: string
  email: string
  confirmado: boolean
}

export const mockConvidado: Convidado[] = [
  {
    id: "1",
    nome: "Ana Clara Mendes",
    cpf: "123.456.789-00",
    telefone: "(11) 98765-4321",
    email: "ana.mendes@email.com",
    confirmado: true,
  },
  {
    id: "2",
    nome: "Bruno Ferreira Lima",
    cpf: "234.567.890-11",
    telefone: "(21) 97654-3210",
    email: "bruno.lima@email.com",
    confirmado: false,
  },
  {
    id: "3",
    nome: "Carla Souza Pereira",
    cpf: "345.678.901-22",
    telefone: "(31) 96543-2109",
    email: "carla.pereira@email.com",
    confirmado: false,
  },
  {
    id: "4",
    nome: "Diego Oliveira Santos",
    cpf: "456.789.012-33",
    telefone: "(41) 95432-1098",
    email: "diego.santos@email.com",
    confirmado: true,
  },
  {
    id: "5",
    nome: "Elena Rodrigues Silva",
    cpf: "567.890.123-44",
    telefone: "(51) 94321-0987",
    email: "elena.silva@email.com",
    confirmado: true,
  },
  {
    id: "6",
    nome: "Fernando Costa Almeida",
    cpf: "678.901.234-55",
    telefone: "(61) 93210-9876",
    email: "fernando.almeida@email.com",
    confirmado: true,
  },
  {
    id: "7",
    nome: "Gabriela Nascimento Dias",
    cpf: "789.012.345-66",
    telefone: "(71) 92109-8765",
    email: "gabriela.dias@email.com",
    confirmado: false,
  },
  {
    id: "8",
    nome: "Hugo Martins Ribeiro",
    cpf: "890.123.456-77",
    telefone: "(81) 91098-7654",
    email: "hugo.ribeiro@email.com",
    confirmado: true,
  },
  {
    id: "9",
    nome: "Isabela Gomes Teixeira",
    cpf: "901.234.567-88",
    telefone: "(91) 90987-6543",
    email: "isabela.teixeira@email.com",
    confirmado: false,
  },
  {
    id: "10",
    nome: "Joaquim Barros Cardoso",
    cpf: "012.345.678-99",
    telefone: "(11) 99876-5432",
    email: "joaquim.cardoso@email.com",
    confirmado: true,
  },
  {
    id: "11",
    nome: "Larissa Fernandes Rocha",
    cpf: "111.222.333-44",
    telefone: "(21) 98765-1234",
    email: "larissa.rocha@email.com",
    confirmado: true,
  },
  {
    id: "12",
    nome: "Marcos Henrique Campos",
    cpf: "222.333.444-55",
    telefone: "(31) 97654-2345",
    email: "marcos.campos@email.com",
    confirmado: false,
  },
]

const API_URL = "http://localhost:8080/api/convidado/liste";

export async function buscarConvidados(): Promise<Convidado[]> {
  try {
    const response = await axios.get<Convidado[]>(API_URL);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar convidados:", error);
    return [];
  }
}
