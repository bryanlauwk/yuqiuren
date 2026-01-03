import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'No image provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Use Gemini to analyze the image and find face position
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this image and find the face/head position for creating a profile avatar. 
                
Return a JSON object with the optimal crop area that centers on the face and includes the upper body/shoulders if visible. The crop should be a square area.

Return ONLY a valid JSON object in this exact format, nothing else:
{"x": <number 0-1 representing left edge of crop as percentage>, "y": <number 0-1 representing top edge of crop as percentage>, "size": <number 0-1 representing the size of square crop as percentage of the smaller dimension>}

If no face is detected, return: {"x": 0.5, "y": 0.5, "size": 1, "centered": true}

The values should position the crop to:
1. Center on the face/head
2. Include some space above the head
3. Include shoulders/upper chest if the image allows
4. Keep the face in the upper-center third of the final crop`
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded, please try again later' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Return fallback centered crop on error
      return new Response(
        JSON.stringify({ x: 0.5, y: 0.5, size: 1, centered: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    console.log('AI response:', content);

    // Parse the JSON from the response
    try {
      // Extract JSON from response (handle markdown code blocks)
      let jsonStr = content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }
      
      const cropData = JSON.parse(jsonStr);
      
      // Validate and clamp values
      const result = {
        x: Math.max(0, Math.min(1, Number(cropData.x) || 0.5)),
        y: Math.max(0, Math.min(1, Number(cropData.y) || 0.5)),
        size: Math.max(0.3, Math.min(1, Number(cropData.size) || 1)),
        centered: cropData.centered || false
      };
      
      console.log('Returning crop data:', result);
      
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Return fallback centered crop
      return new Response(
        JSON.stringify({ x: 0.5, y: 0.5, size: 1, centered: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in detect-face function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
