'use client';

import React, { useReducer, useState } from 'react';
import Image from 'next/image';
import Loading from '@/domains/coffee/Loading';
import Order from '@/domains/coffee/Order';
import Shuffle from '@/domains/coffee/Shuffle';
import Start from '@/domains/coffee/Start';

import useStep from '@/lib/hooks/useStep';
import { coffeeReducer, CoffeeActionType } from '@/lib/reducer/coffeeReducer';
import { CoffeContext, initialCoffeeState } from '@/lib/context/coffee';

import prevBtnIcon from '@/public/button/button_prev.svg';

export const metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  openGraph: {
    images: '/og-image.png',
  },
};

export default function Coffee() {
  const [step, Container, handleStep] = useStep(0);
  const [orderState, orderDispatch] = useReducer(coffeeReducer, initialCoffeeState);

  const handleOrder = (type: CoffeeActionType) => {
    orderDispatch({ type });
  };

  const renderPrevBtn = step !== 0 && (
    <Image
      className="fixed z-[var(--nav-z-index)] top-2 left-2 cursor-pointer"
      src={prevBtnIcon}
      alt="이전 버튼"
      width={32}
      height={32}
      onClick={() => handleStep('prev')}
    />
  );

  return (
    <div className="relative">
      {renderPrevBtn}
      <CoffeContext.Provider value={{ orderState }}>
        <Container curStep={step}>
          <Start handleStep={handleStep} />
          <Order state={orderState} handleOrder={handleOrder} handleStep={handleStep} />
          <Shuffle cnt={orderState.total} handleStep={handleStep} />
          <Loading />
        </Container>
      </CoffeContext.Provider>
    </div>
  );
}
