const Pack = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/pack`);
  const orders = await data.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Here's the list of orders for the packing team</h1>
        <ul>
          {orders.map((order, index) => (
            <li>
              <h2>Order #{index + 1}</h2>
              <ul>
                <li>
                  <h3>
                    Order Date: {new Date(order.date).toLocaleDateString()}
                  </h3>
                </li>
                <li>
                  <h3>Line Items</h3>

                  <ul>
                    {order.lineItems.map((lineItem) => (
                      <li>
                        <h4>{lineItem.name}</h4>
                        <ul>
                          {lineItem.products.map((product) => (
                            <li>
                              {product.product.name} x {product.quantity}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <h3>Ships to</h3>
                  <ul>
                    <li>{order.customerName}</li>
                    <li>{order.shippingAddress}</li>
                  </ul>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Pack;
