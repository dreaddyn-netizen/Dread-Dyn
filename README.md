# DREAD DYN — Premium Card Store

A production-ready, mobile-first office-style digital and physical high-limit card store application engineered with React, TypeScript, Vite, and Tailwind CSS.

## 1. Design System & Office Architecture

- **Page Background**: Light blue-grey (`#F4F8FC`) with subtle geometric office matrix
- **Primary Action Blue**: `#087CF0` (Hover: `#0667C8`, Light Tint: `#EBF4FE`)
- **Dark Navy Heading/Text**: `#102544` (Muted: `#4A5F7D`)
- **Light Blue Borders**: `#DFEAF7`
- **Product Cards**: Crisp white backgrounds with subtle elevation shadows (`shadow-sm`, `shadow-md`) and clean rounded corners (`rounded-xl`).
- **Typography**: Clean corporate office typography powered by Plus Jakarta Sans and JetBrains Mono for card numbers and tracking codes.
- **Mobile-First Layout**: Adaptive desktop navigation plus dedicated mobile bottom navigation bar (`BottomNav`) tailored for Android and iOS touch screens.

## 2. Complete Screen Catalog

1. **Splash Screen**: DREAD DYN official emblem, progress indicator, and instant store entrance.
2. **Home Dashboard**: Hero banner, corporate trust metrics, category pills, and 4-column featured product grid.
3. **Card Categories**: All Cards, Mastercard, Visa, Gold, Diamond, Precision Metal, and Business Suite.
4. **Catalogue Page**: Instant live keyword search, multi-tiered filters (brand, tier, in-stock only), and dynamic sorting (Featured, Price, Rating, New).
5. **Product Details**: 3D interactive card visualizer (with live laser-embossing preview of the cardholder's name and 3D card flip to view magnetic stripe and CVV security stamp), daily limits, FX rates, and dual delivery format selector.
6. **Shopping Cart**: Item quantity adjuster, removal, free shipping calculator, and privilege promo vouchers (`DREAD10`, `DYN20`, `VIP50`).
7. **Checkout**: Contact information, physical vs digital vault delivery selector, address validation, and compliant payment gateway selector.
8. **Order Confirmation**: Order reference (`DYN-XXXXXX`), fulfillment timeline tracker, 256-bit HSM token generator, and printable invoice receipt modal.
9. **Order History**: Filter orders by status (*All, Processing, Delivered, Cancelled*), view tracking numbers, and re-print receipts.
10. **Customer Reviews**: Aggregate score (4.9/5), star breakdown bars, verified buyer badges, and interactive "Write a Review" submission form.
11. **Support & Concierge**: Searchable FAQ knowledge base, interactive support ticketing system, direct email (`dreaddyn@gmail.com`), and WhatsApp direct action chat.
12. **User Authentication & Profile**: Sign up, sign in, role switching (*Admin* vs *Customer*), profile editing, and corporate address book.
13. **Wishlist**: Save cards for future corporate procurement.
14. **Admin Dashboard**: Revenue KPIs, order totals, pending dispatch queue, and active stock count.
15. **Admin Product Management**: Full CRUD operations (create card, edit specifications, update inventory stock, delete card).
16. **Admin Order Management**: View all orders, update allowed status milestones (*Processing*, *Delivered*, *Cancelled*), and assign tracking numbers.
17. **Settings & Compliance**: PWA standalone installation trigger, currency format selector, data reset utility, and legal policy pages (*Zero-Raw Card Policy, Privacy, Terms of Issuance*).

## 3. Database Schema & Security Policies

A complete PostgreSQL / Supabase SQL schema is included in `src/lib/database.sql` defining:
- `profiles` with role-based access control (`admin` vs `customer`)
- `user_addresses`
- `products`
- `orders` and `order_items`
- `reviews`
- `support_tickets`
- Row-Level Security (RLS) policies enforcing that only authorized administrators may create, modify, or delete products and update order statuses.

## 4. Payment Integration & Security Disclosures

- **PCI-DSS Compliance**: This application **never** collects, processes, or stores raw payment card numbers, CVVs, PINs, or OTPs in frontend code.
- **Demo Gateway**: For local/sandbox evaluation, the "Verified Demo Gateway" simulates end-to-end checkout and generates authentic receipts.
- **External Credentials Required for Live Merchant Processing**:
  - `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET` for automated credit/debit card settlement.
  - Supabase/PostgreSQL connection strings if transitioning from client-authoritative persistent storage to cloud databases.
