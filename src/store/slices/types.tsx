export interface Job {
  _id: string;
  title: string;
  company: {
    companyName: string;
    companyLogo?: string;
  };
  city: string;
  province: string;
  country: string;
  salary?: {
    from: number;
    to: number;
  };
  skills?: string[];
  jobType?: string;
  careerLevel?: string;
  description?: string;
  availability?: string;
  candidateType?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobSeeker {
  _id?: string;
  savedJobs: Job[];
}

export interface JobSeekerState {
  jobSeeker: JobSeeker | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
