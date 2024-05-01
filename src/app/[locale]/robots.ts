import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    sitemap: '',
    rules: {
      userAgent: '*',
      allow: [
        '/en',              '/ru',              '/de', 
        '/en/search',       '/ru/search',       '/de/search',
        '/en/cart',         '/ru/cart',         '/de/cart',
        '/en/help',         '/ru/help',         '/de/help',
        '/en/login',        '/ru/login',        '/de/login',
        '/en/product',      '/ru/product',      '/de/product',
        '/en/registration', '/ru/registration', '/de/registration',
      ],
      disallow: ['/ru/admin'],
    }
  }
}