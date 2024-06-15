import { TimeFilterProvider } from "./TimeFilterProvider";
import { CommonDataProvider } from "./commonData";
import { JobsDataProvider } from "./jobsData";

const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TimeFilterProvider>
      <JobsDataProvider>
        <CommonDataProvider>{children} </CommonDataProvider>
      </JobsDataProvider>
    </TimeFilterProvider>
  );
};

export default AppDataProvider;
