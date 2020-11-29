import { JobOffer } from '../interfaces/JobOffer';

export const getOffers = async (): Promise<JobOffer[]> => {
  try {
    const response = await fetch(`${process.env.API_URL}/offers`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
