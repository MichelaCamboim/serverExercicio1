import express from "express";
import * as dotenv from "dotenv";

//habilitar o servidor a ter variáveis de ambientes
dotenv.config();

// instanciar a variável responsável pelo nosso servidor

const app = express();

// configurar o servidor para aceitar enviar e  receber
// arquivos em JSON

app.use(express.json());

console.log("Estou dentro do servidor criado  na aula");

// console.log(process.env); ver no terminal coisas
// contidas  no arquivo .env

// criando banco de dados

const bancoDados = [
  {
    id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29",
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
    dateInit: "28/11/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo agora está em análise final",
      "Processo já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Notebooks",
    status: "Em andamento",
    details: "Processo de licitação para compra de notebooks",
    dateInit: "30/11/2022",
    comments: ["Processo em aberto e sem previsão de conclusão"],
    dateEnd: "",
    setor: "tre",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Ar Condicionado",
    status: "Finalizado",
    details: "Processo de licitação para compra de ar-condicionado",
    dateInit: "15/11/2022",
    comments: ["Processo em aberto", "Processo finalizado"],
    dateEnd: "25/11/2022",
    setor: "trj",
  },
];

// criação das rotas
// acessando rota
app.get("/all", (req, res) => {
  return res.status(200).json(bancoDados);
});

//postando dados
app.post("/create", (req, res) => {
  const form = req.body;
  //console.log(req.body);
  //console.log(req.body.name);
  bancoDados.push(form);
  return res.status(201).json(bancoDados);
});
// editando dados

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const objEdit = bancoDados.finde((user) => user.id === id);
  const index = bancoDados.indexOf(objEdit);
  const clone = { ...objEdit, ...req.body };
  bancoDados[index] = clone;
  return res.status(201).json(bancoDados);
});

//deletando dados da collection
app.delete("/delete/:id", (req, resp) => {
  //console.log(req.params.id);
  const { id } = req.params; // essa linha retorna a mesma coisa que o console.log acima
  const deleteById = bancoDados.finde((user) => user.id === id);
  const index = bancoDados.indexOf(deleteById);
  bancoDados.splice(index, 1);
  return resp.status(200).json(bancoDados);
});

// iteração2

// acessando processo pelo ID
app.get("/process/:id", (req, resp) => {
  const { id } = req.params;
  const objeto = bancoDados.finde((user) => user.id === id);
  return resp.status(200).json(objeto);
});

// adicionando comentários na array de comentários,
app.put("/addComment/:id", (req, resp) => {
  const { id } = req.params;
  const objeto = bancoDados.finde((user) => user.id === id);
  const comments = req.body;
  objeto.push(comments);
  return resp.status(201).json(objeto);
});

// acessar processos em andamento
app.get("/status/open", (req, resp) => {
  const objeto = bancoDados.filter((element) => objeto.status === "open");
  return resp.status(200).json(objeto);
});

// acessar processos finalizados
app.get("/status/close", (req, resp) => {
  const objeto = bancoDados.filter((element) => objeto.status === "close");
  return resp.status(200).json(objeto);
});

// processo aleatório

app.get("/random", (req, resp) => {
  const index = Math.floor(Math.random() * bancoDados.length);
  const objeto = bancoDados[index];
  return resp.status(200).json(objeto);
});

// bonus
// rota que busquetodos os processos de um setor

app.get("/setor/:nomeSetor", (req, res) => {
  const { nomeSetor } = req.params;
  const objeto = bancoDados.filter(
    (element) => objeto.setor.toLowerCase() === nomeSetor.toLowerCase()
  );

  return res.status(200).json(objeto);
});

// server up and running

app.listen(process.env.PORT, () => {
  console.log(
    `App up and running  on port  http://localhost:${process.env.PORT}`
  );
});
