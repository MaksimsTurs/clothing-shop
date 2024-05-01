//@ts-check
/** @type {import('next').NextConfig} */

export default { 
  compress: true,
  reactStrictMode: false,
  devIndicators: { buildActivity: true, buildActivityPosition: "top-right" },
  images: { remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }] } 
}