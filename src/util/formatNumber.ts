export default function formatNumber(num: number): number | string {
  if(num < 10) return `0${num}`
  return num
}