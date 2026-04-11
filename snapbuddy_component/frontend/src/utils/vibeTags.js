export function suggestTagsFromVibe(text) {
  const source = text.toLowerCase();
  const rules = [
    { keys: ["korean", "soft", "เกาหลี", "นุ่ม"], tag: "#soft" },
    { keys: ["cafe", "café", "coffee", "matcha", "คาเฟ่", "กาแฟ", "มัทฉะ"], tag: "#cafevibes" },
    { keys: ["sun", "golden", "warm", "แดด", "อบอุ่น", "โกลเด้น"], tag: "#warmtones" },
    { keys: ["natural", "window", "light", "หน้าต่าง", "แสง"], tag: "#naturallight" },
    { keys: ["cozy", "blanket", "homey", "อบอุ่น", "ผ้าห่ม"], tag: "#cozy" },
    { keys: ["minimal", "clean", "white", "มินิมอล", "ขาว"], tag: "#minimal" },
    { keys: ["city", "rooftop", "urban", "ดาดฟ้า", "เมือง"], tag: "#cityview" },
    { keys: ["vintage", "film", "retro", "วินเทจ", "ฟิล์ม"], tag: "#vintage" },
    { keys: ["moody", "rain", "dark", "มูดดี้", "ฝน", "มืด"], tag: "#moody" },
    { keys: ["romantic", "dating", "date", "โรแมนติก", "เดต"], tag: "#romantic" },
    { keys: ["cute", "playful", "fun", "น่ารัก", "สนุก"], tag: "#playful" },
    { keys: ["green", "garden", "botanical", "สวน", "ธรรมชาติ"], tag: "#nature" },
  ];
  const tags = rules.filter((r) => r.keys.some((k) => source.includes(k))).map((r) => r.tag);
  if (!tags.length) return ["#soft", "#naturallight", "#cozy"];
  return Array.from(new Set(tags)).slice(0, 5);
}
