# 15-Minute RTI - Complete Code Package

This file contains all the essential code needed to replicate the 15-Minute RTI Consultation feature.

---

## 1. RTI Model Definition

**File: `src/data/rtiModels.ts`**

```typescript
import { RTIModel } from '../types/services';

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

export const getRTIModelBySlug = (slug: string): RTIModel | null => {
  return rtiModels[slug] || null;
};
```

---

## 2. Type Definitions

**File: `src/types/services.ts`**

```typescript
export interface RTIModel {
  id: string;
  name: string;
  icon: string;
  iconText: string;
  description: string;
  fullDescription: string;
  features: string[];
  price: number;
  originalPrice: number;
  buttonText: string;
}

export interface ConsultationFormData {
  fullName: string;
  mobile: string;
  email: string;
  rtiQuery?: string;
  address?: string;
  pincode?: string;
  acceptTerms?: boolean;
}
```

---

## 3. API Helper Function

**File: `src/services/api.ts` (add this function)**

```typescript
/**
 * Convert consultation form data to API format
 */
export const convertConsultationFormToAPI = (
  formData: ConsultationFormData,
  serviceId: number,
  stateId: number
): {
  service_id: number;
  state_id: number;
  full_name: string;
  mobile: string;
  email: string;
  rti_query?: string | null;
  address?: string | null;
  pincode?: string | null;
} => {
  return {
    service_id: serviceId,
    state_id: stateId,
    full_name: formData.fullName.trim(),
    mobile: formData.mobile.trim(),
    email: formData.email.trim(),
    rti_query: formData.rtiQuery?.trim() || null,
    address: formData.address?.trim() || null,
    pincode: formData.pincode?.trim() || null
  };
};
```

---

## 4. Route Configuration

**File: `src/App.tsx` (add this route)**

```tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const RTIModelPage = lazy(() => 
  import('./pages/services/RTIModelPage').then(m => ({ default: m.RTIModelPage }))
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* ... other routes ... */}
          <Route 
            path="/services/15-minute-consultation" 
            element={<RTIModelPage />} 
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

---

## 5. Payment Service

**File: `src/services/payment.ts`**

```typescript
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number; // Amount in paise
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay script'));
    document.body.appendChild(script);
  });
};

export const initializePayment = async (
  options: Omit<RazorpayOptions, 'handler' | 'modal'>,
  onSuccess: (response: RazorpayResponse) => void | Promise<void>,
  onDismiss?: () => void
): Promise<void> => {
  try {
    await loadRazorpayScript();

    if (!window.Razorpay) {
      throw new Error('Razorpay SDK not loaded');
    }

    const razorpayOptions: RazorpayOptions = {
      ...options,
      handler: async (response: RazorpayResponse) => {
        try {
          await onSuccess(response);
        } catch (error) {
          console.error('Payment success handler error:', error);
          throw error;
        }
      },
      modal: {
        ondismiss: () => {
          if (onDismiss) {
            onDismiss();
          }
        }
      }
    };

    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  } catch (error) {
    console.error('Failed to initialize Razorpay payment:', error);
    throw error;
  }
};

export const formatAmountToPaise = (amount: number): number => {
  return Math.round(amount * 100);
};
```

---

## 6. Payment Hook

**File: `src/hooks/usePayment.ts`**

```typescript
import { useState, useCallback } from 'react';
import { paymentsAPI } from '../services/api';
import { initializePayment, formatAmountToPaise, RazorpayResponse } from '../services/payment';
import { RTIModel } from '../types/services';

export type PaymentStatus = 'idle' | 'creating_order' | 'processing' | 'verifying' | 'success' | 'failed';

export interface PaymentState {
  status: PaymentStatus;
  orderId: string | null;
  paymentId: string | null;
  error: string | null;
}

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

