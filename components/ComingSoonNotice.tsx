interface ComingSoonNoticeProps {
  label: string;
  className?: string;
}

export default function ComingSoonNotice({ label, className = "" }: ComingSoonNoticeProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">
        Coming Soon
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {label}は現在準備中です。公開までしばらくお待ちください。
      </p>
    </div>
  );
}
