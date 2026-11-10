import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

/** A team member: portrait that opens from the bottom, name rising beside it. Alternates sides. */
export default function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className="grid gap-10 md:grid-cols-2 md:items-end md:gap-16">
      <div
        data-clip
        data-parallax
        className={`relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-forest-900 ${flip ? "md:order-2" : ""}`}
      >
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}, ${member.role}`}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 45vw, 100vw"
        />
      </div>
      <div className="md:pb-6">
        <p data-reveal className="text-sm font-bold text-gold-400">{member.role}</p>
        <h3 data-split className="h-display mt-4 text-[clamp(2.5rem,5vw,4.5rem)]">{member.name}</h3>
        <p data-reveal className="mt-8 max-w-md text-lg leading-relaxed text-parchment/70">{member.bio}</p>
      </div>
    </article>
  );
}