export const usePayment = () => {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    status: 'idle',
    orderId: null,
    paymentId: null,
    error: null
  });

  const resetPayment = useCallback(() => {
    setPaymentState({
      status: 'idle',
      orderId: null,
      paymentId: null,
      error: null
    });
  }, []);

  const initiatePayment = useCallback(
    async (
      model: RTIModel,
      userData: { name: string; email: string; mobile: string },
      onSuccess: (paymentId: string, orderId: string) => void | Promise<void>,
      onError?: (error: string) => void,
      onCancel?: () => void
    ) => {
      try {
        resetPayment();
        setPaymentState(prev => ({ ...prev, status: 'creating_order', error: null }));

        const orderResponse = await paymentsAPI.createOrder({
          amount: formatAmountToPaise(model.price),
          currency: 'INR',
          receipt: `RTI_${model.id}_${Date.now()}`,
          notes: {
            service_id: model.id,
            service_name: model.name,
            user_name: userData.name,
            user_email: userData.email,
            user_mobile: userData.mobile
          }
        }) as any;

        if (!orderResponse?.success || !orderResponse?.data?.id) {
          throw new Error(orderResponse?.message || 'Failed to create payment order');
        }

        const orderId = orderResponse.data.id;
        setPaymentState(prev => ({ ...prev, orderId, status: 'processing' }));

        if (!RAZORPAY_KEY || RAZORPAY_KEY.trim() === '') {
          throw new Error('Razorpay Key ID is missing');
        }

        await initializePayment(
          {
            key: RAZORPAY_KEY,
            amount: formatAmountToPaise(model.price),
            currency: 'INR',
            name: 'Your Company Name',
            description: `Payment for ${model.name}`,
            order_id: orderId,
            prefill: {
              name: userData.name,
              email: userData.email,
              contact: userData.mobile
            },
            theme: {
              color: '#4F46E5'
            }
          },
          async (response: RazorpayResponse) => {
            try {
              setPaymentState(prev => ({ ...prev, status: 'verifying' }));

              const verifyResponse = await paymentsAPI.verifyPayment({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                order_id: orderId
              }) as any;

              if (!verifyResponse?.success) {
                throw new Error(verifyResponse?.message || 'Payment verification failed');
              }

              setPaymentState(prev => ({
                ...prev,
                status: 'success',
                paymentId: response.razorpay_payment_id
              }));

              await onSuccess(response.razorpay_payment_id, orderId);
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'Payment verification failed';
              setPaymentState(prev => ({
                ...prev,
                status: 'failed',
                error: errorMessage
              }));

              if (onError) {
                onError(errorMessage);
              } else {
                throw error;
              }
            }
          },
          () => {
            setPaymentState(prev => ({
              ...prev,
              status: 'idle',
              error: null
            }));
            if (onCancel) {
              onCancel();
            }
          }
        );
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Payment initialization failed';
        setPaymentState(prev => ({
          ...prev,
          status: 'failed',
          error: errorMessage
        }));

        if (onError) {
          onError(errorMessage);
        }
      }
    },
    [resetPayment]
  );

  return {
    paymentState,
    initiatePayment,
    resetPayment
  };
};
```

---

## 7. Consultation Form Hook

**File: `src/hooks/useConsultationForm.ts`**

```typescript
import { useState, useCallback } from 'react';
import { ConsultationFormData } from '../types/services';

const initialFormData: ConsultationFormData = {
  fullName: '',
  mobile: '',
  email: '',
  rtiQuery: '',
  address: '',
  pincode: '',
  acceptTerms: false
};

