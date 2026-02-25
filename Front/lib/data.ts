export interface Guest {
  id: string
  name: string
  cpf: string
  phone: string
  email: string
  status: "pendente" | "confirmado"
}

export const mockGuests: Guest[] = [
  {
    id: "1",
    name: "Ana Clara Mendes",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    email: "ana.mendes@email.com",
    status: "confirmado",
  },
  {
    id: "2",
    name: "Bruno Ferreira Lima",
    cpf: "234.567.890-11",
    phone: "(21) 97654-3210",
    email: "bruno.lima@email.com",
    status: "pendente",
  },
  {
    id: "3",
    name: "Carla Souza Pereira",
    cpf: "345.678.901-22",
    phone: "(31) 96543-2109",
    email: "carla.pereira@email.com",
    status: "confirmado",
  },
  {
    id: "4",
    name: "Diego Oliveira Santos",
    cpf: "456.789.012-33",
    phone: "(41) 95432-1098",
    email: "diego.santos@email.com",
    status: "pendente",
  },
  {
    id: "5",
    name: "Elena Rodrigues Silva",
    cpf: "567.890.123-44",
    phone: "(51) 94321-0987",
    email: "elena.silva@email.com",
    status: "confirmado",
  },
  {
    id: "6",
    name: "Fernando Costa Almeida",
    cpf: "678.901.234-55",
    phone: "(61) 93210-9876",
    email: "fernando.almeida@email.com",
    status: "pendente",
  },
  {
    id: "7",
    name: "Gabriela Nascimento Dias",
    cpf: "789.012.345-66",
    phone: "(71) 92109-8765",
    email: "gabriela.dias@email.com",
    status: "pendente",
  },
  {
    id: "8",
    name: "Hugo Martins Ribeiro",
    cpf: "890.123.456-77",
    phone: "(81) 91098-7654",
    email: "hugo.ribeiro@email.com",
    status: "confirmado",
  },
  {
    id: "9",
    name: "Isabela Gomes Teixeira",
    cpf: "901.234.567-88",
    phone: "(91) 90987-6543",
    email: "isabela.teixeira@email.com",
    status: "pendente",
  },
  {
    id: "10",
    name: "Joaquim Barros Cardoso",
    cpf: "012.345.678-99",
    phone: "(11) 99876-5432",
    email: "joaquim.cardoso@email.com",
    status: "confirmado",
  },
  {
    id: "11",
    name: "Larissa Fernandes Rocha",
    cpf: "111.222.333-44",
    phone: "(21) 98765-1234",
    email: "larissa.rocha@email.com",
    status: "pendente",
  },
  {
    id: "12",
    name: "Marcos Henrique Campos",
    cpf: "222.333.444-55",
    phone: "(31) 97654-2345",
    email: "marcos.campos@email.com",
    status: "confirmado",
  },
]
