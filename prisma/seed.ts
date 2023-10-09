import { PrismaClient } from '@prisma/client'
import { PRODUCTS, USER, IMAGES, AVATAR } from './seed-data'

const prisma = new PrismaClient()

/**
 * For each label name, create a Label record in the DB
 */

async function main() {
    await Promise.all(USER.map(n => prisma.user.create({ data: { email: n.email, name: n.name, externalId: n.externalId } })))
        .then((users) => {
            const userIds = users.map(n => n.id)
            seedProducts(userIds[0])
            seedAvatar(userIds)
        })
}

function seedProducts(userId: number) {
    Promise.all(PRODUCTS.map(n => {
        return prisma.product.create({ data: { name: n.name, price: n.price, userId: userId } })
    })).then((products) => {
        const productIds = products.map(n => n.id)
        seedImages(productIds)
    })

}

function seedAvatar(userIds: number[]) {
    Promise.all(AVATAR.map((n, index) => {
        const userId = userIds[index]
        return prisma.avatar.create({ data: { url: n.url, description: 'profile photo', userId: userId } })
    }))
}

function seedImages(productIds: number[]) {
    Promise.all(IMAGES.map((n, index) => {
        const productId = productIds[index]
        return prisma.photo.create({ data: { url: n.src, description: n.alt, productId: productId } })
    })).then(() => console.info('[SEED] Succussfully create records'))
        .catch(e => console.error('[SEED] Failed to create records', e))
}

main()
