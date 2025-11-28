# Telangana Secretariat Hero Background Image Setup

## Image Specifications

### Required Image Details:
- **Format**: JPG or WebP (WebP recommended for better compression)
- **Dimensions**: 1920×1080 pixels (16:9 aspect ratio)
- **File Size**: Optimized to < 500KB for web performance
- **Content**: 
  - Telangana Secretariat building, perfectly centered
  - Full front elevation clearly visible
  - Clean empty road/paved area in foreground
  - Soft blue-white color grading
  - Atmospheric haze and gradient sky (light blue to white)
  - No people, vehicles, text, or logos
  - Photorealistic with soft shadows

## File Placement

1. **Create the images directory** (if it doesn't exist):
   ```
   Frontend/src/assets/images/
   ```

2. **Save your image as**:
   ```
   Frontend/src/assets/images/telangana-secretariat-hero.jpg
   ```
   OR
   ```
   Frontend/src/assets/images/telangana-secretariat-hero.webp
   ```

3. **Update the path in `TelanganaHero.tsx`** (line ~22):
   ```tsx
   backgroundImage: 'url(/src/assets/images/telangana-secretariat-hero.jpg)',
   ```
   Change `.jpg` to `.webp` if using WebP format.

## Image Generation Options

### Option 1: AI Image Generation
**Midjourney Prompt:**
```
Telangana Secretariat building Hyderabad, landscape 16:9, building centered, full front elevation, soft blue white color grading, clean empty paved road foreground, atmospheric haze, gradient sky light blue to white, photorealistic, professional government building, sharp details, soft background depth, no people no vehicles no text, premium legal-tech website hero --ar 16:9 --style raw --v 6
```

**DALL-E 3 / ChatGPT Plus Prompt:**
```
A photorealistic landscape image of the Telangana Secretariat building in Hyderabad. The building is perfectly centered in a 16:9 frame with its full front elevation clearly visible. The image has soft blue and white color grading suitable for a legal-tech website. The Secretariat is sharp and detailed, while the distant background is slightly soft for depth. There's a clean, empty paved road in the foreground leading toward the building. The sky features a soft gradient from light blue to white with atmospheric haze. The composition leaves space above and around the building for website headings. No people, vehicles, text, or logos. Professional government aesthetic with clean lighting and soft shadows.
```

### Option 2: Stock Photos + Editing
1. Search Unsplash/Pexels for "Telangana Secretariat" or "Hyderabad government building"
2. Edit in Photoshop/GIMP:
   - Apply blue-white color grading
   - Add atmospheric haze overlay
   - Soften distant background
   - Ensure 16:9 crop with building centered

### Option 3: Commission Photography
- Hire a photographer on Fiverr/Upwork
- Brief: Professional hero image of Telangana Secretariat for website

## Image Optimization

After obtaining your image:

1. **Compress the image**:
   - Use tools like TinyPNG, Squoosh, or ImageOptim
   - Target: < 500KB file size
   - Maintain quality: 80-85%

2. **Create WebP version** (optional but recommended):
   ```bash
   # Using cwebp (if installed)
   cwebp telangana-secretariat-hero.jpg -q 85 -o telangana-secretariat-hero.webp
   ```

3. **Test the hero section**:
   - Check on desktop (1920px+ width)
   - Check on tablet (768px-1024px)
   - Check on mobile (< 768px)
   - Ensure text remains readable
   - Verify building is centered

## Current Implementation

The hero section is already set up with:
- ✅ Background image container with proper positioning
- ✅ Overlay gradients for text readability
- ✅ Responsive min-height
- ✅ Fallback gradient background (if image not found)
- ✅ All existing content and functionality preserved

## Next Steps

1. Generate/obtain the Telangana Secretariat image
2. Save it to `Frontend/src/assets/images/telangana-secretariat-hero.jpg`
3. Update the path in `TelanganaHero.tsx` if using a different filename
4. Test the hero section on different screen sizes
5. Optimize image if file size is too large

## Notes

- The overlay gradients ensure text remains readable over the background
- The image will be responsive and scale properly on all devices
- If the image path is incorrect, the fallback gradient will show
- The building should be centered to allow space for headings and CTAs above it

