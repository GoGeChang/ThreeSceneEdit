export function getIconImg(name: string) {
  return new URL(`../assets/icons/${name}`, import.meta.url).href;
}