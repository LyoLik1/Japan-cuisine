import { FC } from "react";
export const PromoText: FC = () => {
  return (
    <section className="text-center max-w-2xl w-[90%] m-[auto] mt-[-160px] relative bg-[#6b068aeb] text-primary-white rounded-2xl p-[25px] shadow-[0_1px_20px_10px_rgba(0,0,0,0.25)]">
      <h2 className="text-3xl mt-[0px]">
        Online Sushi Restoraunt Japan Cuisine
      </h2>
      <p className="mt-[15px]">
        Japan Cuisine-this is online sushii-restoraunt,where you can enjoy the
        best of Japanese cuisine.Our chefs are experts in this cuisine.
      </p>
      <p className="mt-[10px]">
        Fast service and high-quality ingredients, combined with authentic
        components, enhance the flavor of the dishes and provide a delightful
        dining experience.
      </p>
    </section>
  );
};
