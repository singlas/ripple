"use client";

interface SceneDisplayProps {
  text: string;
}

export default function SceneDisplay({ text }: SceneDisplayProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <p className="text-lg leading-relaxed text-gray-800">{text}</p>
    </div>
  );
}
