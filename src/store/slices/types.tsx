export interface Company {
  companyLogo: string;
  companyName: string;
  city: string;
  province: string;
  country: string;
  sector: string; 
}

export interface Salary {
  from: number;
  to: number;
}

export interface Job {
  _id: string;
  title: string;
  company: Company;
  salary: Salary;
  skills: string[];
  jobType: string;
  careerLevel: string;
  candidateType: string;
  city: string;
  province: string;
  country: string;
  description: string;
  availability: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobSeeker {
  _id?: string;
  savedJobs: Job[];
  appliedJobs: Job[];
}

export interface JobSeekerState {
  jobSeeker: JobSeeker | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  applyError: string | null; // Add this line
}

export interface SavedJob {
  _id: string;
  jobSeeker: {
    _id: string;
    firstName: string;
    lastName: string;
    gender: string;
    introduction: string;
    dateOfBirth: string;
    userInfo: string;
  };
  job: Job;
}

export interface JobState {
  jobs: Job[];
  savedJobs: SavedJob[];
  job: Job | null;
  bestMatchedJobs: Job[];
  totalJobs: number;
  totalPages: number;
  currentPage: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
