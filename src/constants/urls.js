export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const CDN = "https://assets-pamprazzi.b-cdn.net";

export const MAP_API_KEY = "AIzaSyCsLmYZRq52ktk5uJpucbc9YFIo9M7F_GI";

export const SALON_URL = process.env.NEXT_PUBLIC_CLIENT_BASE_URL;

export const URL = {
  //auth
  sendOtp: "/admin/sendOtp",
  submitOtp: "/admin/verifyOtp",
  createUser: "/admin/createUser",
  refreshToken: "/admin/refreshToken",

  //stores
  getOwnerStores: "/store/getOwnerStores",
  createNewStore: "/store/createStore",
  updateStore: "/store",
  getStoreDetails: "/store/getStoreDetails",
  profileCompletion: "/store/profileCompletion",
  updateSalonStatus: "/store/updateStatus",

  //category
  getAllCategory: "/category/getAllCategory",

  //services
  getService: "/service",
  getAllService:"/service/all",
  createService: "/service/createService",
  deleteService: "/service/deleteService",
  updateService: "/service/updateService",

  //all the services (client)
  getAllServices: "/service/getAllCategoreisWithServices",

  //coupons
  getAllCoupons: "/admin/getAllCoupons",
  getCouponsPerformance: "/coupon/getCouponsPerformance",
  getCouponCategory: "/coupon/category",
  getCuratedCoupon: "/coupon/getReadyMadeCoupons",
  getAllCuratedCouponList: "/coupon/getAllCoupons",
  createCoupon: "/coupon/createCoupon",
  getActiveCoupons: "/coupon/getActiveCoupons",
  updateCoupon: "/coupon",

  //amenities
  getAllAmenities: "/storeamenities/getAll",

  //assets
  uploadAllImage: "/api/upload-image",
  deleteImage: "/api/delete-image",

  //stylist
  getStylists: "/stylist",
  getAllStaff: "/stylist/staff",
  createStylists: "/stylist",
  deleteStylists: "/stylist/deleteStylist",
  updateStylist: "/stylist",
  verifyOtp: "/admin/verifyOtp",

  //Appointment
  createAppointment: "/appointment/staff",
  getAppointment: "/appointment",
  getSingleAppointment: "/appointment/getAppointmentDetails",
  getPendingAppointment: "/appointment/pendingAppointments",
  confirmAppointment: "/appointment/accept-reject",
  manageBooking: "/appointment/captureAppointment",
  appointmentReschedule: "/appointment/admin/rescheduleAppointment",
  cancelBooking: "/appointment/admin/cancelAppointment",

  // Review
  getAllReview: "/rating/getAllRating",
  getAllRating: "/rating/getRating",
  replyRating: "/rating/reply-review",
  likeRating: "/rating/like-review",

  favouriteCount: "/store/wishlist",
  ownerDetails: "/admin/getOwnerDetails",
  ownerEditDetails: "/admin/updateOwnerDetails",

  contactUs:"/query/merchant",
  //dashboard
  totalCountData: "/store/count",
  storeTransactions : "/store/storeTransactions",
  storeClient: "/store/storeClient",
  salesService : "/store/salesService"
  
};
