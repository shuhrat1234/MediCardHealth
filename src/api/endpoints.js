const API = {
  auth: {
    login: "/auth/login/",
    refresh: "/auth/token/refresh/",
    verify: "/auth/token/verify/",
  },
  booking: {
    aviability: "/aviability/",
    bookCreate: "/book/create/",
    bookList: "/book/list/",
    bookDelete: (id) => `/book/${id}/delete`,
    bookUpdate: (id) => `/book/${id}/update`,
  },

  doctor: {
    doctor: "/doctor/",
    doctorId: (user_id) => `/doctor/${user_id}`,
  },
  moderator: {
    moderator: "/moderator/",
    moderatorId: (user_id) => `/moderator/${user_id}`,
  },
  
  patient: {
    patient: "/patient/",
    patientId: (user_id) => `/patient/${user_id}`,
  },

  fillials: {
    fillials: "/fillials/",
    fillialsId: (user_id) => `/fillials/${user_id}`,
  },
};

export default API;
