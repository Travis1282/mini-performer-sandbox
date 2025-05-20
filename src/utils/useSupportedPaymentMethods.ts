'use client';

import type {
  IPaymentMethodsSupported,
  PAYMENT_METHODS_TYPES,
} from '@/contracts/entities/checkout';
import { PAYMENT_METHODS } from '@/contracts/entities/checkout';
import { useFeatureIsOn } from '@growthbook/growthbook-react';
import { useEffect, useState } from 'react';
import { applePaySupported } from './applePaySupported';

const usePaymentMethodsSupportedOverrides = (): Record<PAYMENT_METHODS_TYPES, boolean> => {
  const isCreditCardDisabled = useFeatureIsOn('disable-payment-method-credit-card');
  const isApplePayDisabled = useFeatureIsOn('disable-payment-method-apple-pay');
  const isGooglePayDisabled = useFeatureIsOn('disable-payment-method-google-pay');
  const isPayPalDisabled = useFeatureIsOn('disable-payment-method-paypal');
  return {
    applePay: !isApplePayDisabled,
    creditCard: !isCreditCardDisabled,
    googlePay: !isGooglePayDisabled,
    payPal: !isPayPalDisabled,
  };
};

export const filterPaymentMethods = (
  isApplePaySupported: boolean,
  paymentMethodsSupportedOverrides?: Record<PAYMENT_METHODS_TYPES, boolean>
) => {
  return PAYMENT_METHODS.filter((item) => {
    if (!isApplePaySupported) {
      return item.type !== 'applePay';
    }
    return true;
  }).filter((item) => {
    if (paymentMethodsSupportedOverrides) {
      return paymentMethodsSupportedOverrides[item.type];
    }
    return true;
  });
};

export function useSupportedPaymentMethodsObject() {
  const overrides = usePaymentMethodsSupportedOverrides();
  const [paymentMethodsSupported, setPaymentMethodsSupported] = useState<
    Record<PAYMENT_METHODS_TYPES, boolean>
  >({} as Record<PAYMENT_METHODS_TYPES, boolean>);

  useEffect(() => {
    async function checkMethods() {
      const isApplePaySupported = await Promise.resolve(applePaySupported());

      const supportedMethods = {
        applePay: isApplePaySupported && overrides.applePay,
        creditCard: overrides.creditCard,
        googlePay: overrides.googlePay,
        payPal: overrides.payPal,
      };

      setPaymentMethodsSupported(supportedMethods);
    }
    checkMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return paymentMethodsSupported;
}

export function useSupportedPaymentMethods() {
  const overrides = usePaymentMethodsSupportedOverrides();
  const [paymentMethodsSupported, setPaymentMethodsSupported] = useState<
    IPaymentMethodsSupported[]
  >([]);
  useEffect(() => {
    async function checkMethods() {
      const isApplePaySupported = applePaySupported();
      const filteredPaymentMethods = filterPaymentMethods(isApplePaySupported, overrides);
      setPaymentMethodsSupported(filteredPaymentMethods);
    }
    checkMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return paymentMethodsSupported;
}

export function useSupportedPaymentMethodsMap() {
  const supportedMethods = useSupportedPaymentMethods();
  const paymentMethodsSupported = supportedMethods.reduce(
    (acc: Record<PAYMENT_METHODS_TYPES, IPaymentMethodsSupported>, method) => {
      acc[method.type] = method;
      return acc;
    },
    {} as Record<PAYMENT_METHODS_TYPES, IPaymentMethodsSupported>
  );

  return paymentMethodsSupported;
}
