export const filterMeta = [
  {
    title: "Active Status",
    slug: "active",
    type: "radio",
    options: [
      { slug: true, label: "Active" },
      { slug: false, label: "Inactive" },
    ],
  },
  {
    title: "Coupon Type",
    slug: "couponType",
    type: "checkbox",
    options: [
      { slug: "0", label: "All" },
      { slug: "1", label: "Curated" },
      { slug: "2", label: "Custom" },
      { slug: "3", label: "Surrogate" },
    ],
  },
  {
    title: "Time",
    slug: "day",
    type: "radio",
    options: [
      { slug: "day", label: "Today" },
      { slug: "week", label: "This Week" },
      { slug: "month", label: "This Month" },
      { slug: "pickDate", label: "Pick a Date" },
    ],
  },
];

export const filterMetaDiscount = [
    {
      title: "Active Status",
      slug: "active",
      type: "radio",
      options: [
        { slug: true, label: "Active" },
        { slug: false, label: "Inactive" },
      ],
    },
    {
      title: "Discount Category",
      slug: "couponType",
      type: "checkbox",
      options: [
        { slug: 1, label: "Flat Rate" },
        { slug: 2, label: "Percentage" },
      ],
    },
    {
      title: "Time",
      slug: "day",
      type: "radio",
      options: [
        { slug: "day", label: "Today" },
        { slug: "week", label: "This Week" },
        { slug: "month", label: "This Month" },
        { slug: "pickDate", label: "Pick a Date" },
      ],
    },
  ];
  
