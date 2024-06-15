import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Job type
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  logo: string;
  tags: string[];
}

// Define the FilterType type
type FilterType = 'jobType' | 'categories' | 'careerLevel' | 'candidateType' | 'salaryRange';

// Define the initial state
interface JobState {
  filters: {
    jobType: string[];
    categories: string[];
    careerLevel: string[];
    candidateType: string[];
    salaryRange: string[];
  };
  jobs: Job[];
}

const initialState: JobState = {
  filters: {
    jobType: [],
    categories: [],
    careerLevel: [],
    candidateType: [],
    salaryRange: [],
  },
  jobs: [
    {
      id: 1,
      title: "Social Media Assistant",
      company: "Nomad",
      location: "Paris, France",
      salary: "$15k/Monthly",
      logo: "/images/66.png",
      tags: ["Full-Time", "Marketing", "Design"]
    },
    {
      id: 2,
      title: "Brand Designer",
      company: "Dropbox",
      location: "San Francisco, USA",
      salary: "$15k/Monthly",
      logo: "/images/22.png",
      tags: ["Part-Time", "Marketing", "Design"]
    },
    {
      id: 3,
      title: "Interactive Developer",
      company: "Terraform",
      location: "Hamburg, Germany",
      salary: "$15k/Monthly",
      logo: "/images/33.png",
      tags: ["Full-Time", "Marketing", "Design"]
    },
    {
      id: 4,
      title: "Email Marketing",
      company: "Revolut",
      location: "Madrid, Spain",
      salary: "$15k/Monthly",
      logo: "/images/44.png",
      tags: ["Full-Time", "Marketing", "Design"]
    },
    {
      id: 5,
      title: "Lead Engineer",
      company: "Canva",
      location: "Ankara, Turkey",
      salary: "$15k/Monthly",
      logo: "/images/77.png",
      tags: ["Part-Time", "Marketing", "Design"]
    },
    {
      id: 6,
      title: "Product Designer",
      company: "ClassPass",
      location: "Berlin, Germany",
      salary: "$15k/Monthly",
      logo: "/images/55.png",
      tags: ["Full-Time", "Marketing", "Design"]
    },
    {
      id: 7,
      title: "Customer Manager",
      company: "Pitch",
      location: "Berlin, Germany",
      salary: "$15k/Monthly",
      logo: "/images/88.png",
      tags: ["Part-Time", "Marketing", "Design"]
    }
  ],
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<{ filterType: FilterType; value: string }>) {
      const { filterType, value } = action.payload;
      const filterValues = state.filters[filterType];

      if (filterValues.includes(value)) {
        state.filters[filterType] = filterValues.filter((item) => item !== value);
      } else {
        state.filters[filterType].push(value);
      }
    },
    setJobs(state, action: PayloadAction<Job[]>) {
      state.jobs = action.payload;
    },
  },
});

export const { setFilters, setJobs } = jobSlice.actions;

export default jobSlice.reducer;
