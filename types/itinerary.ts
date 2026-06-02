// ============================================================
// Itinerary Data Types
// ============================================================

export type Budget = 'Backpacker' | 'Mid-tier' | 'Luxury';
export type Vibe = 'Adventure' | 'Culture' | 'Chill' | 'Foodie';

export interface TripInput {
  starting_city: string;
  destination: string;
  days: number;
  budget: Budget;
  vibe: Vibe;
}

export interface TransitLogistics {
  mode: string;
  details: string;
  booking_hint_keyword: string;
  estimated_fare_inr: number;
}

export interface Activity {
  title: string;
  description: string;
}

export interface LunchSpot {
  name: string;
  type: 'dhaba' | 'local_eatery' | 'cafe';
  must_try_dish: string;
}

export interface DinnerAndStay {
  restaurant: string;
  stay_recommendation: string;
  stay_hint_keyword: string;
}

export interface AffiliateCTA {
  platform_name: string;
  target_url: string;
  button_label: string;
}

export interface ItineraryDay {
  day_number: number;
  transit_logistics: TransitLogistics;
  morning_activity: Activity;
  lunch_spot: LunchSpot;
  afternoon_activity: Activity;
  dinner_and_stay: DinnerAndStay;
  affiliate_cta?: AffiliateCTA;
}

export interface TripSummary {
  destination: string;
  total_estimated_cost_inr: number;
  primary_currency: 'INR';
}

export interface ItineraryResponse {
  trip_summary: TripSummary;
  days: ItineraryDay[];
}
