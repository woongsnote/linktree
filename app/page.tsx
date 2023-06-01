import Image from "next/image";
import {
  RiGithubFill,
  RiKakaoTalkFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
} from "react-icons/ri";
import { get } from "@vercel/edge-config";
import { redirect } from "next/navigation";

interface Data {
  name: string;
  avatar: string;
  links: Link[];
  socials: Social[];
}

interface Social {
  title: string;
  href: string;
}

interface Link {
  href: string;
  title: string;
  image?: string;
}

function LinkCard({ href, title, image }: Link) {
  return (
    <a
      href={href}
      className="flex items-center p-1 w-full rounded-md hover:scale-105 transition-all mb-3 bg-gray-100 max-w-3xl"
    >
      <div className="flex text-center items-center justify-center w-full">
        <h2 className="flex justify-center items-center font-bold w-full text-gray-800 text-lg">
          {title}
        </h2>
      </div>
    </a>
  );
}

function getSocialIcon(socialHref: string) {
  switch (true) {
    case socialHref.includes("github"):
      return <RiGithubFill size={32} />;
    case socialHref.includes("instagram"):
      return <RiInstagramLine size={32} />;
    case socialHref.includes("linkedin"):
      return <RiLinkedinBoxFill size={32} />;
    default:
      return <RiKakaoTalkFill size={32} />;
  }
}

export const runtime = "edge";

export default async function Home() {
  const data: Data | undefined = await get("linktree");

  if (!data) {
    redirect("https://woongsnote.dev");
  }

  return (
    <main className="font-sans flex flex-col items-center justify-center mx-auto mt-16 px-8 md:px-20">
      <Image
        alt={data.name}
        src={data.avatar}
        width={96}
        height={96}
        priority
        className="rounded-full border p-2"
      />
      <h1 className="font-extrabold mt-4 text-2xl mb-8 text-white">
        {data.name}
      </h1>
      {data.links.map((link) => (
        <LinkCard key={link.href} {...link} />
      ))}
      <div className="flex items-center gap-8 mt-8 text-white">
        {data.socials.map((social) => (
          <a key={social.href} href={social.href}>
            {getSocialIcon(social.href)}
          </a>
        ))}
      </div>
    </main>
  );
}
