export function getBionicParts(word: string): { bold: string; rest: string } {
  if (word.length <= 1) return { bold: word, rest: "" };
  if (word.length <= 3) return { bold: word.slice(0, 1), rest: word.slice(1) };
  if (word.length <= 6) return { bold: word.slice(0, 2), rest: word.slice(2) };
  return { bold: word.slice(0, 3), rest: word.slice(3) };
}
