// import { carType } from "@/service/carServices"

// const getCarsMock = (carLists:carListsType, type: string, id?:number | undefined) => {
//   // Get all
//   if (type?.length === 0) {
//     return Object.keys(carLists).reduce((result:carType[], key:unknown) => {
//       const list = carLists[key].map((item:carType) => {
//         return item
//       })
//       return [...result, ...list]
//     }, [])
//   } else {
//     // Get with type, without id
//     return carLists[type].map((car: carType) => {
//       return car
//     })
//   }
// }

const getUrl = (url: string) => {
  return new RegExp(`${url}/*`);
};

export {
  // getCarsMock,
  getUrl,
};
