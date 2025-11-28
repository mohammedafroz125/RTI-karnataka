# 15-Minute RTI Consultation - Complete Replication Guide

This guide contains all the code and instructions needed to replicate the "15-Minute RTI Consultation" feature to another website.

## 📋 Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Required Dependencies](#required-dependencies)
4. [Step-by-Step Integration](#step-by-step-integration)
5. [Code Files](#code-files)
6. [Backend Requirements](#backend-requirements)
7. [Configuration](#configuration)

---

## Overview

The 15-Minute RTI Consultation is a paid consultation service that allows users to:
- Book a 15-minute consultation with RTI experts
- Pay ₹199 (original price ₹499) for the service
- Submit consultation requests with payment integration
- Receive confirmation after successful payment

**Route:** `/services/15-minute-consultation`

---

## File Structure

```
Your Project/
├── src/
│   ├── data/
│   │   └── rtiModels.ts (contains 15min RTI model definition)
│   ├── pages/
│   │   └── services/
│   │       └── RTIModelPage.tsx (main page component)
│   ├── components/
│   │   └── services/
│   │       ├── ConsultationModal.tsx
│   │       ├── PaymentSuccessModal.tsx
│   │       ├── ServiceHero.tsx
│   │       ├── ServiceFeatures.tsx
│   │       └── ... (other service components)
│   ├── hooks/
│   │   ├── useRTIService.ts
│   │   ├── useConsultationForm.ts
│   │   └── usePayment.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── payment.ts
│   ├── types/
│   │   └── services.ts
│   └── assets/
│       └── images/
│           └── 15minIcon.webp
└── App.tsx (routing configuration)
```

---

## Required Dependencies

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "react-helmet-async": "^1.0.0",
    "razorpay": "^1.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-router-dom": "^5.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## Step-by-Step Integration

### Step 1: Add Route to App.tsx

```tsx
import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const RTIModelPage = lazy(() => import('./pages/services/RTIModelPage').then(m => ({ default: m.RTIModelPage })));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ... other routes ... */}
        <Route path="/services/15-minute-consultation" element={<RTIModelPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Step 2: Add RTI Model Data

Add the 15min RTI model to your `rtiModels.ts` file (see code files section).

### Step 3: Add Icon Image

Place the `15minIcon.webp` image in your assets folder and import it where needed.

### Step 4: Configure Payment Gateway

Set up Razorpay credentials in your `.env` file:
```
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Step 5: Backend API Setup

Ensure your backend has endpoints for:
- Service lookup by slug: `GET /api/v1/services/slug/15-minute-consultation`
- Payment order creation: `POST /api/v1/payments/orders`
- Payment verification: `POST /api/v1/payments/verify`
- RTI application creation: `POST /api/v1/rti-applications/public`

---

## Code Files

### 1. RTI Model Definition (`src/data/rtiModels.ts`)

```typescript
export const rtiModels: Record<string, RTIModel> = {
  '15-minute-consultation': {
    id: '6',
    name: '15 min RTI',
    icon: '⏱️',
    iconText: '15-MIN TALK TO EXPERT',
    description: 'Get personalized advice from legal experts to navigate complex RTI applications effectively.',
    fullDescription: 'RTI applications can be complex, but expert guidance makes all the difference. With our 15-minute consultation service, you\'ll get personalized advice from legal experts to navigate complex RTI applications effectively. Our experienced professionals will help you understand the process, draft your application correctly, and ensure you get the information you need.',
    features: [
      'Expert legal consultation',
      'Personalized RTI guidance',
      'Quick 15-minute session',
      'Professional advice',
      'Application drafting help',
      'Process explanation',
      'Best practices sharing'
    ],
    price: 199,
    originalPrice: 499,
    buttonText: 'Pay Now'
  }
};
```

### 2. Main Page Component (`src/pages/services/RTIModelPage.tsx`)

[See attached file - this is the main component that handles the entire page]

### 3. Consultation Modal (`src/components/services/ConsultationModal.tsx`)

[See attached file - handles the form modal]

### 4. Hooks

- `useRTIService.ts` - Fetches service data from backend
- `useConsultationForm.ts` - Manages form state
- `usePayment.ts` - Handles payment flow

### 5. API Services (`src/services/api.ts`)

Required API functions:
- `servicesAPI.getBySlug(slug)`
- `paymentsAPI.createOrder(data)`
- `paymentsAPI.verifyPayment(data)`
- `rtiApplicationsAPI.createPublic(data)`

---

## Backend Requirements

### Database Schema

Your backend should have a `services` table with:
- `id` (int)
- `name` (varchar)
- `slug` (varchar) - should be '15-minute-consultation'
- `description` (text)
- `full_description` (text)
- `price` (decimal) - 199.00
- `original_price` (decimal) - 499.00
- `button_text` (varchar) - 'Pay Now'
- `icon` (varchar) - optional
- `icon_text` (varchar) - optional

### API Endpoints

1. **GET /api/v1/services/slug/15-minute-consultation**
   - Returns service details

2. **POST /api/v1/payments/orders**
   - Creates Razorpay order
   - Body: `{ amount, currency, receipt, notes }`

3. **POST /api/v1/payments/verify**
   - Verifies payment signature
   - Body: `{ razorpay_payment_id, razorpay_order_id, razorpay_signature, order_id }`

4. **POST /api/v1/rti-applications/public**
   - Creates RTI application/consultation request
   - Body: `{ full_name, email, mobile, rti_query?, address?, pincode?, service_id, state_id, payment_id, order_id }`

---

## Configuration

### Environment Variables

```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Payment Configuration

Update `src/constants/services.ts`:
```typescript
export const PAYMENT_CONFIG = {
  razorpayLogoUrl: '/path/to/razorpay-logo.png'
};
```

---

## Key Features

1. **Payment Integration**: Razorpay payment gateway
2. **Form Validation**: Client-side validation for all fields
3. **Error Handling**: Comprehensive error handling and user feedback
4. **Success Modal**: Shows confirmation after successful payment
5. **Responsive Design**: Works on mobile, tablet, and desktop
6. **SEO Optimized**: Includes meta tags and structured data

---

## Testing Checklist

- [ ] Route `/services/15-minute-consultation` loads correctly
- [ ] Service data loads from backend
- [ ] Consultation modal opens and closes
- [ ] Form validation works
- [ ] Payment flow initiates correctly
- [ ] Payment verification works
- [ ] Success modal displays after payment
- [ ] Application is created in backend
- [ ] Mobile responsive design works
- [ ] Error messages display correctly

---

## Support

For issues or questions, refer to the main codebase or contact the development team.

---

## Notes

- The service ID in the database should match the `id` field in `rtiModels.ts` (currently '6')
- Ensure Razorpay is properly configured with test/live keys
- Backend should handle payment verification securely
- All form fields except name, email, and mobile are optional

