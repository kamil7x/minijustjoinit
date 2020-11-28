import { EmploymentTypeEnum } from '../enums/EmploymentType.enum';
import { ExperienceLevelEnum } from '../enums/ExperienceLevel.enum';
import { Skill } from './Skill';

export interface JobOffer {
  id: string;
  title: string;
  street: string;
  city: string;
  country_code: string;
  marker_icon: string;
  remote: boolean;
  experience_level: ExperienceLevelEnum;
  salary_from: number;
  salary_to: number;
  salary_currency: string;
  latitude: number;
  longitude: number;
  employment_type: EmploymentTypeEnum;
  published_at: Date;
  company_name: string;
  company_url: string;
  company_size: string;
  company_logo_url: string;
  skills: Skill[];
}
