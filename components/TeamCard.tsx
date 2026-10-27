"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export default function TeamCard({ member, index }: TeamCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.45, ease: "power3.out" });
    const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.45, ease: "power3.out" });

    gsap.set(card, { transformPerspective: 1000, transformOrigin: "center center" });

    const handlePointerEnter = () => {
      if (motionPreference.matches) return;
      gsap.to(card, { y: -6, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      gsap.to(image, { scale: 1.08, duration: 0.7, ease: "power3.out", overwrite: "auto" });
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (motionPreference.matches || event.pointerType !== "mouse") return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      rotateX(y * -4);
      rotateY(x * 4);
    };

    const handlePointerLeave = () => {
      if (motionPreference.matches) return;
      rotateX(0);
      rotateY(0);
      gsap.to(card, { y: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      gsap.to(image, { scale: 1, duration: 0.6, ease: "power3.out", overwrite: "auto" });
    };

    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
      gsap.killTweensOf([card, image]);
      gsap.set([card, image], { clearProps: "all" });
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="surface-card overflow-hidden grid md:grid-cols-2 group will-change-transform"
    >
      <div
        ref={imageRef}
        className={`relative min-h-[280px] md:min-h-[360px] overflow-hidden ${index % 2 === 1 ? "md:order-2" : ""}`}
      >
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}, ${member.role}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-8 md:p-12 flex flex-col justify-center">
        <span className="text-gold-600 font-bold text-sm tracking-widest mb-6">
          0{index + 1} <span className="text-gray-300 mx-2">/</span> THE TEAM
        </span>
        <h3 className="font-bold text-forest-950 text-2xl md:text-3xl font-heading">
          {member.name}
        </h3>
        <p className="text-gold-600 font-medium text-xs tracking-widest uppercase mt-2 mb-5">
          {member.role}
        </p>
        <div className="h-rule mb-5" aria-hidden="true" />
        <p className="text-gray-600 leading-relaxed">{member.bio}</p>
      </div>
    </article>
  );
}
