import { Button } from "../ui/button";

const MenuCard = () => {
  return (
    <div className=" bg-white rounded-[20px] px-4 py-4 gap-5">
      <div className="relative">
        <img
          src="/cardImage.png"
          alt="food"
          className="object-cover rounded-xl aspect-3/2"
        />
        {/* <Button className="absolute rounded-full">+</Button> */}
      </div>
      <div className="flex justify-between mt-4 font-semibold leading-8">
        <h3 className="text-2xl  text-destructive">Finger food </h3>
        <h3 className="text-lg  text-foreground">$12.99</h3>
      </div>
      <p className="mt-1 text-sm font-normal leading-5 text-foreground">
        Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
      </p>
    </div>
  );
};

export default MenuCard;
//todo pass everything by props
//todo position button
