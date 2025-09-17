import { PricingTable } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
const page = () => {
  return (
    <section className="flex h-full items-center justify-center">
      <div className="flex h-full w-1/2 flex-col items-center justify-center border-2 border-red-400">
        <h1 className="mb-4">Choose Your Plan</h1>
        <PricingTable
          className="border-2 border-blue-400"
          appearance={{
            baseTheme: neobrutalism,
          }}
        />
      </div>
    </section>
  );
};

export default page;
