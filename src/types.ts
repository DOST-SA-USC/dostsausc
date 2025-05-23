export interface UserData {
  user_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  birth_date: string;
  program: string;
  usc_id: string;
  scholarship_type: string;
  award_year: string;
  contact_number: string;
}

export interface IDData extends UserData {
  pictureURL: string;
}
