type CalcKeys = { countKey: string, priceKey: string, precentKey: string }

export default function calculatePrice(array: any[], keys: CalcKeys) {
  if(!array) return 0

  const { countKey, precentKey, priceKey } = keys

  return `${array.reduce((prev, curr) => {
    const discount = curr[priceKey] * (curr[precentKey] || 0)
    const discountPrice = curr[priceKey] - discount
    
    return prev + (discountPrice * (curr[countKey] || 1))
  }, 0).toFixed(2)}€`
}