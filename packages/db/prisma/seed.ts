import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.upsert({
      where: { number: '9999999999' },
      update: {},
      create: {
        number: '9999999999',
        password: 'alice',
        name: 'alice',
        Balance: {
          create: {
              amount: 20000,
              locked: 0
          }
        },
        OnRampingTransaction: {
          create: {
            startTime: new Date(),
            status: "sucess",
            amount: 20000,
            token: "122",
            provider: "HDFC Bank",
          },
        },
      },
    })
    const bob = await prisma.user.upsert({
      where: { number: '9999999998' },
      update: {},
      create: {
        number: '9999999998',
        password: 'bob',
        name: 'bob',
        Balance: {
          create: {
              amount: 20000,
              locked: 0
          }
        },
        OnRampingTransaction: {
          create: {
            startTime: new Date(),
            status: "failed",
            amount: 2000,
            token: "123",
            provider: "HDFC Bank",
          },
        },
      },
    })
    const om = await prisma.user.upsert({
      where: { number: '9685001268' },
      update: {number: '9685001268',
        password: '$2b$10$7TLktWoL7Ft5YQ.8da0k4.0wSna1L2CrpkkTDmFfMNjSLo0MsqHNi',
        name: 'om',
        Balance: {
          create: {
              amount: 20000,
              locked: 0
          }
        },
        OnRampingTransaction: {
          create: {
            startTime: new Date(),
            status: "sucess",
            amount: 2000,
            token: "1237",
            provider: "HDFC Bank",
          },
        },},
      create: {
        number: '9685001268',
        password: '$2b$10$7TLktWoL7Ft5YQ.8da0k4.0wSna1L2CrpkkTDmFfMNjSLo0MsqHNi',
        name: 'om',
        Balance: {
          create: {
              amount: 20000,
              locked: 0
          }
        },
        OnRampingTransaction: {
          create: {
            startTime: new Date(),
            status: "sucess",
            amount: 2000,
            token: "1237",
            provider: "HDFC Bank",
          },
        },
    }})
    console.log({ alice, bob,om })
  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })