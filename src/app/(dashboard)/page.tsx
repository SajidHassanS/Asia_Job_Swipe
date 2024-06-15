// import React from "react";
// import StatsCard from "./components/StatsCard";
// import { statsData } from "@/utils/constants";
// import LineChart from "./components/JobsChart";
// import { TopCompanies } from "./components/TopCompanies";
// import PackagesOverview from "./components/SubscriptionChart";
// import TimeFilter from "@/components/TimeFilter";
// import Title from "@/components/Title";
// import { cookies } from "next/headers";

// export default function Home() {
//   const authToken = cookies().get("accessToken")?.value;
//   // console.log(authToken);
//   return (
//     <Title title="Dashboard" className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h1 className="font-bold">Business Analytics</h1>
//         <TimeFilter />
//       </div>
//       {/* stats */}

//       <div className="grid grid-cols-4 gap-4">
//         {statsData.map(({ title, value, percentage, change, icon: Icon }) => (
//           <StatsCard
//             key={title}
//             title={title}
//             icon={Icon}
//             value={value}
//             change={change}
//             percentage={percentage}
//           />
//         ))}
//       </div>
//       <LineChart />
//       <div className="grid grid-cols-3 gap-4">
//         <div className="col-span-2">
//           <TopCompanies />
//         </div>
//         <PackagesOverview />
//       </div>
//     </Title>
//   );
// }
