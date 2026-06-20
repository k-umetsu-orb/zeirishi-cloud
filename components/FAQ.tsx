import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-border rounded-lg overflow-hidden">
          <button
            className="w-full text-left px-4 py-3 font-medium text-foreground flex justify-between items-center"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {item.question}
            <span className="ml-2 text-muted-foreground">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div className="px-4 py-3 text-sm text-muted-foreground border-t border-border">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
