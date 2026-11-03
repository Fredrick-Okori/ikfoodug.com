import { cloneElement, isValidElement, type ReactNode } from "react";
import { regions, type RegionCode } from "./regions";

// British stem → American stem. Matches are case-insensitive and keep the original capitalisation.
const SPELLINGS: [RegExp, string][] = [
  [/flavour/gi, "flavor"],
  [/colour/gi, "color"],
  [/favour/gi, "favor"],
  [/honour/gi, "honor"],
  [/labour/gi, "labor"],
  [/licence/gi, "license"],
  [/recognis/gi, "recogniz"],
  [/specialis/gi, "specializ"],
  [/speciality/gi, "specialty"],
  [/optimis/gi, "optimiz"],
  [/organis/gi, "organiz"],
  [/prioritis/gi, "prioritiz"],
  [/standardis/gi, "standardiz"],
  [/catalogue/gi, "catalog"],
  [/enquir/gi, "inquir"],
  [/\bgrey/gi, "gray"],
  [/\bfibre/gi, "fiber"],
  [/\bcentre/gi, "center"],
  [/\bprogramme/gi, "program"],
  [/\btonnes?\b/gi, "metric tons"],
];

const NUM = String.raw`(\d+(?:\.\d+)?)`;
const CM = new RegExp(String.raw`${NUM}(?:\s?([–-])\s?${NUM})?\s?cm\b`, "g");
const KG = new RegExp(String.raw`${NUM}\s?kg\b`, "g");
const G = new RegExp(String.raw`\b${NUM}\s?g\b`, "g");

function matchCase(source: string, replacement: string) {
  return source[0] === source[0].toUpperCase() ? replacement[0].toUpperCase() + replacement.slice(1) : replacement;
}

const round = (n: number, digits = 0) => String(Number(n.toFixed(digits)));

/** US customary first, metric in brackets — matches US food labelling (FPLA dual units). */
function usUnits(text: string) {
  return text
    .replace(CM, (m, a, dash, b) => `${round(a / 2.54)}${b ? `${dash}${round(b / 2.54)}` : ""} in (${m})`)
    .replace(KG, (m, a) => `${round(a * 2.20462)} lb (${m})`)
    .replace(G, (m, a) => `${round(a / 28.3495, 1)} oz (${m})`);
}

export function americanize(text: string) {
  const spelled = SPELLINGS.reduce((t, [re, us]) => t.replace(re, (m) => matchCase(m, us)), text);
  return usUnits(spelled);
}

const TEXT_PROPS = ["alt", "title", "placeholder", "aria-label"];
const SKIP = new Set(["script", "style", "code", "pre"]);

function walk(node: ReactNode): ReactNode {
  if (typeof node === "string") return americanize(node);
  if (Array.isArray(node)) return node.map(walk);
  if (!isValidElement(node)) return node;
  if (typeof node.type === "string" && SKIP.has(node.type)) return node;

  const props = node.props as Record<string, unknown>;
  const next: Record<string, unknown> = {};
  for (const key of TEXT_PROPS) {
    if (typeof props[key] === "string") next[key] = americanize(props[key] as string);
  }
  const children = props.children as ReactNode;
  if (children === undefined) return cloneElement(node, next);
  // Spread static child lists back as arguments so React doesn't ask for keys.
  return Array.isArray(children)
    ? cloneElement(node, next, ...children.map(walk))
    : cloneElement(node, next, walk(children));
}

/**
 * Rewrites a page's copy for the region's locale: US spelling and US customary
 * units for en-US regions, untouched elsewhere. Text rendered inside other
 * components (not passed as children) is not reached.
 */
export function localize(node: ReactNode, region: RegionCode): ReactNode {
  return regions[region].locale === "en-US" ? walk(node) : node;
}
