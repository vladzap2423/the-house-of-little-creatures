'use client'


export default function CartPage() {
  
  return (
    <div>
      <Title level="1">🛒 Корзина</Title>

      {items.length === 0 ? (
        <Text style={{ marginTop: 20 }}>Ваша корзина пуста 😢</Text>
      ) : (
        <>
          <div style={{ marginTop: 16 }}>
            {items.map((item) => (
              <Card
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 12,
                  padding: 8,
                  background: 'var(--tg-theme-secondary-bg-color)',
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={70}
                  height={70}
                  style={{ borderRadius: 8 }}
                />
                <div style={{ flex: 1 }}>
                  <Text weight="2">{item.name}</Text>
                  <Text style={{ fontSize: 14, opacity: 0.7 }}>
                    {item.price} ₽
                  </Text>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginTop: 8,
                    }}
                  >
                    <Button size="s" onClick={() => decrement(item.id)}>
                      -
                    </Button>
                    <Text>{item.quantity}</Text>
                    <Button size="s" onClick={() => increment(item.id)}>
                      +
                    </Button>
                  </div>
                </div>
                <Trash2
                  size={20}
                  style={{ cursor: 'pointer', opacity: 0.6 }}
                  onClick={() => removeItem(item.id)}
                />
              </Card>
            ))}
          </div>

          <Card
            style={{
              padding: 16,
              background: 'var(--tg-theme-secondary-bg-color)',
            }}
          >
            <Text weight="2">Итого: {total} ₽</Text>
            <Button
              mode="bezeled"
              size="l"
              style={{ marginTop: 12, width: '100%' }}
            >
              Оформить заказ
            </Button>
          </Card>
        </>
      )}
    </div>
  )
}
