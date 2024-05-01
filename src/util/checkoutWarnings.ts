import type { CheckoutWarning } from "@/app/[locale]/checkout/page.type";

export default function checkoutWarning(warning: CheckoutWarning) {
  switch(warning) {
    case 'COUNT_BIGGER_THEN_STOCK':
      return `You have more products in you cart then we have in the warehouse!\n
              Count will be replaced with maximal count what we have or you can remove some products from cart!`
  }
}