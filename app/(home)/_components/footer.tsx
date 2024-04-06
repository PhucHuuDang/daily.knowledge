import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { COMMUNITY, COMPANY, PRODUCTS } from "@/config/footer-list";
import { Facebook, Github, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div
      className="
      flex
      items-center
      justify-center
      bg-gradient-to-r
      border-t
      border-[#ED1E79]
      from-slate-900
      to-slate-700"
    >
      <div
        className="
          flex
          flex-col
          items-start
          justify-start
          text-neutral-400
          py-10 
        "
      >
        <div
          className="
            flex
            items-center
            justify-around
            gap-x-60
            mx-8
            md:mx-5
            py-5
            px-3
            border-b
            border-slate-600
        "
        >
          <div className="flex flex-col gap-y-14">
            <div className="flex flex-col justify-start gap-4">
              <Logo />
              {/* // * This is a description of the daily.dev platform */}
              <div className="text-2xl md:text-xl">
                daily.knowledge is a professional network for developers to{" "}
                <br />
                learn, collaborate, and grow together.
              </div>
            </div>

            <div className="flex flex-col justify-start gap-y-7">
              <div className="w-auto">
                <Button className="border border-white rounded-lg hover:underline hover:opacity-95 py-4 px-6">
                  <Link href="/">Start reading</Link>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src="/images/x.svg"
                  width={18}
                  height={18}
                  alt="X"
                  className=" hover:cursor-pointer bg-slate-900  hover:opacity-85 transition"
                  // style={{ fill: "black" }}
                />

                <Link href="">
                  <Instagram className="h-7 w-7 hover:cursor-pointer hover:text-slate-300 transition" />
                </Link>

                <Link href="">
                  <Github className="h-7 w-7 hover:cursor-pointer fill-slate-800 hover:fill-slate-200 hover:text-slate-300 transition" />
                </Link>

                <Link href="">
                  <Facebook className="h-7 w-7 hover:cursor-pointer hover:text-slate-300 transition" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-around gap-x-14">
            <div className="flex flex-col item-center gap-y-3 gap-x-4 h-[400px] md:h-[350px] py-5 px-0">
              <span className="text-lg text-amber-700 font-bold mb-1">
                Product
              </span>

              {PRODUCTS.map((product) => (
                <Link
                  key={product.label}
                  href={product.href}
                  className="text-slate-300 font-light hover:cursor-pointer hover:underline hover:text-amber-700 transition"
                >
                  {product.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col item-center gap-y-3 gap-x-4 flex-none shrink h-[400px] md:h-[350px] py-5 px-0">
              <span className="text-lg text-amber-700 font-bold mb-1">
                COMMUNITY
              </span>

              {COMMUNITY.map((product) => (
                <Link
                  key={product.label}
                  href={product.href}
                  className="text-slate-300 font-light hover:cursor-pointer hover:underline hover:text-amber-700 transition"
                >
                  {product.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col item-center gap-y-3 gap-x-4 flex-none shrink h-[400px] md:h-[350px] py-5 px-0">
              <span className="text-lg text-amber-700 font-bold mb-1">
                COMPANY
              </span>

              {COMPANY.map((product) => (
                <Link
                  key={product.label}
                  href={product.href}
                  className="text-slate-300 font-light hover:cursor-pointer hover:underline hover:text-amber-700 transition"
                >
                  {product.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-black py-16 px-3 md:px-5">
          <div className="flex items-center gap-4 justify-center text-neutral-400">
            <div className=" text-neutral-400">© 2024 Daily Knowledge Ltd.</div>

            <div className=" cursor-pointer hover:underline hover:text-amber-600">
              Term
            </div>

            <div className="text-slate-700 mx-2">|</div>

            <div className="cursor-pointer hover:underline hover:text-amber-600">
              Privacy
            </div>
            <div className="text-slate-700 mx-2">|</div>

            <div className="cursor-pointer hover:underline hover:text-amber-600">
              Guidelines
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
