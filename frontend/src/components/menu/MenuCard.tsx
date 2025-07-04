import { Button } from "../ui/button";

const MenuCard = () => {
  return (
    <div className=" bg-white rounded-[20px] px-4 py-4 gap-5">
      <div className="relative">
        <img
          src="/cardImage.png"
          alt="food"
          className="rounded-xl aspect-3/2 object-cover"
        />
        {/* <Button className="rounded-full absolute">+</Button> */}
      </div>
      <div className="flex justify-between font-semibold leading-8 mt-4">
        <h3 className="text-2xl  text-destructive">Finger food </h3>
        <h3 className=" text-lg text-foreground">$12.99</h3>
      </div>
      <p className="font-normal text-sm leading-5 text-foreground mt-1">
        Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
      </p>
    </div>
  );
};

export default MenuCard;
//todo pass everything by props
//todo position button
