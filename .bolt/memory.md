# Project memory

## Product intent & audience

- Demo responsive website for «Павлония» (Павлония Кафе & Ресторан), Makhachkala.
- Audience: local customers browsing menu, placing pickup/delivery orders.
- Purpose: showcase menu and atmosphere; simulate order flow client-side (no backend).

## Brand personality & voice

- Warm, atmospheric, nature-inspired café/restaurant.
- Tagline: «Вкус, который объединяет»; sub: «Атмосферное кафе с тёплой атмосферой».
- Copy in Russian; prices in rubles, realistic for Makhachkala.

## Visual design & UX direction

- Rich multi-shade green palette; natural leaf accents; warm soft pendant-lamp lighting.
- High-contrast text on green/dark backgrounds for readability; heavy hero overlay.
- Mobile-first responsive layout.
- Mobile menu grid: `grid-template-columns: repeat(2, 1fr); gap: 10px;` compact cards (photo 120–140px `object-fit: cover`, name, short desc, weight, price, «В корзину» button).
- Fixed compact header with nav (Главная, Меню, Корзина, Контакты) and cart icon with item counter.
- Hero with name, slogan, sub, «Ознакомиться с меню» smooth-scroll button over darkened background photo.
- Info bar: address ул. Имама Шамиля, 8А; hours 10:00–23:00 daily; phone +7 (999) 999-99-99.
- Menu category tabs: Куры на углях, Пицца, Роллы, Шаурма (3–4 items each).
- Advantages block: 4 cards (tasty cuisine, cozy atmosphere, high service, fresh ingredients).
- Contacts/footer: address, map, nav, Telegram + Instagram icons.

## Decisions, constraints & rationale

- No build step: pure HTML, CSS, Vanilla JS only — directly deployable to GitHub Pages as static site.
- No frameworks (React/Next/Vue/Vite) to keep export self-contained.
- Images generated/downloaded and stored locally in `images/` so they ship with the code archive/push.
- Cart state persisted via localStorage; add/remove/qty+−, auto total.
- Order method toggle: «Доставка» (Имя, Телефон, Адрес, Комментарий) vs «Самовывоз» (Имя, Телефон).
- «Оформить заказ» shows styled confirmation modal then clears cart.
- Starter Node.js project base is irrelevant; actual deliverable is a static site, no server runtime used.

## Open questions & assumptions

- Reference image was referenced but not provided; green/leafy warm style inferred from description.
- Menu items/prices invented as realistic placeholders for Makhachkala.
- Images are local assets (assumed generated/selected to match warm-green theme).
- No real payment or order submission backend; confirmation is client-side only.