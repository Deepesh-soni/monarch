export const ownerSidebarMeta = [
  {
    label: "Dashboard",
    slug: "dashboard",
    id: 1,
    image: "/assets/DashboardIcons/Icons/dashboard.svg",
    subMenu: [
      {
        label: "General",
        slug: "dashboard-general",
        url: "/dashboard/general",
      },
    ],
  },
  {
    label: "Client",
    slug: "client",
    id: 2,
    image: "/assets/DashboardIcons/Icons/client.svg",
    badge: "upcoming",
    subMenu: [
      {
        label: "General",
        slug: "client-general",
        url: "/client/general",
      },
    ],
  },
  {
    label: "Analytics",
    slug: "analytics",
    id: 4,
    image: "/assets/DashboardIcons/Icons/analytics.svg",
    badge: "upcoming",
    subMenu: [
      {
        label: "General",
        slug: "analytics-general",
        url: "/analytics/general",
      },
      {
        label: "Advanced Analytics",
        slug: "analytics-advanced",
        url: "/analytics/advanced",
      },
    ],
  },
  {
    label: "Shop Settings",
    slug: "settings",
    id: 5,
    image: "/assets/DashboardIcons/Icons/shop-settings.svg",
    subMenu: [
      {
        label: "Shop Information",
        slug: "settings-information",
        url: "/settings/information",
      },
      {
        label: "Shop Images",
        slug: "settings-images",
        url: "/settings/images",
      },
      {
        label: "Shop Timings",
        slug: "shop-settings-timings",
        url: "/settings/timings",
      },
    ],
  },
  {
    label: "Services",
    slug: "services",
    id: 6,
    image: "/assets/DashboardIcons/Icons/service.svg",
    subMenu: [
      {
        label: "Manage Services",
        slug: "services-serviceInfo",
        url: "/services/serviceInfo",
      },
    ],
  },
  // {
  //   label: "Availability",
  //   slug: "availability",
  //   id: 7,
  //   image: "/assets/DashboardIcons/Icons/availability.svg",
  //   subMenu: [
  //     {
  //       label: "Shop Timings",
  //       slug: "availability-timings",
  //       url: "/availability/timings",
  //     },
  //   ],
  // },
  {
    label: "Transaction",
    slug: "transactions",
    id: 8,
    image: "/assets/DashboardIcons/Icons/transaction.svg",
    // badge: "upcoming",
    subMenu: [
      {
        label: "General",
        slug: "transactions-general",
        url: "/transactions/general",
      },
    ],
  },
  //TODO: do not remove
  // {
  //   label: "Help & Updates",
  //   slug: "help-and-updates",
  //   id: 9,
  //   image: "/assets/DashboardIcons/mdi_help-outline.svg",
  //   subMenu: [
  //     {
  //       label: "General",
  //       slug: "general-help-and-update",
  //       url: "/help-and-updates/general",
  //     },
  //   ],
  // },
  {
    label: "Staff Management",
    slug: "staff-management",
    id: 10,
    image: "/assets/DashboardIcons/Icons/staff.svg",
    subMenu: [
      {
        label: "General",
        slug: "staff-management-general",
        url: "/staff-management/general",
      },
    ],
  },
  {
    label: "Coupons",
    slug: "coupons",
    id: 11,
    image: "/assets/DashboardIcons/Icons/coupons.svg",
    subMenu: [
      {
        label: "General",
        slug: "coupons-general",
        url: "/coupons/general",
      },
      {
        label: "Curated Coupons",
        slug: "coupons-curated",
        url: "/coupons/curated",
      },
      {
        label: "Custom Coupons",
        slug: "coupons-custom",
        url: "/coupons/custom",
      },
    ],
  },
  {
    label: "Bookings",
    slug: "booking-management",
    id: 12,
    image: "/assets/DashboardIcons/Icons/booking.svg",
    subMenu: [
      {
        label: "General",
        slug: "booking-management-general",
        url: "/bookings/general",
      },
      {
        label: "Create Booking",
        slug: "booking-management-gen",
        url: "/bookings/general?show_add_appointment_modal=1",
      },
    ],
  },
  {
    label: "Review",
    slug: "review",
    id: 13,
    image: "/assets/DashboardIcons/Icons/review.svg",
    subMenu: [
      {
        label: "General",
        slug: "review-general",
        url: "/review/general",
      },
    ],
  },
];

export const staffSidebarMeta = [
  {
    label: "Dashboard",
    slug: "dashboard",
    id: 1,
    image: "/assets/DashboardIcons/Icons/dashboard.svg",
    subMenu: [
      {
        label: "General",
        slug: "dashboard-general",
        url: "/dashboard/general",
      },
    ],
  },
  {
    label: "Bookings",
    slug: "booking-management",
    id: 12,
    image: "/assets/DashboardIcons/Icons/booking.svg",
    // badge: "upcoming",
    subMenu: [
      {
        label: "General",
        slug: "booking-management-general",
        url: "/bookings/general",
      },
      {
        label: "Create Booking",
        slug: "general-booking-management",
        url: "/bookings/general?show_add_appointment_modal=1",
      },
    ],
  },
  {
    label: "Review",
    slug: "review",
    id: 13,
    image: "/assets/DashboardIcons/dashboard.svg",
    subMenu: [
      {
        label: "General",
        slug: "review-general",
        url: "/review/general",
      },
    ],
  },
];
