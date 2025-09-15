import { PricingTable } from "@clerk/nextjs";

const page = () => {
  return (
    <section className="flex h-full items-center justify-center">
      <PricingTable />
    </section>
  );
};

export default page;
