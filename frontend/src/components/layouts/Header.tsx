import Link from "next/link";
import { Check, ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const Header = () => {
  return (
    <nav className="flex justify-between px-5 py-5 bg-secondary-foreground">
      <div className="flex gap-3">
        <img src="/logo.png" alt="logo" className="w-[46px]" />
        <div>
          <h4 className="text-xl font-semibold leading-7 text-primary-foreground">
            Nom <span className="text-destructive">Nom</span>
          </h4>
          <p className="text-xs font-normal leading-4 text-secondary">
            Swift delivery
          </p>
        </div>
      </div>
      <Alert className="w-full max-w-[400px] h-full max-h-12 font-medium text-xl leading-4">
        <Check />
        <AlertTitle>Food is being added to the cart!</AlertTitle>
      </Alert>
      <div className="flex gap-2">
        <Link href="/auth/signup">
          <Button className="mr-3 bg-secondary text-secondary-foreground button">
            Sign up
          </Button>
        </Link>
        <Link href="/auth/login">
          <Button className="bg-destructive text-primary-foreground button">
            Log in
          </Button>
        </Link>
        {/* <Button className="bg-white rounded-full">
          <MapPin className="text-destructive" />
          <span className="text-destructive">Delivery address:</span>
          <span className="text-muted">Add Location</span>
          <ChevronRight className="text-secondary-foreground" />
        </Button>
        <Button className="rounded-full bg-secondary size-9">
          <ShoppingCart />
        </Button>
        <Button className="rounded-full bg-destructive size-9">
          <User />
        </Button> */}
      </div>
      {/* <div className="bg-white absolute top-20 right-20 rounded-xl flex flex-col items-center px-5 py-2.5 gap-1">
        <h4 className="text-xl font-semibold leading-7">user@gmail.com</h4>
        <Button className="text-sm font-normal rounded-full bg-secondary text-secondary-foreground ">
          Sign out
        </Button>
      </div> */}
      <Card className="absolute top-[50%] left-[50%] bg-white w-full max-w-lg">
        <CardHeader className="flex justify-center">
          <CardTitle className="text-2xl font-semibold text-foreground leading-8">
            Please write your delivery address!
          </CardTitle>
          <Button className="rounded-full">X</Button>
        </CardHeader>
        <form>
          <Input type="text" placeholder="Please share your complete address" />
          <div className="flex justify-end gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button>Deliver Here</Button>
          </div>
        </form>
      </Card>
    </nav>
  );
};

export default Header;
