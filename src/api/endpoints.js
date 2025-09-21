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
    doctorId: (user_id) => `/doctor/${user_id}/`,
  },
  moderator: {
    moderator: "/moderator/",
    moderatorId: (user_id) => `/moderator/${user_id}/`,
  },

  patient: {
    patient: "/patient/",
    patientId: (user_id) => `/patient/${user_id}/`,
  },

  fillials: {
    fillials: "/fillials/",
    fillialsId: (user_id) => `/fillials/${user_id}/`,
  },

  clinic: {
    clinics: "/clinic/clinics/",
    clinicsId: (id)=> `/clinic/clinics/${id}/`,





    doctors: "/clinic/api/doctors/",
    doctorId: (id) => `/clinic/api/doctors/${id}/`,

    services: "/clinic/api/services/",
    serviceId: (id) => `/clinic/api/services/${id}/`,

    serviceAddToFillial: (id, fillial_id) =>
      `/clinic/api/services/${id}/add_to_fillial/?fillial_id=${fillial_id}`,
    serviceRemoveFromFillial: (id, fillial_id) =>
      `/clinic/api/services/${id}/remove_from_fillial/?fillial_id=${fillial_id}`,
  },
};

export default API;