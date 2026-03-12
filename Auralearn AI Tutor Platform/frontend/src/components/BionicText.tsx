import { getBionicParts } from "@/utils/bionicReading";

interface BionicTextProps {
  text: string;
  enabled: boolean;
  className?: string;
}

export function BionicText({ text, enabled, className = "" }: BionicTextProps) {
  if (!enabled) return <span className={className}>{text}</span>;

  const words = text.split(/(\s+)/);

  return (
    <span className={className}>
      {words.map((segment, i) => {
        if (/^\s+$/.test(segment)) return <span key={i}>{segment}</span>;
        const { bold, rest } = getBionicParts(segment);
        return (
          <span key={i}>
            <span className="bionic-bold">{bold}</span>
            <span className="bionic-rest">{rest}</span>
          </span>
        );
      })}
    </span>
  );
}
