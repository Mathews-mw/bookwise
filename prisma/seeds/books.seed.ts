/* eslint-disable prettier/prettier */
import { Prisma, PrismaClient } from '@prisma/client';
import { resolve } from 'path';

const prisma = new PrismaClient();

const booksData: Prisma.BookCreateInput[] = [
	{
		title: '14 Hábitos de Desenvolvedores Altamente Produtivos',
		author: 'Zeno Rocha',
		total_pages: 135,
		cover_image: '1679877729856-14-habitos-de-desenvolvedores-altamente-produtivos.png',
	},
  {
    title: 'Arquitetura limpa: O guia do artesão para estrutura e design de software',
		author: 'Robert C. Martin',
		total_pages: 432,
		cover_image: '1679878346642-arquitetura-limpa.png',
  },
  {
    title: 'A revolução dos bichos: Um conto de fadas',
		author: 'George Orwell',
		total_pages: 152,
		cover_image: '1679878711369-Book.png',
  },
  {
    title: 'Código limpo: Habilidades práticas do Agile Software',
		author: 'Robert C. Martin',
		total_pages: 425,
		cover_image: '1679878907663-codigo-limpo.png',
  },
  {
    title: 'Domain-Driven Design: Atacando as complexidades no coração do software',
		author: 'Eric Evans',
		total_pages: 528,
		cover_image: '1679879091991-domain-driven-design.png',
  },
  {
    title: 'Entendendo Algoritmos: Um Guia Ilustrado Para Programadores e Outros Curiosos',
		author: 'Aditya Y. Bhargava',
		total_pages: 264,
		cover_image: '1679879171578-entendendo-algoritmos.png',
  },
  {
    title: 'Fragmentos do Horror',
		author: 'Junji Ito',
		total_pages: 224,
		cover_image: '1679879290003-fragmentos-do-horror.png',
  },
  {
    title: 'Histórias extraordinárias',
		author: 'Edgar Allan Poe ',
		total_pages: 448,
		cover_image: '1679879375459-historias-extraordinarias.png',
  },
  {
    title: 'O Fim da Eternidade',
		author: 'Isaac Asimov',
		total_pages: 256,
		cover_image: '1679879468946-o-fim-da-eternidade.png',
  },
  {
    title: 'O guia do mochileiro das galáxias',
		author: 'Douglas Adams',
		total_pages: 241,
		cover_image: '1679879566313-o-guia-do-mochileiro-das-galaxias.png',
  },
  {
    title: 'O Hobbit',
		author: 'J. R. R. Tolkien',
		total_pages: 336,
		cover_image: '1679879659882-o-hobbit.png',
  },
  {
    title: 'O poder do hábito',
		author: 'Charles Duhigg',
		total_pages: 408,
		cover_image: '1679879772543-o-poder-do-habito.png',
  },
  {
    title: 'O programador pragmático',
		author: 'David Thomas',
		total_pages: 352,
		cover_image: '1679879885184-o-programador-pragmatico.png',
  },
  {
    title: 'Refatoração: Aperfeiçoando o Design de Códigos Existentes',
		author: 'Martin Fowler',
		total_pages: 456,
		cover_image: '1679879943736-refatoracao.png',
  },
  {
    title: 'O Programador Apaixonado: Construindo uma carreira notável em desenvolvimento de software',
		author: 'Chad Fowler',
		total_pages: 266,
		cover_image: '1679880121176-programador-apaixonado.jpg',
  },
  {
    title: 'O universo da programação: Um guia de carreira em desenvolvimento de software',
		author: 'William Oliveira',
		total_pages: 216,
		cover_image: '1679880207344-universo-da-programacao.jpg',
  },
  {
    title: 'Respostas de um astrofísico',
		author: 'Neil deGrasse Tyson',
		total_pages: 272,
		cover_image: '1679880607945-51D5Lih7vSL._SX325_BO1,204,203,200_.jpg',
  },
  {
    title: 'The Witcher: Tempo do desprezo',
		author: 'Andrzej Sapkowski',
		total_pages: 352,
		cover_image: '1679880709693-41fTkkAY7LL._SX330_BO1,204,203,200_.jpg',
  },
  {
    title: 'The Witcher: A espada do destino',
		author: 'Andrzej Sapkowski',
		total_pages: 384,
		cover_image: '1679880771905-41ca+8zJ2CL._SX333_BO1,204,203,200_.jpg',
  },
  {
    title: 'The Witcher: O sangue dos elfos',
		author: 'Andrzej Sapkowski',
		total_pages: 328,
		cover_image: '1679880847808-41U6YR07D+L._SX332_BO1,204,203,200_.jpg',
  },
  {
    title: 'The Witcher: O último desejo',
		author: 'Andrzej Sapkowski',
		total_pages: 318,
		cover_image: '1679865672868-witcher_book_cover.jpg',
  },
];
