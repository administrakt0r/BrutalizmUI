import AlertDemo from "@/examples/ui/alert"

import dynamic from "next/dynamic"

import { LazyRender } from "@/components/app/lazy-render"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// ⚡ Bolt: Convert all heavy demo components to dynamic imports to improve First Load JS.
const AccordionDemo = dynamic(() => import("./demos/accordion"))
const CardDemo2 = dynamic(() => import("./demos/card-2"))
const CardDemo3 = dynamic(() => import("./demos/card-3"))
const CarouselDemo = dynamic(() => import("./demos/carousel"))
const CollapsibleDemo = dynamic(() => import("./demos/collapsible"))
const CommandDemo = dynamic(() => import("./demos/command"))
const ImageCardDemo = dynamic(() => import("./demos/image-card"))
const ResizableDemo = dynamic(() => import("./demos/resizable"))
const ScrollAreaDemo = dynamic(() => import("./demos/scroll-area"))

export default function ExampleComponents() {
  return (
    <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-10 gap-5 not-prose">
      <div className="flex flex-col gap-5">
        <LazyRender className="min-h-[100px]">
          <CollapsibleDemo />
        </LazyRender>
        <LazyRender className="min-h-[200px]">
          <AccordionDemo />
        </LazyRender>
        <LazyRender className="min-h-[200px]">
          <CarouselDemo />
        </LazyRender>
        <AlertDemo />
        <LazyRender className="min-h-[350px]">
          <CardDemo2 />
        </LazyRender>
      </div>
      <div className="lg:flex hidden flex-col gap-5">
        <LazyRender className="min-h-[300px]">
          <ScrollAreaDemo />
        </LazyRender>
        <AlertDemo />
        <LazyRender className="min-h-[350px]">
          <CardDemo3 />
        </LazyRender>
        <LazyRender className="min-h-[300px]">
          <ImageCardDemo />
        </LazyRender>
      </div>
      <div className="sm:flex hidden flex-col gap-5">
        <LazyRender className="min-h-[200px]">
          <ResizableDemo />
        </LazyRender>
        <LazyRender className="min-h-[565px]">
          <CommandDemo />
        </LazyRender>
        <LazyRender className="min-h-[350px]">
          <CardDemo />
        </LazyRender>
      </div>
    </div>
  )
}

const CardDemo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label autoFocus={false} htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                autoFocus={false}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label autoFocus={false} htmlFor="password">
                  Password
                </Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required autoFocus={false} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="neutral" className="w-full">
          Login with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}
