export type PickItem = {
  productName: string;
  quantity: number;
};

const Pick = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/pick`);
  const items: Array<PickItem> = await data.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Here's the list of products for the picking team</h1>
        <ol>
          {items.map((item, index) => (
            <li key={`${index}_${item.productName}`}>
              {item.productName} x {item.quantity}
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
};

export default Pick;
