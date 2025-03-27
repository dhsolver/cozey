import Link from "next/link";

const Pack = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/pack`);
  const orders = await data.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Link href="/">Back</Link>

        <h1 className="text-4xl">
          Here is the list of orders for the packing team
        </h1>
        <ul className="list-disc list-inside">
          {orders.map((order, orderIndex) => (
            <li key={`${order.id}_order`} className={"mb-6"}>
              <span className="text-3xl">Order #{orderIndex + 1}</span>
              <ul className="list-disc list-inside pl-6">
                <li>
                  <span className="text-2xl">
                    Order Date: {new Date(order.date).toLocaleDateString()}
                  </span>
                </li>
                <li>
                  <span className="text-2xl">Line Items</span>

                  <ul className="list-disc list-inside pl-6">
                    {order.lineItems.map((lineItem) => (
                      <li key={`${order.id}_order_${lineItem.id}_lineItem`}>
                        <span className="text-xl">{lineItem.name}</span>
                        <ul className="list-disc list-inside pl-6">
                          {lineItem.products.map((product) => (
                            <li
                              key={`${order.id}_order_${lineItem.id}_lineItem_${product.productId}_product`}
                            >
                              {product.product.name} x {product.quantity}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <span className="text-2xl">Ships to</span>
                  <ul className="list-disc list-inside pl-6">
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
