// import React, { useEffect, useState } from "react";

// function Getdata() {
//   const [apidata, setApiData] = useState([]);

//   useEffect(() => {
//     const Newdata = async () => {
//       let res = await fetch(
//         "https://65536c325449cfda0f2eaa2c.mockapi.io/tasks",
//         {
//           method: "GET",
//         }
//       );
//       let data = await res.json();
//       console.log(data);
//       setApiData(data);
//     };
//     Newdata();
//   }, []);

//   return (
//     <div>
//       {apidata.map((items) => (
//         <div key={items.id}>{items.name}</div>
//       ))}
//     </div>
//   );
// }

// export default Getdata;
