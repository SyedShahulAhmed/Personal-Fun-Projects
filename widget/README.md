<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:151f2e,100:B31312&height=180&section=header&text=Hardcover%20Reading%20Widget&fontSize=32&fontColor=FFFFFF&animation=fadeIn&fontAlignY=38&desc=Every%20book%20leaves%20a%20mark.&descAlignY=58&descSize=14" width="100%" alt="Animated Hardcover Reading Widget header" />

*Your reading journey, beautifully displayed.* ♡

![Currently Reading](https://widget-iota-woad.vercel.app/api/widget)

> 🔒 **Personal Project**
> 
>This widget is currently built for my personal use and is not yet available for public use by others.

</div>

---

## ✧ FEATURES

୨୧ 📖 **Reading Card** — Cover, title, author, and progress.

୨୧ 🎨 **Customizable SVG** — Colors, dimensions, borders, and radius.

୨୧ 🔐 **Secure Dashboard** — Protected admin access with signed sessions.

୨୧ ⚡ **Smart Caching** — Hardcover data refreshes every 6 hours.

୨୧ 🖥️ **Live Preview** — Customize and preview your widget.


## ✧ TECH STACK

`Next.js 16` ✦ `React 19` ✦ `TypeScript`

`Tailwind CSS 4` ✦ `Hardcover GraphQL API` ✦ `Jose`


## ✧ GETTING STARTED

Run inside the `widget/` directory:

```bash
npm install
cp .env.example .env.local
npm run dev
```

**Windows PowerShell**

```powershell
Copy-Item .env.example .env.local
```

## ✧ ENVIRONMENT VARIABLES

Create `.env.local` and configure the following:

| Variable | Description |
|---|---|
| `HARDCOVER_API_KEY` | Hardcover API token used to fetch reading data. |
| `HARDCOVER_USERNAME` | Optional; currently unused by the application. |
| `ADMIN_USERNAME` | Dashboard login username. |
| `ADMIN_PASSWORD` | Dashboard login password. |
| `AUTH_SECRET` | Random secret used to sign and verify admin sessions. |

**Example configuration**

```env
HARDCOVER_API_KEY=your_hardcover_api_key
HARDCOVER_USERNAME=your_hardcover_username
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
AUTH_SECRET=your_long_random_secret
```

> ♡ Keep your credentials private. Never commit `.env.local` or expose your API token in client-side code.

Open [http://localhost:3000](http://localhost:3000) to access the dashboard.

---

## ✧ WIDGET EMBEDDING

Display your reading card in any Markdown page using the SVG endpoint.

**♡ Default Widget**

```md
![Currently Reading](https://widget-iota-woad.vercel.app/api/widget)
```

**♡ Custom Black & White Theme**

![Currently Reading](https://widget-iota-woad.vercel.app/api/widget?bg=%23000000&border=%23FFFFFF&heading=%23FFFFFF&title=%23FFFFFF&author=%23FFFFFF&pages=%23FFFFFF&bar=%23FFFFFF&track=%23333333&percent=%23FFFFFF&width=500&height=200&bw=2&radius=16)

```md
![Currently Reading](https://widget-iota-woad.vercel.app/api/widget?bg=%23000000&border=%23FFFFFF&heading=%23FFFFFF&title=%23FFFFFF&author=%23FFFFFF&pages=%23FFFFFF&bar=%23FFFFFF&track=%23333333&percent=%23FFFFFF&width=500&height=300&bw=2&radius=16)
```

### ✧ URL Parameters

Customize the widget by adding query parameters to the endpoint. Separate each parameter with `&`.

| Parameter | Default | Description |
|---|---|---|
| `bg` | `#151f2e` | Card background color. |
| `border` | `#9c0012` | Border and divider color. |
| `heading` | `#FFFFFF` | Heading text color. |
| `title` | `#B31312` | Book title color. |
| `author` | `#8B0F0E` | Author text color. |
| `pages` | `#B31312` | Page count and progress label color. |
| `bar` | `#B31312` | Filled progress bar color. |
| `track` | `#FFFFFF` | Unfilled progress track color. |
| `percent` | `#B31312` | Completion percentage color. |
| `width` | `450` | Widget width in pixels. |
| `height` | `200` | Widget height in pixels. |
| `bw` | `6` | Border width in pixels. |
| `radius` | `6` | Card corner radius in pixels. |

### ✧ More Examples

**1. Minimal Black & White**

```text
/api/widget?bg=%23000000&border=%23FFFFFF&heading=%23FFFFFF&title=%23FFFFFF&author=%23FFFFFF&pages=%23FFFFFF&bar=%23FFFFFF&track=%23333333&percent=%23FFFFFF
```

**2. Dark Blue & Cyan**

```text
/api/widget?bg=%23050816&border=%2300E5FF&heading=%2300E5FF&title=%23FFFFFF&author=%23CBD5E1&pages=%23CBD5E1&bar=%2300E5FF&track=%231E293B&percent=%2300E5FF&width=500&height=240&bw=2&radius=16
```

**3. Larger Reading Card**

```text
/api/widget?width=600&height=300&bw=2&radius=20
```

### ✧ How to Customize

- **Colors:** Use hexadecimal color codes, such as `#000000` for black and `#FFFFFF` for white.
- **URL encoding:** Replace `#` with `%23` in color values so they work correctly in URLs.
- **Dimensions:** Adjust `width` and `height` to control the SVG size.
- **Borders:** Use `bw` to change the border thickness and `radius` to adjust rounded corners.
- **Combining options:** Add multiple parameters using `&`. Any parameter you omit uses its default value.

For example, to change only the background to black:

```md
![Currently Reading](https://widget-iota-woad.vercel.app/api/widget?bg=%23000000)
```

---

<div align="center">

**Built with ☕ and a love for great stories**
<img
  src="https://capsule-render.vercel.app/api?type=waving&color=0:B31312,100:151f2e&height=180&section=footer&text=%E2%9C%A6%20READ%20%C2%B7%20IMAGINE%20%C2%B7%20REMEMBER%20%E2%9C%A6&fontSize=22&fontColor=FFFFFF&fontAlignY=65&animation=fadeIn"
  width="100%"
  alt="✦ READ · IMAGINE · REMEMBER ✦"
/>

</div>