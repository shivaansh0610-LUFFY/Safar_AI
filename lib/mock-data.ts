import { ItineraryResponse } from '@/types/itinerary';

export const mockItinerary: ItineraryResponse = {
  trip_summary: {
    destination: 'Manali, Himachal Pradesh',
    total_estimated_cost_inr: 12500,
    primary_currency: 'INR',
  },
  days: [
    {
      day_number: 1,
      transit_logistics: {
        mode: 'HRTC Volvo Bus',
        details: 'Depart ISBT Kashmere Gate, Delhi at 17:30. Overnight Volvo semi-sleeper. Arrives Manali Bus Stand ~10:00 AM next day.',
        booking_hint_keyword: 'HRTC Bus',
        estimated_fare_inr: 1450,
      },
      morning_activity: {
        title: 'Overnight Transit → Morning Arrival',
        description: 'Wake up to the Beas river gorge views as the bus winds through Kullu. Grab chai at the bus stand dhaba before heading to your stay.',
      },
      lunch_spot: {
        name: 'Café 1947',
        type: 'cafe',
        must_try_dish: 'Himachali Dham Thali (only on weekends) or their classic Rajma Chawal',
      },
      afternoon_activity: {
        title: 'Old Manali Exploration',
        description: 'Walk the 2km uphill lane to Old Manali village. Explore the Manu temple, apple orchards, and the infamous hippie cafés along Mall Road.',
      },
      dinner_and_stay: {
        restaurant: 'Drifters Inn Café',
        stay_recommendation: 'Dragon Guest House, Old Manali — River-view rooms from ₹600/night',
        stay_hint_keyword: 'Hostelworld',
      },
      affiliate_cta: {
        platform_name: 'redBus',
        target_url: 'https://www.redbus.in',
        button_label: 'Book HRTC Volvo on redBus',
      },
    },
    {
      day_number: 2,
      transit_logistics: {
        mode: 'Shared Sumo / Jeep',
        details: 'Hire a shared Sumo from Manali bus stand to Solang Valley + Rohtang Nala. Fixed rate ₹350/seat, departs 08:00 AM.',
        booking_hint_keyword: 'Local Transport',
        estimated_fare_inr: 700,
      },
      morning_activity: {
        title: 'Solang Valley Snow Activities',
        description: 'Ropeway ride (₹500 return), snow zorbing, and trekking toward Dhundhi campsite. Arrive early to beat tourist crowds.',
      },
      lunch_spot: {
        name: 'Rohtang Dhaba',
        type: 'dhaba',
        must_try_dish: 'Maggi with extra butter, Alu ke paranthe, masala chai',
      },
      afternoon_activity: {
        title: 'Beas Kund Trek (Half Day)',
        description: 'A moderate 8km return trail from Solang to the glacial Beas Kund lake. Stunning Himalayan panoramas. Carry your own water.',
      },
      dinner_and_stay: {
        restaurant: "Johnson's Café",
        stay_recommendation: 'The Hosteller Manali — Dorm beds from ₹800 or private rooms ₹2,200',
        stay_hint_keyword: 'Hostelworld',
      },
      affiliate_cta: {
        platform_name: 'Hostelworld',
        target_url: 'https://www.hostelworld.com',
        button_label: 'Book The Hosteller on Hostelworld',
      },
    },
    {
      day_number: 3,
      transit_logistics: {
        mode: 'Local Auto + Walk',
        details: 'Take a prepaid auto from Old Manali to Hadimba Temple (₹80 fixed). Walk back via the cedar forest trail.',
        booking_hint_keyword: 'Local Transport',
        estimated_fare_inr: 200,
      },
      morning_activity: {
        title: 'Hadimba Devi Temple & Dhungri Forest',
        description: 'Visit the ancient 1553 CE wooden pagoda temple early morning to avoid crowds. The Dhungri cedar forest loop trail is a zero-cost hidden gem.',
      },
      lunch_spot: {
        name: 'Chopsticks Restaurant',
        type: 'local_eatery',
        must_try_dish: 'Tibetan Thukpa soup with momos, followed by Apple cider from the orchard stall outside',
      },
      afternoon_activity: {
        title: 'Vashisht Hot Springs & Village',
        description: 'Free public hot spring baths at Vashisht temple complex. Explore the narrow lanes of the village, the rooftop cafés, and pick up handmade Kullu shawls.',
      },
      dinner_and_stay: {
        restaurant: 'Lazy Dog Lounge',
        stay_recommendation: 'Back to Dragon Guest House — or upgrade to Manuallaya Resort for a splurge night',
        stay_hint_keyword: 'Hostelworld',
      },
    },
    {
      day_number: 4,
      transit_logistics: {
        mode: 'Private Taxi / Innova',
        details: 'Day-trip taxi to Naggar Castle and Kullu Maidan. Negotiate fixed rate ₹2200 full day from Manali bus stand taxi stand.',
        booking_hint_keyword: 'Local Transport',
        estimated_fare_inr: 2200,
      },
      morning_activity: {
        title: 'Naggar Castle & Nicholas Roerich Art Gallery',
        description: 'The 16th century Naggar Castle has been converted to a heritage hotel with public walkways. The Roerich Museum next door (₹50 entry) houses stunning Himalayan paintings.',
      },
      lunch_spot: {
        name: 'Castle Kitchen (Naggar Castle Café)',
        type: 'cafe',
        must_try_dish: 'Himachali Sidu bread with ghee and wild honey — this is the real deal',
      },
      afternoon_activity: {
        title: 'Kullu River Rafting',
        description: 'Grade II-III rapids on the Beas between Pirdi and Jhiri (14km stretch). Book directly with local operators at the riverbank for ₹700-900/person.',
      },
      dinner_and_stay: {
        restaurant: 'Shiva Café',
        stay_recommendation: 'Same stay. Pack tonight for tomorrow morning departure.',
        stay_hint_keyword: 'Hostelworld',
      },
      affiliate_cta: {
        platform_name: 'Thrillophilia',
        target_url: 'https://www.thrillophilia.com',
        button_label: 'Pre-book Rafting via Thrillophilia',
      },
    },
    {
      day_number: 5,
      transit_logistics: {
        mode: 'HRTC Volvo Return',
        details: 'Depart Manali Bus Stand at 18:00 PM. Overnight Volvo returns to ISBT Delhi by 08:30 AM. Book return ticket on Day 1 to avoid sold-out situations.',
        booking_hint_keyword: 'HRTC Bus',
        estimated_fare_inr: 1450,
      },
      morning_activity: {
        title: 'Leisurely Farewell Morning',
        description: 'Last Apple juice from the Mall Road stalls. Browse handmade wooden crafts. Trek to the Manali Gompa (Tibetan monastery) 1km from town center.',
      },
      lunch_spot: {
        name: 'Il Forno',
        type: 'cafe',
        must_try_dish: 'Wood-fired pizza and fresh pasta — surprisingly excellent at 2050m altitude',
      },
      afternoon_activity: {
        title: 'Rest & Pack → Evening Departure',
        description: 'Check out by 12:00. Use luggage storage at the guest house. Spend the afternoon at the riverside parks near the old bridge.',
      },
      dinner_and_stay: {
        restaurant: 'Have dinner at the bus stand dhaba before boarding',
        stay_recommendation: 'Overnight on the return Volvo bus',
        stay_hint_keyword: 'HRTC Bus',
      },
      affiliate_cta: {
        platform_name: 'redBus',
        target_url: 'https://www.redbus.in',
        button_label: 'Book Return Volvo on redBus',
      },
    },
  ],
};
