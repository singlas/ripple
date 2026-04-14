"use client";

import Image from "next/image";

interface SceneDisplayProps {
  text: string;
  image?: string;
}

export default function SceneDisplay({ text, image }: SceneDisplayProps) {
  return (
    <div>
      {image && (
        <div className="relative w-full aspect-[4/3] -mx-4 mb-4" style={{ width: "calc(100% + 2rem)" }}>
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <p className="text-lg leading-relaxed text-gray-800">{text}</p>
    </div>
  );
}
