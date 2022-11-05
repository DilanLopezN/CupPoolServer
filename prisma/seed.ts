import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Dislans',
      email: 'diladnlplopez@gmail.com',
      avatarUrl: 'https://github.com/YannisHofmann.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'PoolTeste',
      code: 'DIL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-02T14:00:00.718Z',
      firstTeamCountryCode: 'AR',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-03T14:00:00.718Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'DE',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 3,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}
main()
