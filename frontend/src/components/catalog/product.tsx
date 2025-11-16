'use client'

import { Card, Text, Button, Image } from '@telegram-apps/telegram-ui'
import { useRouter } from 'next/navigation'
import { Product } from '@/types/product'

interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const router = useRouter()

    return (
        <Card
            style={{ marginBottom: 16, cursor: 'pointer' }}
            onClick={() => router.push(`/catalog/${product.id}`)}
        >
            <Image
                src={product.images[0]}
                alt={product.name}
                style={{
                    width: '100%',
                    height: 180,
                    objectFit: 'cover',
                    borderRadius: 12,
                }}
            />

            <div style={{ padding: '12px 12px 16px' }}>
                <Text weight="2" style={{ fontSize: 18 }}>
                    {product.name}
                </Text>

                <Text style={{ opacity: 0.8, marginTop: 4 }}>
                    {product.description.slice(0, 40)}…
                </Text>

                <div
                    style={{
                        marginTop: 12,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text weight="2">{product.price} ₽</Text>

                    <Button
                        mode="bezeled"
                        size="s"
                        onClick={(e) => {
                            e.stopPropagation()
                            // позже подключишь addToCart()
                        }}
                    >
                        В корзину
                    </Button>
                </div>
            </div>
        </Card>
    )
}
