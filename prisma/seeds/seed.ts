/* eslint-disable prettier/prettier */
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const categoriesData: Prisma.CategoryCreateInput[] = [
  {
    category: 'Computação'
  },
  {
    category: 'Educação'
  },
  {
    category: 'Fantasia'
  },
  {
    category: 'Ficção científica'
  },
  {
    category: 'Terror'
  },
  {
    category: 'HQs'
  },
  {
    category: 'Suspense'
  },
  {
    category: 'Romance'
  },
  {
    category: 'Policial e Suspense'
  },
  {
    category: 'Ação e aventura'
  },
  {
    category: 'Biografia'
  },
  {
    category: 'Humor'
  },
  {
    category: 'Autoajuda'
  },
  {
    category: 'Infantil'
  },
  {
    category: 'Contos'
  },
  {
    category: 'Drama'
  },
  {
    category: 'Graphic novel'
  },
  {
    category: 'Ciência'
  },
  {
    category: 'Astronomia'
  }
]

async function main() {
  
  console.log('Delete categories...');

  await prisma.category.deleteMany();
 
  console.log('All categories deleted'); 
  console.log('Start seeding...');

  for (const category of categoriesData) {
    const categorySeed = await prisma.category.create({
      data: category
    });

    console.log(`Created category: ${categorySeed.category}`);
  }

  console.log('Seeding Finished');
}

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (error) => {
  console.log('Categories Seeds Error: ', error);
  await prisma.$disconnect;
  process.exit(1);
})
