import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TripInput, ItineraryResponse } from '@/types/itinerary';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');

const buildPrompt = (input: TripInput): string => `
You are a hyper-local Indian travel expert with deep knowledge of transport, accommodation, food, and activities across India.

Generate a detailed ${input.days}-day itinerary for a ${input.budget} budget ${input.vibe} trip from ${input.starting_city} to ${input.destination}.

RULES:
- Use REAL Indian transport (name the actual bus: HRTC Volvo, KSRTC Airavat, Rajasthan Roadways; or train: Shatabdi, Rajdhani, Kalka Mail, etc.)
- Include named local restaurants, dhabas, cafés — NOT generic "local eatery"
- Budget type "${input.budget}": 
  * Backpacker = ₹800-1,500/day total; 
  * Mid-tier = ₹2,000-5,000/day; 
  * Luxury = ₹7,000+/day
- Vibe "${input.vibe}":
  * Adventure = treks, rafting, sports; 
  * Culture = temples, heritage sites, local traditions;
  * Chill = beaches, cafés, sunsets, slow travel;
  * Foodie = street food tours, local specialties, cooking classes
- Total cost should match ${input.days} days × budget tier
- affiliate_cta platform: use "MakeMyTrip" for hotels, "RedBus" for buses, "IRCTC" for trains, "Airbnb" for unique stays

Return ONLY valid JSON matching this exact schema:
{
  "trip_summary": {
    "destination": "string",
    "total_estimated_cost_inr": number,
    "primary_currency": "INR"
  },
  "days": [
    {
      "day_number": number,
      "transit_logistics": {
        "mode": "string (e.g., HRTC Volvo Bus, Shatabdi Express, Shared Cab)",
        "details": "string (departure time, pickup point, journey duration)",
        "booking_hint_keyword": "string (exact keyword to search on RedBus/IRCTC/etc.)",
        "estimated_fare_inr": number
      },
      "morning_activity": {
        "title": "string",
        "description": "string (2-3 sentences with local tips)"
      },
      "lunch_spot": {
        "name": "string (real named place)",
        "type": "dhaba" | "local_eatery" | "cafe",
        "must_try_dish": "string"
      },
      "afternoon_activity": {
        "title": "string",
        "description": "string (2-3 sentences with local tips)"
      },
      "dinner_and_stay": {
        "restaurant": "string (real named restaurant or dhaba)",
        "stay_recommendation": "string (named property + why it's good for this budget)",
        "stay_hint_keyword": "string (keyword to search on MakeMyTrip/Airbnb)"
      },
      "affiliate_cta": {
        "platform_name": "string",
        "target_url": "https://www.makemytrip.com" | "https://www.redbus.in" | "https://www.irctc.co.in" | "https://www.airbnb.co.in",
        "button_label": "string (e.g., 'Book Hotel on MakeMyTrip')"
      }
    }
  ]
}

Generate exactly ${input.days} day objects. Return ONLY the JSON object, no markdown, no explanation.
`;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TripInput;

    if (!body.destination || !body.starting_city || !body.days) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured in .env.local' }, { status: 503 });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.75,
        maxOutputTokens: 8192,
      },
    });

    const result = await model.generateContent(buildPrompt(body));
    const text = result.response.text();

    let parsed: ItineraryResponse;
    try {
      parsed = JSON.parse(text);
    } catch {
      // Attempt to extract JSON from text if there's surrounding content
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error('Failed to parse AI response as JSON');
      parsed = JSON.parse(match[0]);
    }

    return NextResponse.json(parsed);
  } catch (err: unknown) {
    console.error('[generate-itinerary] Error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