export const useConsultationForm = () => {
  const [formData, setFormData] = useState<ConsultationFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback((field: keyof ConsultationFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else {
      const cleaned = formData.mobile.replace(/\D/g, '');
      const length = cleaned.length;
      if (length < 10) {
        newErrors.mobile = 'Mobile number must be at least 10 digits';
      } else if (length > 13) {
        newErrors.mobile = 'Mobile number must not exceed 13 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (onSubmit: (data: ConsultationFormData) => Promise<void> | void) => {
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validate]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
    resetForm
  };
};
```

---

## 8. RTI Service Hook

**File: `src/hooks/useRTIService.ts`**

```typescript
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { servicesAPI } from '../services/api';
import { RTIModel } from '../types/services';
import { getRTIModelBySlug } from '../data/rtiModels';

export const useRTIService = (): {
  model: RTIModel | null;
  modelSlug: string | null;
  isLoading: boolean;
  error: string | null;
} => {
  const location = useLocation();
  const [backendModel, setBackendModel] = useState<RTIModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const modelSlug = useMemo(() => {
    const pathParts = location.pathname.split('/services/');
    return pathParts.length > 1 ? pathParts[1] : null;
  }, [location.pathname]);

  useEffect(() => {
    if (!modelSlug) {
      setIsLoading(false);
      return;
    }

    const fetchService = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await servicesAPI.getBySlug(modelSlug) as any;

        if (response.success && response.data) {
          const backendData = response.data;
          const staticModel = getRTIModelBySlug(modelSlug);

          const convertedModel: RTIModel = {
            id: backendData.id.toString(),
            name: backendData.name,
            icon: backendData.icon || staticModel?.icon || '📋',
            iconText: backendData.icon_text || backendData.name,
            description: backendData.description || staticModel?.description || '',
            fullDescription: backendData.full_description || backendData.description || staticModel?.fullDescription || '',
            features: staticModel?.features || [],
            price: parseFloat(backendData.price) || staticModel?.price || 0,
            originalPrice: parseFloat(backendData.original_price) || staticModel?.originalPrice || 0,
            buttonText: backendData.button_text || staticModel?.buttonText || 'Get Started'
          };

          setBackendModel(convertedModel);
        } else {
          throw new Error('Service not found');
        }
      } catch (err) {
        console.warn('Failed to fetch service from backend, using static data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load service');
        setBackendModel(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [modelSlug]);

  const model = useMemo(() => {
    if (backendModel) return backendModel;
    if (!modelSlug) return null;
    return getRTIModelBySlug(modelSlug);
  }, [backendModel, modelSlug]);

  return {
    model,
    modelSlug,
    isLoading,
    error
  };
};
```

---

## 9. API Endpoints Configuration

**File: `src/config/api.ts` (ensure these endpoints exist)**

```typescript
export const API_ENDPOINTS = {
  SERVICES: {
    LIST: `${API_BASE_URL}/services`,
    BY_SLUG: (slug: string) => `${API_BASE_URL}/services/slug/${slug}`
  },
  PAYMENTS: {
    CREATE_ORDER: `${API_BASE_URL}/payments/orders`,
    VERIFY: `${API_BASE_URL}/payments/verify`
  },
  RTI_APPLICATIONS: {
    CREATE: `${API_BASE_URL}/rti-applications`,
    CREATE_PUBLIC: `${API_BASE_URL}/rti-applications/public`
  },
  STATES: {
    LIST: `${API_BASE_URL}/states`
  }
};
```

---

## 10. Environment Variables

**File: `.env`**

```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## 11. Main Page Component Usage

The main `RTIModelPage.tsx` component is already provided in the codebase. It uses:
- `useRTIService()` hook to fetch service data
- `useConsultationForm()` hook for form management
- `usePayment()` hook for payment processing
- `ConsultationModal` component for the form
- `PaymentSuccessModal` component for success confirmation

**Key Integration Points:**
1. The page automatically detects the route `/services/15-minute-consultation`
2. It fetches service data from backend (falls back to static data)
3. Payment flow: Create order → Initialize Razorpay → Verify payment → Submit application
4. Shows success modal after completion

---

## Quick Integration Checklist

- [ ] Add route in `App.tsx`
- [ ] Add RTI model to `rtiModels.ts`
- [ ] Ensure all hooks are in place
- [ ] Configure API endpoints
- [ ] Set up Razorpay credentials
- [ ] Add icon image (`15minIcon.webp`)
- [ ] Test payment flow
- [ ] Verify backend endpoints
- [ ] Test form validation
- [ ] Test success flow

---

## Notes

- The service ID '6' should match your database
- All form fields except name, email, and mobile are optional
- Payment is required (price: ₹199)
- Backend must verify payment signature securely
- Ensure CORS is configured for API calls

