import { JobOffer } from '../../interfaces/JobOffer';

export const fetchOffersList = async (): Promise<JobOffer[]> => {
  const response = await fetch(`${process.env.API_URL}/offers`);
  return response.json();
};
