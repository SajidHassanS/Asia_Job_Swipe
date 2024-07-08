export interface Job {
  _id: string;
  title: string;
  company: {
    companyLogo: string;
    companyName: string;
    city: string;
    province: string;
    country: string;
  };
  salary: {
    from: number;
    to: number;
  };
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
