import axios from "axios";

export default api = axios.create({
  baseURL: 'http://34.195.168.97/api/v1',
  headers: {
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZmQ5ZWJkMzYwZmI5MDgyM2E1NDI5ZThkNWQ4NGJlOWUxNzg4ZDNhOTRjZjY1MzkzYTk4Y2ViNDYzYjQ0ZWRkMzgwZGM0OTY0Njc0ODg5NDEiLCJpYXQiOjE2OTY1ODAwODkuNzUxODc0LCJuYmYiOjE2OTY1ODAwODkuNzUxODc3LCJleHAiOjIxNjk5NjU2ODkuNzIxMywic3ViIjoiMSIsInNjb3BlcyI6W119.nURtGg8SECK8qfi9sTXQOLPqU7ZE2d-T-3mXSO0XYfanL7YXwk2lj4C0_H2k3QeVehuEEN1mHMvdhO3wyXBF--YyiVWv550_QnIupYYMAGQE_AfZijlir6yfAqIqvNaXL5d7NEQ1a9ngIrQ6WcN53SjTIDa-0fbjaAur9m_B7sS9ytI3SiggDeQUB0nQIt5IcJN2CkSoP51ulOKZoJYM4DmijYH3Rlrd0KMUwkb9pFXwlByXgdLJ8XNv_Jdp09aO5N7UYtPrk882IvZUz5O9pnc9kEHP_CJjP6lXc-8oMEtfXlPcOgSa6b67d1W8H_9CjhYFipkNRkc2SHX4yD96S70ngSad95603lduG1JEUgFqHEMpzUyT9ojVsUK1Dbhj-kEIb_6ASryh8iXPzTjnSXeIEum6U1i2LM_T2NgbhyRmk_3Du3sITRbqrJ6V6xLDmbGXJxBE5fcQ2UUiDeaFjib68bGc_OgMMabvThnFJDDrPLCXJtQ6gqewhTBpptYe6_StMBCp0uB3msMwYuUDHWnxCu8Q9Ct66dL_65qzFHnx7zljJKidkc4GslNVa3V4pdC0bHnNKQAPB9v_4i3GZkro3gaay814jvrCDcgsGcDEygTcVxAjLOOaSh4clnd3k8-g_gokxYku5RIf2PVoSoVAwBgL6jWyX0fe2RcWzfU',
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
