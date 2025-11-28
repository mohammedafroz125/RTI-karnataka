# Production Test Checklist - Telangana RTI Website

## ✅ Pre-Deployment Testing Checklist

### Frontend Tests

#### 1. Build & Compilation
- [ ] Run `npm run build` in Frontend directory - should complete without errors
- [ ] Check for TypeScript compilation errors
- [ ] Verify all imports resolve correctly
- [ ] Check for any missing dependencies

#### 2. Component Functionality
- [ ] **Homepage loads correctly** - All sections render properly
- [ ] **Telangana Hero Section** - Displays correctly with proper spacing
- [ ] **Services Grid** - All 6 service cards display with proper images
- [ ] **RTI By Department** - 5-column layout works, PDF download modal opens
- [ ] **Video Section** - Video embeds correctly, no "For Telangana Residents" label
- [ ] **Use Cases** - All use case cards display correctly
- [ ] **FAQ Section** - Accordion functionality works
- [ ] **Consultation Form** - Form submission works
- [ ] **Navigation** - All links work correctly

#### 3. PDF Download Functionality
- [ ] Click on any Telangana department (e.g., "RTI Telangana Police Department")
- [ ] **Form Modal opens** - Name, Email, Phone fields display
- [ ] **Form validation works** - Shows errors for invalid inputs
- [ ] **PDF downloads** after form submission
- [ ] **Download tracking** - Backend receives user information (check logs)
- [ ] Test multiple departments to ensure all PDFs are accessible

#### 4. Responsive Design
- [ ] Test on mobile (375px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1366px, 1920px)
- [ ] Verify all sections maintain proper spacing
- [ ] Check that service images are readable on all screen sizes

#### 5. SEO & Metadata
- [ ] Page title: "File RTI Online in Telangana - FileMyRTI"
- [ ] Meta description is present
- [ ] Open Graph tags are correct
- [ ] Structured data (JSON-LD) is valid

### Backend Tests

#### 6. API Endpoints
- [ ] **PDF Route**: `GET /api/v1/pdf/telangana/:category/:filename` - Returns PDF
- [ ] **PDF Download Tracking**: `POST /api/v1/pdf/pdf-downloads` - Logs user data
- [ ] **Health Check**: `GET /health` - Returns 200 OK
- [ ] **States API**: `GET /api/v1/states/telangana` - Returns Telangana data

#### 7. PDF File Structure
- [ ] Verify PDFs exist in: `Frontend/src/assets/PDF/telangana/`
- [ ] Check folder structure matches pdfMapping.ts:
  - `telangana/RTI Telangana Police & Security/`
  - `telangana/RTI Telangana Muncipal & Housing/` (note: typo "Muncipal")
  - `telangana/RTI Telanganga Social Welfare/` (note: typo "Telanganga")
  - `telangana/RTI Telangana Utilities & Infrastructure/`
  - `telangana/RTI Telangana Government Services/`
  - `telangana/RTI Telangana Commerce & Industry/`
  - `telangana/RTI Telangana Environment & Resources/`
  - `telangana/RTI Telangana Culture & Tourism/`
  - `telangana/RTI Telangana Information & Technology/`
  - `telangana/RTI Telangana Education & Health/`

#### 8. Error Handling
- [ ] Test with invalid department name - Should show alert
- [ ] Test with missing PDF file - Should handle gracefully
- [ ] Test backend offline - Should fallback to public folder or show error

### Integration Tests

#### 9. End-to-End Flow
1. Navigate to homepage
2. Scroll to "RTI for Telangana Government Departments"
3. Click on "RTI Telangana Police Department"
4. Fill form: Name, Email, Phone
5. Submit form
6. Verify PDF downloads
7. Check backend logs for download tracking

#### 10. Cross-Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (if available)
- [ ] Mobile browsers (Chrome Mobile, Safari Mobile)

### Code Quality

#### 11. No StateWise Dependencies
- ✅ Verified: No imports from StateWise folder in Frontend/src
- ✅ Verified: No imports from StateWise folder in Backend (except log files)
- ✅ All components use local implementations

#### 12. Linting
- ✅ No linter errors found
- ✅ All TypeScript types are correct
- ✅ No console errors in browser

### Known Issues & Notes

1. **PDF Folder Names**: Some folders have typos that match source files:
   - "RTI Telangana Muncipal & Housing" (should be "Municipal")
   - "RTI Telanganga Social Welfare" (should be "Telangana")
   - These are kept as-is to match actual PDF file locations

2. **API URL**: Hardcoded to "rtionlinedelhi.filemyrti.com" in production mode
   - Can be overridden with `VITE_API_BASE_URL` environment variable
   - Update for Telangana domain if needed

3. **PDF Files**: Ensure all PDF files from `TELANGANA-TEMPLATE` folder are copied to:
   - `Frontend/src/assets/PDF/telangana/` with proper folder structure

## 🚀 Deployment Steps

1. **Copy PDF Files**:
   ```bash
   # Copy from TELANGANA-TEMPLATE to Frontend/src/assets/PDF/telangana/
   # Maintain the folder structure exactly as in TELANGANA-TEMPLATE
   ```

2. **Build Frontend**:
   ```bash
   cd Frontend
   npm install
   npm run build
   ```

3. **Test Backend**:
   ```bash
   cd Backend
   npm install
   npm start
   # Test endpoints manually or use test scripts
   ```

4. **Environment Variables**:
   - Set `VITE_API_BASE_URL` for production API URL
   - Configure database connection in Backend/.env
   - Set up proper CORS origins

5. **Final Verification**:
   - Test PDF downloads for at least 5 different departments
   - Verify form submissions work
   - Check all navigation links
   - Test responsive design

## ✅ All Systems Ready

After completing all checks above, the application is ready for production deployment.

