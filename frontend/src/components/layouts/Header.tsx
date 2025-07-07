import Link from "next/link";
import { Check, ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Header = () => {
  return (
    <nav className="flex justify-between px-5 py-5 bg-obsidian">
      <div className="flex gap-3">
        <img src="/logo.png" alt="logo" className="w-[46px]" />
        <div>
          <h4 className="text-xl font-semibold leading-7 text-snow-white">
            Nom <span className="text-cherry-red">Nom</span>
          </h4>
          <p className="text-xs font-normal leading-4 text-cloude-gray">
            Swift delivery
          </p>
        </div>
      </div>
      {/* <Alert className="w-full max-w-[400px] h-full max-h-12 font-medium text-xl leading-4">
        <Check />
        <AlertTitle>Food is being added to the cart!</AlertTitle>
      </Alert> */}
      <div className="flex gap-2">
        {/* <Link href="/auth/signup">
          <Button className="mr-3 bg-cloude-gray text-obsidian button">
            Sign up
          </Button>
        </Link>
        <Link href="/auth/signin">
          <Button className="bg-cherry-red text-snow-white button">
            Sign in
          </Button>
        </Link> */}
        <Button className="bg-white rounded-full">
          <MapPin className="text-cherry-red" />
          <span className="text-cherry-red">Delivery address:</span>
          <span className="text-slate-gray">Add Location</span>
          <ChevronRight className="text-slate-gray" />
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <ShoppingCart />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white text-black p-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <ShoppingCart />
                <h4 className="font-semibold text-xl">Order detail</h4>
              </div>
              {/* <Button className="button bg-[#E4E4E7]">x</Button> */}
            </div>
            <div className="text-black w-full rounded-full bg-red-500 flex">
              <Button className="flex-1/2 bg-amber-400 button">Cart</Button>
              <Button className="flex-1/2 button">Order</Button>
            </div>
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                  <Button variant="link">Sign Up</Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                  <Button variant="link">Sign Up</Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </CardFooter>
            </Card>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-cherry-red">
            <Button className="rounded-full text-snow-white size-9">
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white flex flex-col items-center px-6 py-4 gap-1.5">
            <h4 className="text-xl font-semibold leading-7 text-midnight-black">
              User@gmail.com
            </h4>
            <Button className="text-obsidian bg-cloude-gray button">
              Sign out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* <Card className="absolute top-[50%] left-[50%] bg-white w-full max-w-lg">
        <CardHeader className="flex justify-center">
          <CardTitle className="text-2xl font-semibold text-obsidian leading-8">
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
      </Card> */}
    </nav>
  );
};

export default Header;
