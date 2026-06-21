# GeoVision
A realtime GIS monitoring app
A modern realtime GIS monitoring app which allows user to monitor connected devices (Which they can be IoT devices or anything else).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tech Stack

- Next.JS
- MapLibre
- Terra-Draw
- Tailwind CSS

## Feature
### Phase 1
- [x] A wide Map-View
- [x] Draw GeoFence
  - [x] Draw basic shapes like Circle, Rectangle and Polygon
  - [x] Edit GeoFence name, and color
  - [x] Remove GeoFence 
- [ ] Draw devices
- [ ] Notifications
  - [ ] Implement UI for critical alerts/banners
  - [ ] Focus: Immediate situational awareness
- [ ] Basic Statistics

### Phase 2
- [ ] Login Page
  - [ ] Implement UI
  - [ ] Integrate with Core
- [ ] Integrate Notifications
  - [ ] Connect to Core with HTTP and Websocket
- [ ] Integrate Geofence CRUD operation with Core
- [ ] Integrate Basic statistics with Core


### Phase 3
- [ ] Sattelite Map-View
- [ ] Event Feed
- [ ] Settings
  - [ ] Theming


## Screenshots
![](https://camo.githubusercontent.com/f550284bb57a285832dc8d5b2bbb3d8fa6fc1b1f/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f76464b716e43644c504e4f4b632f67697068792e676966)


## Notifications vs Event Feeds

This dashboard provides two mechanisms to keep users aware of system activity: **Notifications** and **Event Feeds**.

### Notifications

Notifications are **alert-based messages** generated when important conditions or predefined rules are triggered.  
They are designed to immediately draw attention to critical or high‑priority events.

Examples:
- A sensor detects abnormal readings.
- A vehicle enters or leaves a geofenced area.
- A system error or infrastructure failure occurs.

Characteristics:
- Triggered by rules or thresholds.
- Focus on urgent or important events.
- Typically displayed as alerts, banners, or badges in the dashboard.
- Often include quick navigation to the related map location.

---

### Event Feeds

Event Feeds provide a **chronological stream of system events** occurring within the GIS platform.  
They help users monitor ongoing activity and track historical updates.

Examples:
- Sensor updates
- Asset status changes
- Incident reports
- Vehicle movement updates

Characteristics:
- Time‑ordered list of events.
- Continuously updated.
- Shows both minor and major system activities.
- Each event usually includes timestamp, event type, and location.

---

### Key Difference

- **Notifications** highlight **important or urgent events that require attention**.
- **Event Feeds** show a **continuous timeline of all recorded system activities**.

Both work together to improve **situational awareness and operational monitoring** within the GIS dashboard.
`
